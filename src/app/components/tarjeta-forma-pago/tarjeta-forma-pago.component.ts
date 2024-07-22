import { 
  Consolidado, 
  GrupoFormasDePago, 
  TransaccionEstacion, 
  DenominacionBilleteConfirmado,
  DenominacionesBilletes 
} from 'src/app/interfaces/shared';
import { ArqueoService } from '../../services/arqueo-caja.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TotalVentaEstacion } from 'src/app/interfaces/arqueo-caja/arqueo-caja.interface';
import { InfoCajero, ObtenerFondoAsignadoUsuarioEstacion } from 'src/app/interfaces/home/home.interface';
import { Toast, TypeToast } from 'src/app/interfaces/toast.interface';
import { ConsolidarTransaccionesEstacion } from 'src/app/interfaces/transacciones-estacion.interface';
import { BilletesService } from 'src/app/services/billetes.service';
import { HeaderService } from 'src/app/services/header.service';
import { TarjetaFormaPagoComponenteLogica } from 'src/app/utils/TarjetaFormaDePagoComponenteLogica';
import { environment } from 'src/environments/environment.local';
import SimpleKeyboard from 'simple-keyboard';
import bigDecimal from 'js-big-decimal';
import { RetiroService } from 'src/app/services/retiro.service';


@Component({
  selector: 'app-tarjeta-forma-pago',
  templateUrl: './tarjeta-forma-pago.component.html',
  styleUrls: ['./tarjeta-forma-pago.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TarjetaFormaPagoComponent implements OnInit{

  efectivo: boolean = false;
  transaccion: boolean = false; //Para bloquear boton continuar;
  hide: string = "497px";
  color: string = "white";
  totales: boolean = true;
  validaMonto: boolean = false;
  confirmar: boolean = false;
  validaMontoTarjeta: [{ title: string, validado: boolean }] = [{ title: '', validado: false }];
  validaMontoWidth: string = "478px";
  inicialHeigth: string = (innerHeight - 360) + 'px';
  rule: string = "block";
  detallesAMostrar: string = '';
  validarMontoFormaPago!: TransaccionEstacion;
  detalleDisplay: string = 'none';
  toast: Toast = {
    mensaje: '',
    type: TypeToast.success,
    mostrar: false
  }

  arrayFormas!: ConsolidarTransaccionesEstacion;
  arrayTotales!: TotalVentaEstacion[];
  transaccionesDetalleAll: TransaccionEstacion[] = [];
  transaccionesDetalleActual: TransaccionEstacion[] = [];
  billetesConfirmados: DenominacionBilleteConfirmado[] = [];
  cajonAperturado: boolean = false;
  tarjetaFormaDePagoComponenteLogica?: TarjetaFormaPagoComponenteLogica;
  IDFormaPagoEfectivo: string = '';
  userCajero!: InfoCajero;
  formaDePagoActual!: GrupoFormasDePago;
  seleccionoFormaDePago: boolean = false;
  filtroFormaDePago:string = '';
  filtroFormaDePagoDetalle:string = '';
  keyboard!: SimpleKeyboard;

  filtro: string = '';

  constructor(
    private billetesServicio: BilletesService,
    private headerServicio: HeaderService,
    private arqueoService: ArqueoService,
    private retiroService: RetiroService,
    private router: Router,
  ) { }

  @Input() public proceso!: string;

  onValueTeclado(valueTeclado: string):void{
    console.log('Tarjeta', valueTeclado);
    this.filtroFormaDePago = valueTeclado;
  }

  onFocusClick(event: MouseEvent){
    const input = event.target as HTMLInputElement;
    input.classList.remove('opacity-0');
    input.classList.add('opacity-100');
    
    document.getElementById('keyboardModal')!.classList.remove('opacity-0','hidden');
    document.getElementById('keyboardModal')!.classList.add('opacity-100');
  }

  getValorTeclado(valor: string):  void{
    if(valor == "{enter}"){
      document.getElementById('keyboardModal')!.classList.remove('opacity-100','block');
      document.getElementById('keyboardModal')!.classList.add('opacity-0','hidden');
      return;
    }
    if(this.seleccionoFormaDePago && valor === '{bksp}' && this.filtroFormaDePagoDetalle.length === 0) return
    if(!this.seleccionoFormaDePago && valor === '{bksp}' && this.filtroFormaDePago.length === 0) return
    
    if(this.seleccionoFormaDePago){
      if(valor === '{bksp}'){
        this.filtroFormaDePagoDetalle = this.filtroFormaDePagoDetalle.slice(0,-1);
      }else{
        this.filtroFormaDePagoDetalle = this.filtroFormaDePagoDetalle + valor;
      }
    }else{
      if(valor === '{bksp}'){
        this.filtroFormaDePago = this.filtroFormaDePago.slice(0,-1);
      }else{
        this.filtroFormaDePago = this.filtroFormaDePago + valor;
      }
    }    
  }

  async ngOnInit() {
    //this.keyboard.setInput(this.filtroFormaDePago);
    this.tarjetaFormaDePagoComponenteLogica = new TarjetaFormaPagoComponenteLogica(
      this.billetesServicio, 
      this.arqueoService,
      this.retiroService,
      this.proceso
    );
    this.cancelarProceso();
    try {
      let transaccionEstacionResponse = await this.tarjetaFormaDePagoComponenteLogica.obtenerTransaccionesDataFastEstacion();
      this.transaccionesDetalleAll = this.tarjetaFormaDePagoComponenteLogica.transaccionesDetalleAll;
      
    } catch (error) {
      console.log(error)
    }
    try {
      let transaccionEstacionResponse = await this.tarjetaFormaDePagoComponenteLogica.obtenerTransaccionesEstacion();
      this.transaccionesDetalleAll = this.tarjetaFormaDePagoComponenteLogica.transaccionesDetalleAll;
      
    } catch (error) {
      console.log(error)
    }
    
    try {
      await this.tarjetaFormaDePagoComponenteLogica.obtenerDenominacionesBilletes();
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
      localStorage.setItem('user_cajero', this.userCajero.descripcionUsuarioEstacion)
    } catch (error) {
      
    }
    this.billetesConfirmados = this.tarjetaFormaDePagoComponenteLogica!.billetesConfirmados;
    this.valorActualInicial();
  }

  valorActualInicial(){
    let valorDeclaradoActual = 0;
    this.tarjetaFormaDePagoComponenteLogica!.grupoFormasDePago.forEach(formaDePago => {
      valorDeclaradoActual += formaDePago.consolidado.valorDeclarado!
    })
    this.arrayTotales[0].valorDeclarado = valorDeclaradoActual;
  }

  recibeValor(dato: any) {
    console.log(dato);
    const denominacionBilleteConfirmado = dato[0] as DenominacionBilleteConfirmado; 
    let totalConfirmadoBillete = 0;
    this.tarjetaFormaDePagoComponenteLogica!.grupoFormasDePago.forEach((result: GrupoFormasDePago) => {
      if (result.consolidado.Formapago_fmp_descripcion == 'EFECTIVO') {
        let diferencia = 0;
        totalConfirmadoBillete = parseFloat(denominacionBilleteConfirmado.Billete_Denominacion_btd_Valor!) * parseFloat(denominacionBilleteConfirmado.valorImputRecibido!);
        denominacionBilleteConfirmado.totalConfirmado = totalConfirmadoBillete;
        let billeteConfirmadoCurrent:DenominacionBilleteConfirmado = {...denominacionBilleteConfirmado};
        let billeteExistente = this.billetesConfirmados.find((e) => e.Billete_Denominacion_IDBilleteDenominacion == billeteConfirmadoCurrent.Billete_Denominacion_IDBilleteDenominacion );
        console.log(denominacionBilleteConfirmado);
        if(!billeteExistente){
          billeteConfirmadoCurrent.isComprometido = false;
          billeteConfirmadoCurrent.isUpdate = false;
          this.billetesConfirmados.push(billeteConfirmadoCurrent);
          diferencia = denominacionBilleteConfirmado.totalConfirmado!;
        }else{
          this.billetesConfirmados.forEach(billete => {
            if(billete.Billete_Denominacion_IDBilleteDenominacion == denominacionBilleteConfirmado.Billete_Denominacion_IDBilleteDenominacion){
              diferencia = denominacionBilleteConfirmado.totalConfirmado! - billete.totalConfirmado!;
              billete.totalConfirmado = denominacionBilleteConfirmado.totalConfirmado;
              billete.valorImputRecibido = denominacionBilleteConfirmado.valorImputRecibido;
              billete.isUpdate = true;
            }
          })
        }

        //Montos globales
        let totalConfirmado = 0;
        this.billetesConfirmados.forEach(billete => {
          totalConfirmado = totalConfirmado + billete.totalConfirmado!;
        })

        result.consolidado.diferencia = -(result.consolidado.total_pagar - result.consolidado.total_retirado) + totalConfirmado;
        result.consolidado.valorDeclarado = totalConfirmado
        //Check de completado
        result.consolidado.monto_validado = (result.consolidado.diferencia >= 0) ? true : false;
        if(result.consolidado.diferencia.toFixed(2) == '0.00' || result.consolidado.diferencia.toFixed(2) == '-0.00'){
          result.consolidado.monto_validado = true;
          result.consolidado.diferencia = 0.00;
        }
        //Valor total de las denominaciones de la grid de billetes
        this.tarjetaFormaDePagoComponenteLogica!.arrayBilletes.forEach(billete => {
          if(billete.Billete_Denominacion_IDBilleteDenominacion == denominacionBilleteConfirmado.Billete_Denominacion_IDBilleteDenominacion){
            billete.valorDeclarado = totalConfirmadoBillete.toFixed(2);
            billete.Billete_Estacion_bte_cantidad = denominacionBilleteConfirmado.valorImputRecibido;
          }
        })
        //Calculo de los totales flotantes
        //Reducir el total a pagar
        console.log(diferencia);
        if(diferencia>=0){
          this.arrayTotales[0].valorDeclarado = this.arrayTotales[0].valorDeclarado! + diferencia;
          this.arrayTotales[0].total_diferencia_formas_pago = this.arrayTotales[0].total_diferencia_formas_pago + diferencia;
        }else{
          this.arrayTotales[0].valorDeclarado = this.arrayTotales[0].valorDeclarado! + diferencia;
          this.arrayTotales[0].total_diferencia_formas_pago = this.arrayTotales[0].total_diferencia_formas_pago - diferencia;
        }
       
      }
    });
    this.habilitaBotones();
   
  }

  cancelarMontosEfectivos(){
    let totalConfirmadoACancelar = this.tarjetaFormaDePagoComponenteLogica!.cancelarMontosEfectivos(this.billetesConfirmados, this.tarjetaFormaDePagoComponenteLogica!.grupoFormasDePago);
    this.arrayTotales[0].valorDeclarado! -= totalConfirmadoACancelar;
    this.arrayTotales[0].total_diferencia_formas_pago -= totalConfirmadoACancelar;
    this.inicio();
  }

  ocultarTarjetas(dato: GrupoFormasDePago) {
    this.seleccionoFormaDePago = true;
    this.formaDePagoActual = dato;
    this.transaccionesDetalleActual = [];
    this.tarjetaFormaDePagoComponenteLogica!.grupoFormasDePago.forEach(formaPago => {
      console.log(formaPago.consolidado);

      if(formaPago.consolidado.Formapago_fmp_descripcion == 'EFECTIVO' && formaPago.consolidado.Formapago_fmp_descripcion == dato.consolidado.Formapago_fmp_descripcion){
        this.efectivo = true;
        formaPago.consolidado.estado = true;
        this.detallesAMostrar = '';
        this.hide = "calc(100vh)";
        this.IDFormaPagoEfectivo = formaPago.consolidado.Formapago_IDFormapago!;
      }else if(formaPago.consolidado.Formapago_fmp_descripcion == dato.consolidado.Formapago_fmp_descripcion){
        this.detallesAMostrar = formaPago.consolidado.Formapago_fmp_descripcion;
        this.efectivo = false;
        this.hide = "calc(100vh)";
        formaPago.consolidado.estado = true;
        this.detallesAMostrar = formaPago.consolidado.Formapago_fmp_descripcion;
      }else{
        formaPago.consolidado.rule = 'none';
      }
      //Detalle
      this.transaccionesDetalleAll.forEach(transaccion =>{
        transaccion.styleDisplay = (transaccion.Formapago_padre == dato.consolidado.Formapago_fmp_descripcion) ? 'block' : 'none';
      })
    });
    this.totales = false;
  }

  inicio() {
    this.efectivo = false;
    this.totales = true;
    this.hide = "497px";
    this.validaMonto = false;
    this.seleccionoFormaDePago = false;
    this.tarjetaFormaDePagoComponenteLogica!.grupoFormasDePago.forEach(element => {
      element.consolidado.estado = true;
      element.consolidado.rule = "block";
    });
    this.transaccionesDetalleAll.forEach(detalleFormasPago =>{
      detalleFormasPago.styleDisplay = 'none';
    })
    this.habilitaBotones();
  }

  async confirmaBilletes(){
    if(this.efectivo){
      await this.tarjetaFormaDePagoComponenteLogica?.comprometerBilleteEfectivo(this.billetesConfirmados);
    }else{
      this.tarjetaFormaDePagoComponenteLogica?.comprometerDineroProceso(this.formaDePagoActual);
    }
    this.inicio();
  }

  seleccionarFormaPago(detalleFormaPago: TransaccionEstacion) {
    this.validaMonto = true;
    this.validarMontoFormaPago = detalleFormaPago;
    this.validaMontoWidth = detalleFormaPago.monto_validado ? '249px' : '340px';
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

  confirmarMonto(detalleFormaPago: TransaccionEstacion, reverse: boolean) {
    let valorDeclarado:bigDecimal = new bigDecimal(0); 
    let diferenciaActual:bigDecimal = new bigDecimal(0); 
    this.tarjetaFormaDePagoComponenteLogica!.grupoFormasDePago.forEach(formasDePago => {
      formasDePago.transacciones.forEach(formaDePago => {
        if(formaDePago.Formapago_fmp_descripcion == detalleFormaPago.Formapago_fmp_descripcion && 
           formaDePago.Formapago_padre == detalleFormaPago.Formapago_padre
        ){
          //El detalle
          formaDePago.diferencia = (reverse) ? (formaDePago.total_retirado - formaDePago.total_pagar) : 0;
          formaDePago.monto_validado = (formaDePago.diferencia >= 0) ? true : false;

          formaDePago.valorDeclarado = (reverse) 
          ?  formaDePago.valorDeclarado! - (detalleFormaPago.total_pagar - detalleFormaPago.total_retirado)
          : formaDePago.valorDeclarado! + (detalleFormaPago.total_pagar - detalleFormaPago.total_retirado)
          //La forma principal
          diferenciaActual.setValue(formasDePago.consolidado.diferencia);
          valorDeclarado.setValue(detalleFormaPago.total_pagar! - detalleFormaPago.total_retirado);
          console.log(diferenciaActual);
          console.log(valorDeclarado);
          formasDePago.consolidado.diferencia = (reverse) 
            /*? formasDePago.consolidado.diferencia - detalleFormaPago.total_pagar 
            : formasDePago.consolidado.diferencia + detalleFormaPago.total_pagar;*/
            ? parseFloat(diferenciaActual.subtract(valorDeclarado).round(2).getValue())
            : parseFloat(diferenciaActual.add(valorDeclarado).round(2).getValue())

            console.log(detalleFormaPago.total_pagar);

          formasDePago.consolidado.valorDeclarado = (reverse) 
          ? formasDePago.consolidado.valorDeclarado! - (detalleFormaPago.total_pagar - detalleFormaPago.total_retirado) 
          : formasDePago.consolidado.valorDeclarado! + (detalleFormaPago.total_pagar - detalleFormaPago.total_retirado);

          formasDePago.consolidado.monto_validado = (formasDePago.consolidado.diferencia >= 0) ? true : false;
          //Totales
          this.arrayTotales[0].total_diferencia_formas_pago = (reverse) 
          ? this.arrayTotales[0].total_diferencia_formas_pago - detalleFormaPago.total_pagar
          : this.arrayTotales[0].total_diferencia_formas_pago + detalleFormaPago.total_pagar;

          this.arrayTotales[0].valorDeclarado = (reverse) 
          ? this.arrayTotales[0].valorDeclarado! - detalleFormaPago.total_pagar
          : this.arrayTotales[0].valorDeclarado! + detalleFormaPago.total_pagar;

          this.transaccionesDetalleActual.push(formaDePago);

          this.validaMonto = false;
        }
      })
    })

    detalleFormaPago.cardSeleccionada = false;

    this.validarMontoFormaPago.monto_validado = detalleFormaPago.monto_validado;
    this.validaMontoWidth = detalleFormaPago.monto_validado ? '249px' : '301px';
    this.habilitaBotones();

  }

  cerrarValidaMonto() {
    this.validaMonto = false;
    this.validarMontoFormaPago.cardSeleccionada = false;
  }

  async confirmarButton() {
    try {
      this.tarjetaFormaDePagoComponenteLogica!.grupoFormasDePago.forEach(async formaDePago => {
        if(formaDePago.consolidado.Formapago_fmp_descripcion == 'EFECTIVO'){
          await this.tarjetaFormaDePagoComponenteLogica?.consolidarCompromisoBilletes(formaDePago);
        }
      })
      await this.tarjetaFormaDePagoComponenteLogica?.consolidarProceso();

    } catch (error) {
      console.log(error);
    }
    try {
      let resultImprimirAqueo = await this.tarjetaFormaDePagoComponenteLogica?.imprimirProceso();
      let user = localStorage.getItem('user_cajero')
      if(!resultImprimirAqueo!.error && resultImprimirAqueo!.resolucion){
        this.toast.mostrar = true;
        this.toast.mensaje = resultImprimirAqueo!.mensajeFront!+user;
        this.toast.type = TypeToast.success;
      }else{
        this.toast.mensaje = resultImprimirAqueo!.mensajeFront!+user;
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

  /**Cancela el proceso actual del front */
  cancelarProceso() {
    this.tarjetaFormaDePagoComponenteLogica?.cancelarProceso();
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

  mostrarDiv() {
    var div = document.getElementById('miDiv');
    div!.classList.remove('hidden', 'opacity-0', 'invisible');
    div!.classList.add('opacity-100', 'visible');
  }

  habilitaBotones(){
    this.transaccion = (this.arrayTotales[0].valorDeclarado! > 0) ? true : false;
  }

}
