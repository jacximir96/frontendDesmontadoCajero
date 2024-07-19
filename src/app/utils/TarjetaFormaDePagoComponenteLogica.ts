import { DenominacionBilleteResponse } from './../interfaces/arqueo-caja/denominacion-billete-response.interface';
import { environment } from "src/environments/environment.local";
import { BilletesService } from "../services/billetes.service";
import { DenominacionesBilletes } from "../interfaces/arqueo-caja/denominacion-billete-response.interface";
import { ConsolidarTransaccionesEstacion, Detalle, FormasPago, GrupoFormasDePago, TransaccionEstacion } from 'src/app/interfaces/transacciones-estacion.interface';
import { DenominacionBilleteConfirmado } from "../interfaces/arqueo-caja/denominacion-billete-confirmado.interface";
import { AperturaCajaResponse } from "../interfaces/arqueo-caja/apertura-caja-response.interface";
import { ArqueoService } from "../services/arqueo-caja.service";
import { RequestComprometerBillete } from '../interfaces/request/comprometer-billetes.interface';
import { RequestComprometerDinero } from '../interfaces/request/comprometer-dinero.interface';
import { ResponseDataFast } from '../interfaces/transacciones-datafast.interface';
import { RequestCancelarProceso } from '../interfaces/request/cancelar-proceso.interface';
import { RetiroService } from '../services/retiro.service';
import { RequestGeneralConPerfilAdmin } from '../interfaces/request/general-con-perfiladmin.interface';
import { ResponseGeneral } from '../interfaces/shared/response-general.interface';


export class TarjetaFormaPagoComponenteLogica {
    
    cajonAperturado: boolean;
    transaccionesDetalleAll: TransaccionEstacion[];
    proceso: string;
    grupoFormasDePago: GrupoFormasDePago[];

    constructor(
      private billetesServicio: BilletesService, 
      private arqueoServices: ArqueoService,
      private retiroServices: RetiroService,
      proceso: string
    ) {
        this.cajonAperturado = false;
        this.transaccionesDetalleAll = [];
        this.proceso = proceso;
        this.grupoFormasDePago = []
    }

    /**Metodos de consumo de los endpoints */
    public async obtenerDenominacionesBilletes(){
      let billetes!:DenominacionBilleteResponse;
      switch (this.proceso) {
        case 'ARQUEO':
          //billetes = await this.arqueoServices.getObtenerBilletesComprometidos();
          billetes = await this.billetesServicio.obtenerDenominaciones();
          break;
        case 'RETIROS':
          billetes = await this.retiroServices.getObtenerBilletesComprometidos();
          //billetes = await this.billetesServicio.obtenerDenominaciones();
          break;
        default:
          billetes = await this.billetesServicio.obtenerDenominaciones();
          break;
      }
      //let billetes = await this.billetesServicio.obtenerDenominaciones(environment.ip_estacion)
      billetes.resolucion.forEach(billeteDenominacion => {
          billeteDenominacion.valorDeclarado = '0.00'
      })
      this.ordenarArray(billetes.resolucion, 'Billete_Denominacion_btd_Tipo');
      return billetes;
    }

    public async obtenerTransaccionesEstacion(){
        let transaccionesEstacionResponse = await this.billetesServicio.obtenerTransaccionesEstacion(environment.ip_estacion);
        console.log(transaccionesEstacionResponse);
        this.parseaInfoFormasDePago(transaccionesEstacionResponse);
        let encontradoFirst = false;
        let encontradoLast = false;
        let formaPagoFisrt: GrupoFormasDePago;
        let formaPagoLast: GrupoFormasDePago;
        let indexEncontradoFirst;
        let indexEncontradoLast;
        this.grupoFormasDePago.forEach((formaDePago, index:number) => {
          formaDePago.consolidado.estado = true;
          formaDePago.consolidado.rule = 'block';
          formaDePago.consolidado.valorDeclarado = 0.00
          if(formaDePago.consolidado.Formapago_fmp_descripcion == 'EFECTIVO'){
            formaPagoFisrt = formaDePago;
            encontradoFirst = true;
            indexEncontradoFirst = index;
          }
          if(formaDePago.consolidado.Formapago_fmp_descripcion == 'OTRAS'){
            formaPagoLast = formaDePago;
            encontradoLast = true;
            indexEncontradoLast = index;
          }
        })
        /*if(encontradoFirst){
          delete this.grupoFormasDePago[indexEncontradoFirst!];
          this.grupoFormasDePago.unshift(formaPagoFisrt!);
        }
        if(encontradoLast){
          delete this.grupoFormasDePago[indexEncontradoLast!];
          this.grupoFormasDePago.push(formaPagoLast!);
        }*/
        this.generaTransaccionesDetalleAll();
    }

    public async obtenerTransaccionesDataFastEstacion() {
      let transaccionesEstacionResponse = await this.billetesServicio.obtenerTransaccionesDataFast(environment.ip_estacion);
        this.parseaInfoDataFast(transaccionesEstacionResponse);
        this.grupoFormasDePago.forEach(formaDePago => {
          formaDePago.consolidado.estado = true;
          formaDePago.consolidado.rule = 'block';
          formaDePago.consolidado.valorDeclarado = 0.00;
          formaDePago.consolidado.monto_validado = (formaDePago.consolidado.diferencia == 0) ? true : false
        })
        console.log(this.grupoFormasDePago);
        this.generaTransaccionesDetalleAll();
    }

