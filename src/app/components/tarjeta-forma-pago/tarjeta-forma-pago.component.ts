import { ArqueoService } from '../../services/arqueo-service';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TotalVentaEstacion } from 'src/app/interfaces/arqueo-caja/arqueo-caja.interface';
import { DenominacionBilleteConfirmado } from 'src/app/interfaces/arqueo-caja/denominacion-billete-confirmado.interface';
import { DenominacionesBilletes } from 'src/app/interfaces/arqueo-caja/denominacion-billete-response.interface';
import { InfoCajero, ObtenerFondoAsignadoUsuarioEstacion } from 'src/app/interfaces/home/home.interface';
import { Toast, TypeToast } from 'src/app/interfaces/toast.interface';
import { ConsolidarTransaccionesAgregadoresEstacion } from 'src/app/interfaces/transacciones-agregadores.interface';
import { ConsolidarTransaccionesDatafastEstacion } from 'src/app/interfaces/transacciones-datafast.interface';
import { ConsolidarTransaccionesEstacion, FormasPago, TransaccionesEstacion, Detalle } from 'src/app/interfaces/transacciones-estacion.interface';
import { BilletesService } from 'src/app/services/billetes.service';
import { HeaderService } from 'src/app/services/header.service';
import { TarjetaFormaPagoComponenteLogica } from 'src/app/utils/TarjetaFormaDePagoComponenteLogica';
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
  toast: Toast = {
    mensaje: '',
    type: TypeToast.success,
    mostrar: false
  }

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
  billetesConfirmados: DenominacionBilleteConfirmado[] = [];
  cajonAperturado: boolean = false;
  tarjetaFormaDePagoComponenteLogica?: TarjetaFormaPagoComponenteLogica;
  IDFormaPagoEfectivo: string = '';
  userCajero!: InfoCajero;
  formaDePagoActual!: FormasPago;
  seleccionoFormaDePago: boolean = false;
  filtroFormaDePago:string = '';
  filtroFormaDePagoDetalle:string = '';

  constructor(
    private billetesServicio: BilletesService,
    private headerServicio: HeaderService,
    private arqueoService: ArqueoService,
    private router: Router
  ) { }

  @Input() public proceso!: string;

  async ngOnInit() {
    this.tarjetaFormaDePagoComponenteLogica = new TarjetaFormaPagoComponenteLogica(this.billetesServicio, this.proceso);
    try {
      let transaccionEstacionResponse = await this.tarjetaFormaDePagoComponenteLogica.obtenerTransaccionesEstacion();
      this.transaccionesEstacion = transaccionEstacionResponse;
      this.transaccionesDetalleAll = this.tarjetaFormaDePagoComponenteLogica.transaccionesDetalleAll;
      
    } catch (error) {
      console.log(error)
    }
    try {
      let billetes = await this.tarjetaFormaDePagoComponenteLogica.obtenerDenominacionesBilletes();
      this.arrayBilletes = billetes.resolucion;
    } catch (error) {
      console.log(error)
    }
    
    try {
      let totales = await this.billetesServicio.obtenerTotales(environment.ip_estacion)
      this.arrayTotales = totales.resolucion;
      this.arrayTotales[0].valorDeclarado = 0.00;
    } catch (error) {
      console.log(error)
    }

    try {
      let result = await this.headerServicio.obtenerFondoAsignadoEstacion(environment.ip_estacion)
      this.userCajero = result.resolucion;
    } catch (error) {
      
    }
  }

  recibeValor(dato: any) {
    const denominacionBilleteConfirmado = dato[0] as DenominacionBilleteConfirmado; 
    let totalConfirmadoBillete = 0;
    this.transaccionesEstacion.resolucion[0].formas_pagos.forEach((result: FormasPago) => {
      if (result.resumen.Formapago_fmp_descripcion == 'EFECTIVO') {
        totalConfirmadoBillete = parseFloat(denominacionBilleteConfirmado.Billete_Denominacion_btd_Valor!) * parseFloat(denominacionBilleteConfirmado.valorImputRecibido!);
        denominacionBilleteConfirmado.totalConfirmado = totalConfirmadoBillete;
        result.resumen.diferencia = result.resumen.diferencia + totalConfirmadoBillete;
        result.resumen.valorDeclarado = result.resumen.valorDeclarado! + totalConfirmadoBillete
        //Check de completado
        result.resumen.monto_validado = (result.resumen.diferencia >= 0) ? true : false;
        this.arrayBilletes.forEach(billete => {
          if(billete.Billete_Denominacion_IDBilleteDenominacion == denominacionBilleteConfirmado.Billete_Denominacion_IDBilleteDenominacion){
            billete.valorDeclarado = totalConfirmadoBillete.toFixed(2);
          }
        })
        let billeteConfirmado:DenominacionBilleteConfirmado = denominacionBilleteConfirmado;
        this.billetesConfirmados.push(billeteConfirmado);
      }
    });
    //Totales
    this.arrayTotales[0].valorDeclarado = this.arrayTotales[0].valorDeclarado! + totalConfirmadoBillete;
    this.arrayTotales[0].total_diferencia_formas_pago = this.arrayTotales[0].total_diferencia_formas_pago + totalConfirmadoBillete;
  }

  cancelarMontosEfectivos(){
    this.tarjetaFormaDePagoComponenteLogica!.cancelarMontosEfectivos(this.billetesConfirmados, this.transaccionesEstacion);
    this.inicio();
  }

  ocultarTarjetas(dato: FormasPago) {
    this.seleccionoFormaDePago = true;
    this.formaDePagoActual = dato;
    this.transaccionesDetalleActual = [];
    this.transaccionesEstacion.resolucion[0].formas_pagos.forEach(formaPago => {
      if(formaPago.resumen.Formapago_fmp_descripcion == 'EFECTIVO' && formaPago.resumen.Formapago_fmp_descripcion == dato.resumen.Formapago_fmp_descripcion){
        this.efectivo = true;
        formaPago.resumen.estado = true;
        this.detallesAMostrar = '';
        this.hide = "calc(100vh)";
        this.IDFormaPagoEfectivo = formaPago.resumen.Formapago_IDFormapago;
      }else if(formaPago.resumen.Formapago_fmp_descripcion == dato.resumen.Formapago_fmp_descripcion){
        this.detallesAMostrar = formaPago.resumen.Formapago_fmp_descripcion;
        this.efectivo = false;
        formaPago.resumen.estado = true;
        this.detallesAMostrar = formaPago.resumen.Formapago_fmp_descripcion;
        this.hide = "calc(67vh)";
      }else{
        formaPago.resumen.rule = 'none';
      }
      //Detalle
      this.transaccionesDetalleAll.forEach(transaccion =>{
        transaccion.styleDisplay = (transaccion.Formapago_padre == dato.resumen.Formapago_fmp_descripcion) ? 'block' : 'none';
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

  seleccionarFormaPago(detalleFormaPago: Detalle) {
    this.validaMonto = true;
    this.validarMontoFormaPago = detalleFormaPago;
    this.validaMontoWidth = detalleFormaPago.monto_validado ? '249px' : '301px';
    this.transaccionesDetalleAll.forEach( formaDePago => formaDePago.cardSeleccionada = false )
    detalleFormaPago.cardSeleccionada = true;
  }

  cancelarMontos(){
    this.transaccionesDetalleActual.forEach(formaDePago => {
      this.confirmarMonto(formaDePago, true);
    })
    this.inicio();
    this.transaccionesDetalleAll = this.tarjetaFormaDePagoComponenteLogica!.transaccionesDetalleAll;
  }

  confirmarMonto(detalleFormaPago: Detalle, reverse: boolean) {
    this.transaccionesEstacion.resolucion[0].formas_pagos.forEach(formasDePago => {
      formasDePago.detalle.forEach(formaDePago => {
        if(formaDePago.Formapago_fmp_descripcion == detalleFormaPago.Formapago_fmp_descripcion && 
           formaDePago.Formapago_padre == detalleFormaPago.Formapago_padre
        ){
          //El detalle
          formaDePago.diferencia = (reverse) ? -formaDePago.total_pagar : 0;
          formaDePago.monto_validado = (formaDePago.diferencia >= 0) ? true : false;

          formaDePago.valorDeclarado = (reverse) 
          ?  formaDePago.valorDeclarado! - detalleFormaPago.total_pagar
          : formaDePago.valorDeclarado! + detalleFormaPago.total_pagar
          //La forma principal
          formasDePago.resumen.diferencia = (reverse) 
            ? formasDePago.resumen.diferencia - detalleFormaPago.total_pagar 
            : formasDePago.resumen.diferencia + detalleFormaPago.total_pagar;

          formasDePago.resumen.valorDeclarado = (reverse) 
          ? formasDePago.resumen.valorDeclarado! - detalleFormaPago.total_pagar 
          : formasDePago.resumen.valorDeclarado! + detalleFormaPago.total_pagar;

          formasDePago.resumen.monto_validado = (formasDePago.resumen.diferencia >= 0) ? true : false;
          //Totales
          this.arrayTotales[0].total_diferencia_formas_pago = (reverse) 
          ? this.arrayTotales[0].total_diferencia_formas_pago - detalleFormaPago.total_pagar
          : this.arrayTotales[0].total_diferencia_formas_pago + detalleFormaPago.total_pagar;

          this.arrayTotales[0].valorDeclarado = (reverse) 
          ? this.arrayTotales[0].valorDeclarado! - detalleFormaPago.total_pagar
          : this.arrayTotales[0].valorDeclarado! + detalleFormaPago.total_pagar;

          this.transaccionesDetalleActual.push(formaDePago);
        }
      })
    })

    detalleFormaPago.cardSeleccionada = false;

    this.validarMontoFormaPago.monto_validado = detalleFormaPago.monto_validado;
    this.validaMontoWidth = detalleFormaPago.monto_validado ? '249px' : '301px';

  }

  cerrarValidaMonto() {
    this.validaMonto = false;
    this.validarMontoFormaPago.cardSeleccionada = false;
  }

  async confirmarButton() {
    try {
      let resultImprimirAqueo = await this.arqueoService.imprimirArqueo(environment.ip_estacion)
      if(!resultImprimirAqueo.error && resultImprimirAqueo.resolucion){
        this.toast.mostrar = true;
        this.toast.mensaje = resultImprimirAqueo.mensaje;
        this.toast.type = TypeToast.success;
      }else{
        this.toast.mensaje = 'Lo sentimos! Ocurrio un error inesperado';
        this.toast.mostrar = true;
        this.toast.type = TypeToast.danger;
      }
    } catch (error) {
      this.toast.mensaje = 'Lo sentimos! Ocurrio un error inesperado';
      this.toast.mostrar = true;
      this.toast.type = TypeToast.danger;
    }
    localStorage.setItem('notificacion', JSON.stringify(this.toast));
    let routePath = '/';
    this.router.navigate([routePath]);
  }

  seleccionarFormaPagoAgregador(){
    this.arrayFormas.resolucion[0].formas_pagos.forEach(formaPago => {
      console.log(formaPago);
    })
  }

  filtrarFormasDePago(){
    this.arrayFormas.resolucion[0].formas_pagos.filter(formasDePago => {
      formasDePago.resumen.Formapago_fmp_descripcion.toLocaleLowerCase().includes('data')
    })
  }

  filtrarDetalleFormasDePago(){

  }

  mostrarDiv() {
    var div = document.getElementById('miDiv');
    div!.classList.remove('hidden', 'opacity-0', 'invisible');
    div!.classList.add('opacity-100', 'visible');
  }

}
