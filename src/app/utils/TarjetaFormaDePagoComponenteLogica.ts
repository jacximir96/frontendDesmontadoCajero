import { environment } from "src/environments/environment.local";
import { BilletesService } from "../services/billetes.service";
import { DenominacionesBilletes } from "../interfaces/arqueo-caja/denominacion-billete-response.interface";
import { ConsolidarTransaccionesEstacion, Detalle, FormasPago } from 'src/app/interfaces/transacciones-estacion.interface';
import { DenominacionBilleteConfirmado } from "../interfaces/arqueo-caja/denominacion-billete-confirmado.interface";
import { AperturaCajaResponse } from "../interfaces/arqueo-caja/apertura-caja-response.interface";


export class TarjetaFormaPagoComponenteLogica {
    
    cajonAperturado: boolean;
    transaccionesDetalleAll: Detalle[];
    proceso: string;

    constructor(private billetesServicio: BilletesService, proceso: string) {
        this.cajonAperturado = false;
        this.transaccionesDetalleAll = [];
        this.proceso = proceso;
    }

    /**Metodos de consumo de los endpoints */
    public async obtenerDenominacionesBilletes(){
        let billetes = await this.billetesServicio.obtenerDenominaciones(environment.ip_estacion)
        billetes.resolucion.forEach(billeteDenominacion => {
            billeteDenominacion.valorDeclarado = '0.00'
        })
        this.ordenarArray(billetes.resolucion, 'Billete_Denominacion_btd_Tipo');
        return billetes;
    }

    public async obtenerTransaccionesEstacion(){
        let transaccionesEstacionResponse = await this.billetesServicio.obtenerTransaccionesEstacion(environment.ip_estacion);
        transaccionesEstacionResponse.resolucion[0].formas_pagos.forEach(formaDePago  => {
            formaDePago.resumen.estado = true;
            formaDePago.resumen.rule = 'block';
            formaDePago.resumen.valorDeclarado = 0.00;
        });
        this.generaTransaccionesDetalleAll(transaccionesEstacionResponse);
        return transaccionesEstacionResponse;
    }

    /**Metodos de logica de negocio */
    private generaTransaccionesDetalleAll(transaccionesEstacion: ConsolidarTransaccionesEstacion){
        this.transaccionesDetalleAll = [];
        transaccionesEstacion.resolucion[0].formas_pagos.forEach(formasDePago => {
          formasDePago.detalle.forEach(formaDePago => {
            formaDePago.Formapago_padre = formasDePago.resumen.Formapago_fmp_descripcion;
            formaDePago.monto_validado = (formaDePago.diferencia >= 0) ? true : false;
            formaDePago.valorDeclarado = 0.00;
            this.transaccionesDetalleAll.push(formaDePago);
          })
        })
    }

    cancelarMontosEfectivos(
        billetesConfirmados: DenominacionBilleteConfirmado[],
        transaccionesEstacion: ConsolidarTransaccionesEstacion
    ){
        let totalConfirmado = 0;
        if(billetesConfirmados.length > 0){
            billetesConfirmados.forEach(billete => {
            console.log(billete);
            totalConfirmado += billete.totalConfirmado!;
          })
          console.log(totalConfirmado);
          transaccionesEstacion.resolucion[0].formas_pagos.forEach((result: FormasPago) => {
            if (result.resumen.Formapago_fmp_descripcion == 'EFECTIVO') {
              result.resumen.diferencia = result.resumen.diferencia - totalConfirmado;
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
}