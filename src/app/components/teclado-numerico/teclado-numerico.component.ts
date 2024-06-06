import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-teclado-numerico',
  templateUrl: './teclado-numerico.component.html',
  styleUrls: ['./teclado-numerico.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TecladoNumericoComponent {
 @Input() denominacion!:string
 @Output() valor = new EventEmitter<any[]>();

 inputValue :string='';

 agregar(value: string) {
  this.inputValue += value;
   this.valor.emit([this.inputValue,this.denominacion]);
}
quitar(){
    this.inputValue = this.inputValue.slice(0, -1);
    this.valor.emit([this.inputValue,this.denominacion]);
}
}
