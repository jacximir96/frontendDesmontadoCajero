import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardSeleccionada, TransaccionEstacion } from 'src/app/interfaces/shared';

@Component({
  selector: 'app-card-forma-pago',
  templateUrl: './card-forma-pago.component.html',
  styleUrls: ['./card-forma-pago.component.scss']
})
export class CardFormaPagoComponent implements OnInit{
  
  @Input()
  public transaccion!: TransaccionEstacion;
  @Input()
  public isConsolidado: boolean = true;
  @Input()

  cardSeleccionada: CardSeleccionada = {
    transaccion: this.transaccion!,
    isConsolidado: this.isConsolidado
  };

  @Output() seleccionoTransaccion = new EventEmitter<CardSeleccionada>();
  @Output() ocultaTarjetas = new EventEmitter<String>();
 
  emitirSeleccionTransaccion() {
    this.seleccionoTransaccion.emit(this.cardSeleccionada);
  }

  emitirOcultarTarjetas() {
    this.ocultaTarjetas.emit(this.transaccion.Formapago_padre);
  }

  ngOnInit(): void {
    /*if (this.consolidado) {
      this.transaccion.Control_Estacion_IDControlEstacion = this.consolidado.Control_Estacion_IDControlEstacion;
      this.transaccion.Control_Estacion_IDUsersPos = this.consolidado.Control_Estacion_IDUsersPos;
      this.transaccion.Estacion_est_nombre = this.consolidado.Estacion_est_nombre;
      this.transaccion.Formapago_Factura_fpf_swt = '';
      this.transaccion.Formapago_IDFormapago = this.consolidado.Formapago_IDFormapago!;
      this.transaccion.Formapago_fmp_descripcion = this.consolidado.Formapago_fmp_descripcion;
      this.transaccion.Formapago_padre = this.consolidado.Formapago_fmp_descripcion;
      this.transaccion.Retiros_ultimo_retiro = this.consolidado.Retiros_ultimo_retiro;
      this.transaccion.agregador = this.consolidado.agregador!;
      this.transaccion.cardSeleccionada = false;
      this.transaccion.diferencia = this.consolidado.diferencia;
      this.transaccion.egreso = this.consolidado.egreso;
      this.transaccion.estado_switch = this.consolidado.estado_switch!;
      this.transaccion.imagen = this.consolidado.imagen;
      this.transaccion.ingreso = this.consolidado.ingreso;
      this.transaccion.monto_validado = this.consolidado.monto_validado;
      this.transaccion.numero_transacciones = this.consolidado.numero_transacciones;
      this.transaccion.numero_transacciones_ingresadas = this.consolidado.numero_transacciones_ingresadas;
      this.transaccion.styleDisplay = 'block';
      this.transaccion.total_pagar = this.consolidado.total_pagar;
      this.transaccion.total_retirado = this.consolidado.total_retirado;
      this.transaccion.transferencia = '';
      this.transaccion.valorDeclarado = this.consolidado.valorDeclarado;
    }*/
  }

}