    /**Parse info Transacciones DataFast */
    private parseaInfoDataFast(data: ResponseDataFast){
      if(!data.error && data.resolucion.length > 0){
        let grupoActual: GrupoFormasDePago = {
          nombre: '',
          transacciones: [],
          consolidado: Object()
        }
        let total: number = 0;
        grupoActual.consolidado.numero_transacciones = 0;
        grupoActual.consolidado.ingreso = 0;
        grupoActual.consolidado.egreso = 0;
        grupoActual.consolidado.total_retirado = 0;
        grupoActual.consolidado.monto_validado = false;

        data.resolucion.forEach(transaccion => {
          grupoActual.nombre = 'TARJETAS DATAFAST';
          grupoActual.consolidado.Formapago_fmp_descripcion = 'TARJETAS DATAFAST';
          grupoActual.consolidado.Formapago_IDFormapago = 'TARJETAS DATAFAST';
          grupoActual.consolidado.imagen = this.generaImagen(grupoActual.nombre);
          total += transaccion.total_pagar;
          grupoActual.consolidado.numero_transacciones += transaccion.numero_transacciones;
          grupoActual.consolidado.ingreso += transaccion.ingreso;
          grupoActual.consolidado.egreso += transaccion.egreso;
          grupoActual.consolidado.total_retirado += transaccion.total_retirado;
          let transaccionAux: TransaccionEstacion = {
            Estacion_est_nombre: transaccion.Estacion_est_nombre,
            Control_Estacion_IDControlEstacion: transaccion.Control_Estacion_IDControlEstacion,
            Control_Estacion_IDUsersPos: transaccion.Control_Estacion_IDUsersPos,
            Formapago_IDFormapago: transaccion.Formapago_IDFormapago,
            Formapago_fmp_descripcion: transaccion.Formapago_fmp_descripcion,
            orden: transaccion.orden!,
            total_retirado: transaccion.total_retirado,
            estado_switch: transaccion.estado_switch,
            agregador: transaccion.agregador,
            total_pagar: transaccion.total_pagar,
            diferencia: transaccion.diferencia,
            ingreso: transaccion.ingreso,
            egreso: transaccion.egreso,
            numero_transacciones: transaccion.numero_transacciones,
            numero_transacciones_ingresadas: transaccion.numero_transacciones_ingresadas,
            Retiros_ultimo_retiro: 0,
            Formapago_Factura_fpf_swt: '',
            valorDeclarado: 0,
            monto_validado: false,
            styleDisplay: 'hidden',
            cardSeleccionada: false
          }
          grupoActual.transacciones.push(transaccionAux);
        })
        grupoActual.consolidado.total_pagar = total;
        grupoActual.consolidado.diferencia = -total;
        this.grupoFormasDePago.push(grupoActual)
      }

    }

    /**Parsear la info de formas de pagos */
    private parseaInfoFormasDePago(data: any){
      for (const key in data.resolucion) {
        if (data.resolucion.hasOwnProperty(key)) {
            const categoria = data.resolucion[key];
            console.log(`Categoría: ${key}`);
            let grupoActual: GrupoFormasDePago = {
              nombre: '',
              transacciones: [],
              consolidado: Object()
            };
            grupoActual.nombre = key;
            grupoActual.transacciones = categoria.transacciones;
            grupoActual.consolidado = categoria.consolidado[0];
            grupoActual.consolidado.imagen = this.generaImagen(categoria.consolidado[0].Formapago_fmp_descripcion)
            this.grupoFormasDePago.push(grupoActual);
        }
      }
    }

    /**Metodos de logica de negocio */
    private generaTransaccionesDetalleAll(){
        this.transaccionesDetalleAll = [];
        this.grupoFormasDePago.forEach(formasDePago => {
          formasDePago.transacciones.forEach(formaDePago => {
            formaDePago.Formapago_padre = formasDePago.consolidado.Formapago_fmp_descripcion;
            formaDePago.monto_validado = (formaDePago.diferencia >= 0) ? true : false;
            formaDePago.valorDeclarado = 0.00;
            formaDePago.imagen = this.generaImagen(formaDePago.Formapago_fmp_descripcion);
            this.transaccionesDetalleAll.push(formaDePago);
          })
        })
    }

