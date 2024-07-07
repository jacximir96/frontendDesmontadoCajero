import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DenominacionesBilletes, TotalVentaEstacion } from 'src/app/interfaces/arqueo-caja/arqueo-caja.interface';
import { ConsolidarTransaccionesAgregadoresEstacion } from 'src/app/interfaces/transacciones-agregadores.interface';
import { ConsolidarTransaccionesDatafastEstacion } from 'src/app/interfaces/transacciones-datafast.interface';
import { ConsolidarTransaccionesEstacion, FormasPago, TransaccionesEstacion, Detalle } from 'src/app/interfaces/transacciones-estacion.interface';
import { BilletesService } from 'src/app/services/billetes.service';
import { environment } from 'src/environments/environment.local';

@Component({
  selector: 'app-tarjeta-forma-pago',
  templateUrl: './tarjeta-forma-pago.component.html',
  styleUrls: ['./tarjeta-forma-pago.component.scss']
})
export class TarjetaFormaPagoComponent implements OnInit{
  efectivo: boolean = false;
  hide: string = "487px";
  color: string = "white";
  totales: boolean = true;
  validaMonto: boolean = false;
  confirmar: boolean = false;
  validaMontoTarjeta: [{ title: string, validado: boolean }] = [{ title: '', validado: false }];
  validaMontoWidth: string = "478px";
  inicialHeigth: string = (innerHeight - 360) + 'px';
  rule: string = "block";
  detallesAMostrar: string = '';
  validarMontoFormaPago!: Detalle;
  detalleDisplay: string = 'none';

  arrayAgregadores: any[] = [
    {
      title: 'Uber',
      image: 'uber.png',
      transacciones: '4',
      posCalculado: '$449.02',
      valorDeclarado: '$0.00',
      diferencia: '-$449.02',
      ingresos: '$0.00',
      egresos: '$0.00',
      retirado: '$0.00',
      estado: true,
      validado: false,
      color: "white"
    },
    {
      title: 'Pedidos ya',
      image: 'pedidosya.png',
      transacciones: '4',
      posCalculado: '$449.02',
      valorDeclarado: '$0.00',
      diferencia: '-$449.02',
      ingresos: '$0.00',
      egresos: '$0.00',
      retirado: '$0.00',
      estado: true,
      validado: false,
      seleccionado: false,
      color: "white"
    },

  ]
  arrayFormas!: ConsolidarTransaccionesEstacion;
  arrayBilletes!: DenominacionesBilletes[];
  arrayTotales!: TotalVentaEstacion[];
  transaccionesEstacion!: ConsolidarTransaccionesEstacion;
  transaccionesDetalleAll: Detalle[] = [];
  transaccionesDetalleActual: Detalle[] = [];

  constructor(private billetesServicio: BilletesService) { }

  async ngOnInit() {
    /*try {
      let formasPago = await this.billetesServicio.obtenerFormasPago(environment.ip_estacion)
      this.arrayFormas = formasPago;
      this.arrayFormas.resolucion[0].formas_pagos.forEach(item  => {
        item.resumen.estado = true;
        item.resumen.rule = 'block';

      });
      console.log(this.arrayFormas);
    } catch (error) {
      console.log(error)
    }*/
    try {
      let transaccionesEstacionResponse = await this.billetesServicio.obtenerTransaccionesEstacion(environment.ip_estacion)
      this.transaccionesEstacion = transaccionesEstacionResponse;
      transaccionesEstacionResponse.resolucion[0].formas_pagos.forEach(formaDePago  => {
        formaDePago.resumen.estado = true;
        formaDePago.resumen.rule = 'block';
      });
      this.generaTransaccionesDetalleAll();
      
    } catch (error) {
      console.log(error)
    }
    try {
      let billetes = await this.billetesServicio.obtenerDenominaciones(environment.ip_estacion)
      this.arrayBilletes = billetes.resolucion;
      this.arrayBilletes.forEach(denominacion => {
        denominacion.valorDeclarado = parseFloat((0.00).toFixed(2));
      })
      this.ordenarArray('Billete_Denominacion_btd_Tipo');
    } catch (error) {
      console.log(error)
    }
    
    try {
      let totales = await this.billetesServicio.obtenerTotales(environment.ip_estacion)
      this.arrayTotales = totales.resolucion;
      console.log(this.arrayTotales);
    } catch (error) {
      console.log(error)
    }

    
  }

  recibeValor(dato: any) {
    console.log(dato);
    this.transaccionesEstacion.resolucion[0].formas_pagos.forEach((result: FormasPago) => {
      console.log(result);
      if (result.resumen.Formapago_fmp_descripcion == 'EFECTIVO') {
        result.resumen.total_pagar = result.resumen.total_pagar + (dato[0] * parseInt(dato[1]));
        result.resumen.diferencia = result.resumen.diferencia + (dato[0] * parseInt(dato[1]));
        //Check de completado
        result.resumen.monto_validado = (result.resumen.diferencia >= 0) ? true : false;
      }
    });
    //Totales
    this.arrayTotales[0].total_diferencia_formas_pago = this.arrayTotales[0].total_diferencia_formas_pago + (dato[0] * parseInt(dato[1]));
  }

