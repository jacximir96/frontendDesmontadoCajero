import { DenominacionBilleteResponse } from '../interfaces/shared/response/denominacion-billete-response.interface';
import { environment } from "src/environments/environment.local";
import { BilletesService } from "../services/billetes.service";
import { DenominacionesBilletes } from "../interfaces/shared/response/denominacion-billete-response.interface";
import { GrupoFormasDePago, MensajesFeedbakEnum, TransaccionEstacion } from 'src/app/interfaces/shared';
import { DenominacionBilleteConfirmado } from "../interfaces/shared/denominacion-billete-confirmado.interface";
import { ArqueoService } from "../services/arqueo-caja.service";
import { RequestComprometerBillete } from '../interfaces/shared/request/comprometer-billetes.interface';
import { RequestComprometerDinero } from '../interfaces/shared/request/comprometer-dinero.interface';
import { ResponseDataFast } from '../interfaces/transacciones-datafast.interface';
import { RequestCancelarProceso } from '../interfaces/shared/request/cancelar-proceso.interface';
import { RetiroService } from '../services/retiro.service';
import { RequestGeneralConPerfilAdmin } from '../interfaces/shared/request/general-con-perfiladmin.interface';
import { ResponseGeneral } from '../interfaces/shared/response/response-general.interface';
import { RequestConsolidarCompromisoBillete } from '../interfaces/arqueo-caja/request/consolidar-compromisos-billetes.interface';
import { HelperClass } from './HelperClass';
import { TotalVentaEstacion } from '../interfaces/arqueo-caja/arqueo-caja.interface';


export class TarjetaFormaPagoComponenteLogica {
    
    cajonAperturado: boolean;
    transaccionesDetalleAll: TransaccionEstacion[];
    proceso: string;
    grupoFormasDePago: GrupoFormasDePago[];
    consolidadoDeTransaccion: TransaccionEstacion[] = [];
    arrayBilletes!: DenominacionesBilletes[];
    billetesConfirmados: DenominacionBilleteConfirmado[] = [];
    dineroComprometidoActual: number = 0;

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
      let billetesComprometidos!:DenominacionBilleteResponse;
      switch (this.proceso) {
        case 'ARQUEO':
          billetes = await this.billetesServicio.obtenerDenominaciones();
          break;
        case 'RETIROS':
          billetes = await this.billetesServicio.obtenerDenominaciones();
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
      this.arrayBilletes = billetes.resolucion;
      //return billetes;
    }


