import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
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

  @ViewChild('inputDato') inputDato: ElementRef | undefined;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['denominacionBilletes']) {
      if(this.denominacionBilletes.Billete_Estacion_bte_cantidad! != undefined){
        this.inputValue = this.denominacionBilletes.Billete_Estacion_bte_cantidad!;
      }else{
        this.inputValue = "";
      }
    }
    this.valor.emit([this.inputValue, this.denominacion]);
    console.log(this.inputDato);
    this.handleFocus();
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

  //Simular focus
  handleFocus() {
    // Simular un cursor parpadeante en input2
    console.log('handle')
    if (this.inputDato && this.inputDato.nativeElement) {
      const inputElement: HTMLInputElement = this.inputDato.nativeElement;
      let visible = true;
      
      setInterval(() => {
        console.log("intervalo")
        visible = !visible;
        //inputElement.style.setProperty('caret-color', visible ? 'black' : 'transparent');
      }, 500); // Cambia cada medio segundo (500ms)
    }
  }

}