  ordenarArray(field: string) {
    this.arrayBilletes.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  ocultarTarjetas(dato: string) {
    this.transaccionesDetalleActual = [];
    console.log(dato);
    let flag = false;
    this.transaccionesEstacion.resolucion[0].formas_pagos.forEach(formaPago => {
      if(formaPago.resumen.Formapago_fmp_descripcion == 'EFECTIVO' && formaPago.resumen.Formapago_fmp_descripcion == dato){
        this.efectivo = true;
        formaPago.resumen.estado = true;
        this.detallesAMostrar = '';
        this.hide = "calc(100vh";
      }else if(formaPago.resumen.Formapago_fmp_descripcion == dato){
        this.detallesAMostrar = formaPago.resumen.Formapago_fmp_descripcion;
        this.efectivo = false;
        formaPago.resumen.estado = true;
        this.detallesAMostrar = formaPago.resumen.Formapago_fmp_descripcion;
        this.hide = "calc(100vh";
      }else{
        formaPago.resumen.rule = 'none';
      }
      //Detalle
      this.transaccionesDetalleAll.forEach(transaccion =>{
        transaccion.styleDisplay = (transaccion.Formapago_padre == dato) ? 'block' : 'none';
      })
    });
    this.totales = false;
  }

  inicio() {
    this.efectivo = false;
    this.totales = true;
    this.hide = "487px";
    this.validaMonto = false;
    this.transaccionesEstacion.resolucion[0].formas_pagos.forEach(element => {
      element.resumen.estado = true;
      element.resumen.rule = "block";
    });
    this.transaccionesDetalleAll.forEach(detalleFormasPago =>{
      detalleFormasPago.styleDisplay = 'none';
    })
  }

  generaTransaccionesDetalleAll(){
    this.transaccionesDetalleAll = [];
    this.transaccionesEstacion.resolucion[0].formas_pagos.forEach(formasDePago => {
      formasDePago.detalle.forEach(formaDePago => {
        formaDePago.Formapago_padre = formasDePago.resumen.Formapago_fmp_descripcion;
        formaDePago.monto_validado = (formaDePago.diferencia >= 0) ? true : false;
        this.transaccionesDetalleAll.push(formaDePago);
      })
    })
  }

  seleccionarFormaPago(detalleFormaPago: Detalle) {
    this.validaMonto = true;
    this.validarMontoFormaPago = detalleFormaPago;
    this.validaMontoWidth = detalleFormaPago.monto_validado ? '249px' : '301px';
  }

  cancelarMontos(){
    console.log("cancelando");
    this.transaccionesDetalleActual.forEach(formaDePago => {
      this.confirmarMonto(formaDePago, true);
    })
    this.inicio();
    this.generaTransaccionesDetalleAll();
  }

  confirmarMonto(detalleFormaPago: Detalle, reverse: boolean) {
    this.transaccionesEstacion.resolucion[0].formas_pagos.forEach(formasDePago => {
      formasDePago.detalle.forEach(formaDePago => {
        if(formaDePago.Formapago_fmp_descripcion == detalleFormaPago.Formapago_fmp_descripcion && 
           formaDePago.Formapago_padre == detalleFormaPago.Formapago_padre
        ){
          formaDePago.diferencia = (reverse) ? -formaDePago.total_pagar : 0;
          formaDePago.monto_validado = (formaDePago.diferencia >= 0) ? true : false;
          //La forma principal
          formasDePago.resumen.diferencia = (reverse) 
            ? formasDePago.resumen.diferencia - detalleFormaPago.total_pagar 
            : formasDePago.resumen.diferencia + detalleFormaPago.total_pagar;

          formasDePago.resumen.monto_validado = (formasDePago.resumen.diferencia >= 0) ? true : false;
          //Totales
          this.arrayTotales[0].total_diferencia_formas_pago =(reverse) 
          ? this.arrayTotales[0].total_diferencia_formas_pago - detalleFormaPago.total_pagar
          : this.arrayTotales[0].total_diferencia_formas_pago + detalleFormaPago.total_pagar;
          this.transaccionesDetalleActual.push(formaDePago);
        }
      })
    })

    /*this.transaccionesAgregadores.forEach(formaDePago => {
      if(formaDePago.Formapago_fmp_descripcion == detalleFormaPago.Formapago_fmp_descripcion){
        formaDePago.diferencia = 0;
        formaDePago.monto_validado = true;
      }
    })*/
    this.validarMontoFormaPago.monto_validado = true;
    this.validaMontoWidth = detalleFormaPago.monto_validado ? '249px' : '301px';
    /*this.confirmar = true;
    this.validaMonto = false;
    this.arrayAgregadores.forEach(element => {
      if (element.title == title) {
        element.validado = true;
        element.color = "white";
      }
    });*/
  }

  cerrarValidaMonto() {
    this.validaMonto = false;
    this.arrayAgregadores.forEach(element => {
      element.color = "white";

    });
  }

  confirmarButton() {
    this.arrayAgregadores.forEach(element => {
      element.estado = false;
    });
    this.totales = true;
  }

  seleccionarFormaPagoAgregador(){
    this.arrayFormas.resolucion[0].formas_pagos.forEach(formaPago => {
      console.log(formaPago);
    })
  }

}