    public async obtenerTransaccionesEstacion(){
        let transaccionesEstacionResponse = await this.billetesServicio.obtenerTransaccionesEstacion(environment.ip_estacion);
        this.parseaInfoFormasDePago(transaccionesEstacionResponse);
        this.grupoFormasDePago.forEach((formaDePago, index:number) => {
          formaDePago.consolidado.estado = true;
          formaDePago.consolidado.rule = 'block';
          formaDePago.consolidado.valorDeclarado = 0.00
          formaDePago.consolidado.block = true;
        })
        this.addConsolidados();
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
        grupoActual.consolidado.diferencia = 0;

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
          grupoActual.consolidado.diferencia += transaccion.diferencia;
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
        //grupoActual.consolidado.diferencia = -total;
        this.grupoFormasDePago.push(grupoActual)
      }

    }

    /**Parsear la info de formas de pagos */
    private parseaInfoFormasDePago(data: any){
      let grupoOtras = undefined;
      let encontroOtras = false;
      for (const key in data.resolucion) {
        if (data.resolucion.hasOwnProperty(key)) {
            const categoria = data.resolucion[key];
            let grupoActual: GrupoFormasDePago = {
              nombre: '',
              transacciones: [],
              consolidado: Object()
            };
            grupoActual.nombre = key;
            grupoActual.transacciones = categoria.transacciones;
            grupoActual.consolidado = categoria.consolidado[0];
            grupoActual.consolidado.imagen = this.generaImagen(categoria.consolidado[0].Formapago_fmp_descripcion)
            grupoActual.consolidado.monto_validado = (grupoActual.consolidado.diferencia == 0) ? true : false;
            if(key == 'EFECTIVO'){
              this.grupoFormasDePago.unshift(grupoActual);
            }else if(key == 'OTRAS' ){
              grupoOtras = grupoActual;
              encontroOtras = true;
            }else{
              this.grupoFormasDePago.push(grupoActual);
            }
        }
      }
      //this.addConsolidados();
      if(encontroOtras){
        this.grupoFormasDePago.push(grupoOtras!);
      }
    }

    private addConsolidados(){
      this.grupoFormasDePago.forEach(formaDePago => {
        this.consolidadoDeTransaccion.push(HelperClass.convertConsolidadoToTransaccionEstacion(formaDePago.consolidado))
      })
    }

    /**Metodos de logica de negocio */
    private generaTransaccionesDetalleAll(){
        this.transaccionesDetalleAll = [];
        this.grupoFormasDePago.forEach(formasDePago => {
          formasDePago.transacciones.forEach(formaDePago => {
            formaDePago.Formapago_padre = formasDePago.consolidado.Formapago_fmp_descripcion;
            formaDePago.monto_validado = (formaDePago.diferencia >= 0) ? true : false;
            formaDePago.valorDeclarado = 0.00;
            formaDePago.block = false;
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
      let totalConfirmadoPrevio = 0;
      this.grupoFormasDePago.forEach(formaDePago => {
        if(formaDePago.consolidado.Formapago_fmp_descripcion == 'EFECTIVO')
          totalConfirmadoPrevio = formaDePago.consolidado.valorDeclarado!
      });
      let request: RequestComprometerBillete = {
        ipEstacion: environment.ip_estacion,
        idUsersPosPerfilAdmin: environment.idPerfilAdmin,
        denominacionBilleteMoneda: []
      }
      let totalConfirmadoActual = 0;
      billetesConfirmados.forEach(billeteConfirmado => {
        request.denominacionBilleteMoneda.push({
          idDenominacionBilleteMoneda: billeteConfirmado.Billete_Denominacion_IDBilleteDenominacion!,
          cantidadDenominacionBilleteMoneda: parseFloat(billeteConfirmado.valorImputRecibido!),
          totalDenominacionBilleteMoneda: billeteConfirmado.totalConfirmado!
        })
        billeteConfirmado.isComprometido = true;
      })
      switch (this.proceso) {
        case 'ARQUEO':
          this.arqueoServices.comprometerBillete(request);
          break;
        case 'RETIROS':
          this.retiroServices.comprometerBilletesRetiros(request);
          break;
        default:
          break;
      }
      return this.getTotalBilletesConfirmados() - this.dineroComprometidoActual;
    }

    public async consolidarCompromisoBilletes(formaDePago: GrupoFormasDePago){
      let request: RequestConsolidarCompromisoBillete = {
        ipEstacion: environment.ip_estacion,
        idUsersPosPerfilAdmin: environment.idPerfilAdmin,
        magnitudTotal: (formaDePago.consolidado.valorDeclarado! + formaDePago.consolidado.total_retirado),
        magnitudPOS: formaDePago.consolidado.total_pagar,
        magnitudPretendida: formaDePago.consolidado.valorDeclarado!,
        diferenciaMagnitud: formaDePago.consolidado.diferencia,
        numeroTransacciones: formaDePago.consolidado.numero_transacciones,
        numeroTransaccionesIngresadas: formaDePago.consolidado.numero_transacciones_ingresadas
      }
      switch (this.proceso) {
        case 'ARQUEO':
          this.arqueoServices.consolidarCompromisoBilletes(request);
          break;
        case 'RETIROS':
          this.retiroServices.consolidarCompromisoBilletes(request);
          break;
        default:
          break;
      }
    }

    public async consolidarProceso(){
      let request: RequestGeneralConPerfilAdmin = {
        ipEstacion: environment.ip_estacion,
        idUsersPosPerfilAdmin: environment.idPerfilAdmin
      }

      switch (this.proceso) {
        case 'ARQUEO':
          this.arqueoServices.arquearDineroEstacion(request);
          break;
        case 'RETIROS':
          this.retiroServices.retiroDineroEstacion(request);
          break;
        default:
          break;
      }
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
            estadoSwitch: parseInt(dineroConfirmado.estado_switch.toString()),
            magnitudTotal: dineroConfirmado.total_pagar,
            magnitudPOS: dineroConfirmado.total_pagar,
            magnitudPretendida: (dineroConfirmado.valorDeclarado! + dineroConfirmado.total_retirado),
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
          impresionProcesoResponse.mensajeFront = (!impresionProcesoResponse!.error && impresionProcesoResponse!.resolucion)
          ? MensajesFeedbakEnum.arqueo_exitoso
          : MensajesFeedbakEnum.arqueo_erroneo
          break;
        case 'RETIROS':
          impresionProcesoResponse = await this.retiroServices.imprimirRetiros(request);
          impresionProcesoResponse.mensajeFront = (!impresionProcesoResponse!.error && impresionProcesoResponse!.resolucion)
          ? MensajesFeedbakEnum.retiro_exitoso
          : MensajesFeedbakEnum.retiro_erroneo
          break;
        default:
          break;
      }
      impresionProcesoResponse.mensajeFront = (!impresionProcesoResponse!.error && impresionProcesoResponse!.resolucion)
      ? MensajesFeedbakEnum.arqueo_exitoso
      : MensajesFeedbakEnum.arqueo_erroneo
      return impresionProcesoResponse!;
    }

    /**NUEVOS CONFIRMACION DE BILLETES*/
    public getTotalBilletesConfirmados(): number{
      const total = this.billetesConfirmados.reduce(
        (accumulator, billete) => accumulator + billete.totalConfirmado!,
        0,
      );
      return total;
    }

    public getComprometidoActual() {
      this.dineroComprometidoActual = this.getTotalBilletesConfirmados();
    }

    public insertarBilleteConfirmado(denominacionBilleteConfirmado: DenominacionBilleteConfirmado) {
      let billeteConfirmadoCurrent:DenominacionBilleteConfirmado = {...denominacionBilleteConfirmado};
      let indexBilleteExistente = this.billetesConfirmados.findIndex((e) => e.Billete_Denominacion_IDBilleteDenominacion == denominacionBilleteConfirmado.Billete_Denominacion_IDBilleteDenominacion );
      if(indexBilleteExistente != -1){
        this.billetesConfirmados[indexBilleteExistente] = billeteConfirmadoCurrent;
      }else{
          this.billetesConfirmados.push(billeteConfirmadoCurrent);
      }

      //Actualizar arrayDeBilletes
      let indexBillete = this.arrayBilletes.findIndex((e) => e.Billete_Denominacion_IDBilleteDenominacion == denominacionBilleteConfirmado.Billete_Denominacion_IDBilleteDenominacion );
      if(indexBillete != -1){
        this.arrayBilletes[indexBillete].Billete_Estacion_bte_cantidad = billeteConfirmadoCurrent.valorImputRecibido;
        this.arrayBilletes[indexBillete].valorDeclarado = billeteConfirmadoCurrent.totalConfirmado!.toFixed(2);
      }
    }


    public actualizarConsolidadoEfectivo(){
      let total = this.getTotalBilletesConfirmados();

      this.grupoFormasDePago.forEach(grupoDeFormaDePagos => {
        if(grupoDeFormaDePagos.consolidado.Formapago_fmp_descripcion == 'EFECTIVO'){
          grupoDeFormaDePagos.consolidado.valorDeclarado = total;
          grupoDeFormaDePagos.consolidado.diferencia = -(grupoDeFormaDePagos.consolidado.total_pagar - grupoDeFormaDePagos.consolidado.total_retirado - total);
          grupoDeFormaDePagos.consolidado.monto_validado = (grupoDeFormaDePagos.consolidado.diferencia >= 0) ? true : false;
        }
      })
    }

    actualizarConsolidadoEstacion(totales: TotalVentaEstacion, isCancelado = false) {
      let totalBilletes = this.getTotalBilletesConfirmados() - this.dineroComprometidoActual;
      if(isCancelado){
        totales.valorDeclarado = totales.valorDeclarado! + totalBilletes;
        totales.total_diferencia_formas_pago = totales.total_diferencia_formas_pago + totalBilletes;
      }else{
        totales.valorDeclarado = totales.valorDeclarado! + totalBilletes;
        totales.total_diferencia_formas_pago = totales.total_diferencia_formas_pago + totalBilletes;
      }
    }

    /**NUEVO CANCELACION DE BILLETES */
    cancelarMontosEfectivos(): number{
      let total = this.getTotalBilletesConfirmados();
      this.grupoFormasDePago.forEach(grupoDeFormaDePagos => {
        if(grupoDeFormaDePagos.consolidado.Formapago_fmp_descripcion == 'EFECTIVO'){
          grupoDeFormaDePagos.consolidado.valorDeclarado = 0.00;
          grupoDeFormaDePagos.consolidado.diferencia = -(grupoDeFormaDePagos.consolidado.total_pagar - grupoDeFormaDePagos.consolidado.total_retirado);
        }
      })
      this.billetesConfirmados = [];
      this.obtenerDenominacionesBilletes()
      return total;
    }

}