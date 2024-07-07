import { Component, EventEmitter, Input, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-teclado-numerico',
  templateUrl: './teclado-numerico.component.html',
  styleUrls: ['./teclado-numerico.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TecladoNumericoComponent {
  @Input() denominacion!: string
  @Output() valor = new EventEmitter<any[]>();
  @Output() flecha = new EventEmitter<string>();
  @Output() cerrar = new EventEmitter<boolean>();
  @Output() confirmacion = new EventEmitter<void>();

  inputValue: string = '';
  imagen: string = '';
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['denominacion']) {
      this.inputValue = "";
      this.imagen = parseInt(this.denominacion) >= 1 ? 'billetes-nuevo.png' : 'monedas-nuevo.png'
    }
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

}
