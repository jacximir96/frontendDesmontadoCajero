import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardSeleccionada, TransaccionEstacion } from 'src/app/core/interfaces/shared';

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

  cardSeleccionada: CardSeleccionada = {
    transaccion: this.transaccion!,
    isConsolidado: this.isConsolidado
  };

  @Output() seleccionoTransaccion = new EventEmitter<CardSeleccionada>();
  @Output() ocultaTarjetas = new EventEmitter<String>();
 
  emitirSeleccionTransaccion() {
    this.seleccionoTransaccion.emit(this.cardSeleccionada!);
  }

  emitirOcultarTarjetas() {
    this.ocultaTarjetas.emit(this.transaccion.Formapago_padre);
  }

  ngOnInit(): void {
    this.cardSeleccionada.isConsolidado = this.isConsolidado;
    this.cardSeleccionada.transaccion = this.transaccion;
  }

}
