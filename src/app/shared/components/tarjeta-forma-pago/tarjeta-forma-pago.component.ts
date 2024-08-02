import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { 
  GrupoFormasDePago, 
  TransaccionEstacion, 
  DenominacionBilleteConfirmado,
} from 'src/app/core/interfaces/shared';
import { 
  BilletesService,
  HeaderService, 
  RetiroService,
  ArqueoService
} from 'src/app/core/services';
import { TotalVentaEstacion } from 'src/app/interfaces/arqueo-caja/arqueo-caja.interface';
import { InfoCajero } from 'src/app/interfaces/home/home.interface';
import { Toast, TypeToast } from 'src/app/interfaces/toast.interface';
import { ConsolidarTransaccionesEstacion } from 'src/app/interfaces/transacciones-estacion.interface';
import { TarjetaFormaPagoComponenteController } from 'src/app/core/utils';
import { environment } from 'src/environments/environment.local';
import SimpleKeyboard from 'simple-keyboard';
import bigDecimal from 'js-big-decimal';


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
  tarjetaFormaDePagoComponenteLogica?: TarjetaFormaPagoComponenteController;
  IDFormaPagoEfectivo: string = '';
  userCajero!: InfoCajero;
  formaDePagoActual!: GrupoFormasDePago;
  seleccionoFormaDePago: boolean = false;
  filtroFormaDePago:string = '';
  filtroFormaDePagoDetalle:string = '';
  keyboard!: SimpleKeyboard;
  cargando: boolean = true;

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
    console.log(valor)
    if(valor == "enter"){
      document.getElementById('keyboardModal')!.classList.remove('opacity-100','block');
      document.getElementById('keyboardModal')!.classList.add('opacity-0','hidden');
      return;
    }
    if(this.seleccionoFormaDePago && valor === 'space' && this.filtroFormaDePagoDetalle.length === 0) return
    if(!this.seleccionoFormaDePago && valor === 'space' && this.filtroFormaDePago.length === 0) return
    
    if(this.seleccionoFormaDePago){
      if(valor === 'borrar'){
        this.filtroFormaDePagoDetalle = this.filtroFormaDePagoDetalle.slice(0,-1);
      }else{
        this.filtroFormaDePagoDetalle = this.filtroFormaDePagoDetalle + valor;
      }
    }else{
      if(valor === 'borrar'){
        this.filtroFormaDePago = this.filtroFormaDePago.slice(0,-1);
      }else{
        this.filtroFormaDePago = this.filtroFormaDePago + valor;
      }
    }    
  }

  async ngOnInit() {
    this.tarjetaFormaDePagoComponenteLogica = new TarjetaFormaPagoComponenteController(
      this.billetesServicio, 
      this.arqueoService,
      this.retiroService,
      this.proceso
    );
    this.cancelarProceso();
    try {
      await this.tarjetaFormaDePagoComponenteLogica.obtenerTransaccionesDataFastEstacion();
      this.transaccionesDetalleAll = this.tarjetaFormaDePagoComponenteLogica.transaccionesDetalleAll;
      
    } catch (error) {
      console.log(error)
    }
    try {
      await this.tarjetaFormaDePagoComponenteLogica.obtenerTransaccionesEstacion();
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
      await this.tarjetaFormaDePagoComponenteLogica.obtenerTotales();
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
    this.cargando = false;
  }

  valorActualInicial(){
    let valorDeclaradoActual = 0;
    this.tarjetaFormaDePagoComponenteLogica!.grupoFormasDePago.forEach(formaDePago => {
      valorDeclaradoActual += formaDePago.consolidado.valorDeclarado!
    })
    this.tarjetaFormaDePagoComponenteLogica!.infoTotales.valorDeclarado = valorDeclaradoActual;
  }

  recibeValor(dato: any) {
    const denominacionBilleteConfirmado = dato[0] as DenominacionBilleteConfirmado; 
    denominacionBilleteConfirmado.totalConfirmado = parseFloat(bigDecimal.multiply(denominacionBilleteConfirmado.Billete_Denominacion_btd_Valor!, denominacionBilleteConfirmado.valorImputRecibido!));
    this.tarjetaFormaDePagoComponenteLogica!.insertarBilleteConfirmado(denominacionBilleteConfirmado);
    this.tarjetaFormaDePagoComponenteLogica!.actualizarConsolidadoEfectivo();
    this.habilitaBotones();
  }

  cancelarMontosEfectivos(){
    let totalConfirmadoACancelar = this.tarjetaFormaDePagoComponenteLogica!.cancelarMontosEfectivos();
    this.tarjetaFormaDePagoComponenteLogica!.infoTotales.valorDeclarado! -= totalConfirmadoACancelar;
    this.tarjetaFormaDePagoComponenteLogica!.infoTotales.total_diferencia_formas_pago -= totalConfirmadoACancelar;
    this.inicio();
  }

  ocultarTarjetas(dato: GrupoFormasDePago) {
    this.seleccionoFormaDePago = true;
    this.formaDePagoActual = dato;
    this.transaccionesDetalleActual = [];
    this.tarjetaFormaDePagoComponenteLogica!.grupoFormasDePago.forEach(formaPago => {
      console.log(formaPago.consolidado);

      if(formaPago.consolidado.Formapago_fmp_descripcion == environment.descripcion_dinero && formaPago.consolidado.Formapago_fmp_descripcion == dato.consolidado.Formapago_fmp_descripcion){
        this.efectivo = true;
        formaPago.consolidado.estado = true;
        this.detallesAMostrar = '';
        this.IDFormaPagoEfectivo = formaPago.consolidado.Formapago_IDFormapago!;
        this.tarjetaFormaDePagoComponenteLogica!.getComprometidoActual();
        this.hide = "calc(100vh)";
      }else if(formaPago.consolidado.Formapago_fmp_descripcion == dato.consolidado.Formapago_fmp_descripcion){
        this.detallesAMostrar = formaPago.consolidado.Formapago_fmp_descripcion;
        this.efectivo = false;
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
      await this.tarjetaFormaDePagoComponenteLogica?.comprometerBilleteEfectivo(this.billetesConfirmados)!;
      this.tarjetaFormaDePagoComponenteLogica!.actualizarConsolidadoEstacion(this.tarjetaFormaDePagoComponenteLogica!.infoTotales);
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
    let formaDePago =  this.tarjetaFormaDePagoComponenteLogica!.confirmarMonto(detalleFormaPago, reverse);
    this.transaccionesDetalleActual.push(formaDePago);
    this.validaMonto = false;
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
        if(formaDePago.consolidado.Formapago_fmp_descripcion == environment.descripcion_dinero){
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

  habilitaBotones(){
    this.transaccion = true;
  }

}
