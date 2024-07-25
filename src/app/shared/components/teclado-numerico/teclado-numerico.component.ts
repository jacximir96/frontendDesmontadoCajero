import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { DenominacionesBilletes, Tecla } from 'src/app/core/interfaces/shared';

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
  @Input() mostrarDirecciones: boolean = true;
  @Output() valor = new EventEmitter<any[]>();
  @Output() flecha = new EventEmitter<string>();
  @Output() cerrar = new EventEmitter<boolean>();
  @Output() confirmacion = new EventEmitter<void>();

  inputValue: string = '';
  imagen: string = this.imagenMonedaBillete;

  pad_numerico: Array<Array<Tecla>> = [
    [
      { lower_key:'1', upper_key: '1', spec_key: '1', width: 'normal', command: 'transparent' },
      { lower_key:'2', upper_key: '2', spec_key: '2', width: 'normal', command: 'transparent' },
      { lower_key:'3', upper_key: '3', spec_key: '3', width: 'normal', command: 'transparent' }
    ],
    [
      { lower_key:'4', upper_key: '4', spec_key: '4', width: 'normal', command: 'transparent' },
      { lower_key:'5', upper_key: '5', spec_key: '5', width: 'normal', command: 'transparent' },
      { lower_key:'6', upper_key: '6', spec_key: '6', width: 'normal', command: 'transparent' }
    ],
    [
      { lower_key:'7', upper_key: '7', spec_key: '7', width: 'normal', command: 'transparent' },
      { lower_key:'8', upper_key: '8', spec_key: '8', width: 'normal', command: 'transparent' },
      { lower_key:'9', upper_key: '9', spec_key: '9', width: 'normal', command: 'transparent' }
    ],
    [
      { lower_key:'<', upper_key: '<', spec_key: '<', width: 'normal', command: 'borrar' },
      { lower_key:'0', upper_key: '0', spec_key: '0', width: 'normal', command: 'transparent' },
      { lower_key:'.', upper_key: '.', spec_key: '.', width: 'normal', command: 'transparent' }
    ]
  ]

  @ViewChild('inputDato') inputDato: ElementRef | undefined;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['denominacionBilletes']) {
        this.inputValue = "";
    }
    this.valor.emit([this.inputValue, this.denominacion]);
  }

  agregar(tecla: Tecla) {
    if(tecla.command == 'borrar'){
      this.quitar()
    }else{
      this.inputValue += tecla.lower_key;
      this.valor.emit([this.inputValue, this.denominacion]);
    }
    
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
