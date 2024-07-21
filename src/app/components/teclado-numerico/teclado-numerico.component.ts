import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { DenominacionesBilletes } from 'src/app/interfaces/shared';

@Component({
  selector: 'app-teclado-numerico',
  templateUrl: './teclado-numerico.component.html',
  styleUrls: ['./teclado-numerico.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TecladoNumericoComponent {
  @Input() denominacion!: string
  @Input() denominacionBilletes!: DenominacionesBilletes
  @Input() imagenMonedaBillete!: string;
  @Output() valor = new EventEmitter<any[]>();
  @Output() flecha = new EventEmitter<string>();
  @Output() cerrar = new EventEmitter<boolean>();
  @Output() confirmacion = new EventEmitter<void>();

  inputValue: string = '';
  imagen: string = this.imagenMonedaBillete;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['denominacion']) {
      if(this.denominacionBilletes.Billete_Estacion_bte_cantidad! != undefined){
        this.inputValue = this.denominacionBilletes.Billete_Estacion_bte_cantidad!;
      }else{
        this.inputValue = "";
      }
    }
    this.valor.emit([this.inputValue, this.denominacion]);
  }

  agregar(value: string) {
    this.inputValue += value;
    this.valor.emit([this.inputValue, this.denominacion]);
  }

  quitar() {
    this.inputValue = this.inputValue.slice(0, -1);
    this.valor.emit([this.inputValue, this.denominacion]);
  }

  direccion(valor: string) {
    this.flecha.emit(valor);
  }

  cerrarTeclado() {
    this.cerrar.emit(false);
  };

  confirmar() {
    this.confirmacion.emit();
  }

  limpiarInput(){
    this.inputValue = ''
    this.valor.emit([this.inputValue, this.denominacion]);
  }

}