    private generaImagen(descripcion: string){
      let rutaImagen: string = ''
      switch (descripcion.toLowerCase()) {
        case 'efectivo':
          rutaImagen = 'Rectangle 290.svg'; break;
        case 'agregadores':
          rutaImagen = 'agregador.png'; break;
        case 'otras':
          rutaImagen = 'otros.png'; break;
        case 'datafono':
          rutaImagen = 'otros.png'; break;
        case 'creditos':
          rutaImagen = 'creditos.png'; break;
        case 'mastercard':
          rutaImagen = 'mastercard.png'; break;
        case 'tarjetas_pin_pad':
          rutaImagen = 'forma-pago-tarjetas.png'; break;
        case 'multimarca efectivo':
          rutaImagen = 'forma-pago-tarjetas.png'; break;
        case 'uber':
          rutaImagen = 'uber.png'; break;
        case 'rappi':
          rutaImagen = 'rappi.png'; break;
        case 'tarjetas datafast':
          rutaImagen = 'forma-pago-tarjetas.png'; break;
        case 'visa':
          rutaImagen = 'visa.png'; break;
        default:
          rutaImagen = 'otros.png'; break;
          break;
      }
      return rutaImagen
    }

    cancelarMontosEfectivos(
        billetesConfirmados: DenominacionBilleteConfirmado[],
        transaccionesEstacion: GrupoFormasDePago[]
    ){
        let totalConfirmado = 0;
        if(billetesConfirmados.length > 0){
            billetesConfirmados.forEach(billete => {
            console.log(billete);
            totalConfirmado += billete.totalConfirmado!;
          })
          console.log(totalConfirmado);
          transaccionesEstacion.forEach((result: GrupoFormasDePago) => {
            if (result.consolidado.Formapago_fmp_descripcion == 'EFECTIVO') {
              result.consolidado.diferencia = result.consolidado.diferencia - totalConfirmado;
              result.consolidado.valorDeclarado = 0.00;
              result.consolidado.monto_validado = result.consolidado.diferencia >=0 ? true : false;
            }
          })
        }
        billetesConfirmados = [];
    }

    private ordenarArray(arrayBilletes: DenominacionesBilletes[], campo: string) {
        arrayBilletes.sort((a: any, b: any) => {
          if (a[campo] < b[campo]) {
            return -1;
          } else if (a[campo] > b[campo]) {
            return 1;
          } else {
            return 0;
          }
        });
    }

    public async comprometerBilleteEfectivo(billetesConfirmados: DenominacionBilleteConfirmado[]){
      let request: RequestComprometerBillete = {
        ipEstacion: environment.ip_estacion,
        idUsersPosPerfilAdmin: environment.idPerfilAdmin,
        denominacionBilleteMoneda: []
      }
      billetesConfirmados.forEach(billeteConfirmado => {
        request.denominacionBilleteMoneda.push({
          idDenominacionBilleteMoneda: billeteConfirmado.Billete_Denominacion_IDBilleteDenominacion!,
          cantidadDenominacionBilleteMoneda: parseFloat(billeteConfirmado.valorImputRecibido!),
          totalDenominacionBilleteMoneda: billeteConfirmado.totalConfirmado!
        })
      })
      this.arqueoServices.comprometerBillete(request);
    }

    public async comprometerDineroProceso(detallesConfirmados: GrupoFormasDePago){
      let request: RequestComprometerDinero = {
        ipEstacion: environment.ip_estacion,
        idUsersPosPerfilAdmin: environment.idPerfilAdmin,
        dinero: []
      }
      detallesConfirmados.transacciones.forEach(dineroConfirmado => {
        if(dineroConfirmado.valorDeclarado! > 0){
          request.dinero.push({
            idFormaPago: dineroConfirmado.Formapago_IDFormapago,
            estadoSwitch: 0,
            magnitudTotal: dineroConfirmado.valorDeclarado!,
            magnitudPOS: dineroConfirmado.total_pagar,
            magnitudPretendida: dineroConfirmado.total_pagar,
            diferenciaMagnitud: dineroConfirmado.diferencia,
            numeroTransacciones: dineroConfirmado.numero_transacciones,
            numeroTransaccionesIngresadas: dineroConfirmado.numero_transacciones_ingresadas
          })
        }
      })
      switch (this.proceso) {
        case 'ARQUEO':
          this.arqueoServices.comprometerDineroArqueo(request);
          break;
        case 'RETIROS':
          this.retiroServices.comprometerDineroRetiros(request);
          break;
        default:
          break;
      }
    }

    public async cancelarProceso(){
      let request: RequestCancelarProceso = {
        ipEstacion: environment.ip_estacion,
        idUsersPosPerfilAdmin: environment.idPerfilAdmin
      }

      switch (this.proceso) {
        case 'ARQUEO':
          this.arqueoServices.cancelarDineroArqueo(request);
          break;
        case 'RETIROS':
          this.retiroServices.cancelarDineroRetiros(request);
          break;
        default:
          break;
      }
    }

    public async imprimirProceso(): Promise<ResponseGeneral>{
      let request: RequestGeneralConPerfilAdmin = {
        ipEstacion: environment.ip_estacion,
        idUsersPosPerfilAdmin: environment.idPerfilAdmin
      }
      let impresionProcesoResponse: ResponseGeneral = {
        error: true,
        resolucion: [],
        mensaje: 'Ocurrio un error interno, por favor intente nuevamente'
      };

      switch (this.proceso) {
        case 'ARQUEO':
          impresionProcesoResponse = await this.arqueoServices.imprimirArqueo(request);
          break;
      
        default:
          break;
      }
      return impresionProcesoResponse!;
    }

}