import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import SimpleKeyboard from 'simple-keyboard';
import { Tecla } from 'src/app/core/interfaces/shared';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.scss']
})
export class TecladoComponent implements OnInit{

  keyboard!: SimpleKeyboard;
  caracterIngresado!: string;
  rutaBaseIcon: string = '../../../assets/images';

  @Input() public valueKeyboard!: string;

  @Output()
  public onValueTeclado: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.valueKeyboard = '';
  }
  teclado: Array<Array<Tecla>> = [
    [
      { lower_key:'q', upper_key: 'Q', spec_key: '1', class: '', icon: '', command: 'transparent' },
      { lower_key:'w', upper_key: 'W', spec_key: '2', class: '', icon: '', command: 'transparent' },
      { lower_key:'e', upper_key: 'E', spec_key: '3', class: '', icon: '', command: 'transparent' },
      { lower_key:'r', upper_key: 'R', spec_key: '4', class: '', icon: '', command: 'transparent' },
      { lower_key:'t', upper_key: 'T', spec_key: '5', class: '', icon: '', command: 'transparent' },
      { lower_key:'y', upper_key: 'Y', spec_key: '6', class: '', icon: '', command: 'transparent' },
      { lower_key:'u', upper_key: 'U', spec_key: '7', class: '', icon: '', command: 'transparent' },
      { lower_key:'i', upper_key: 'I', spec_key: '8', class: '', icon: '', command: 'transparent' },
      { lower_key:'o', upper_key: 'O', spec_key: '9', class: '', icon: '', command: 'transparent' },
      { lower_key:'p', upper_key: 'P', spec_key: '0', class: '', icon: '', command: 'transparent' },
      { lower_key:'',  upper_key: '',  spec_key: '',  class: 'hg-button-bksp w-1/12', icon: '/backSpaceIcon.png', command: 'borrar' }
    ],
    [
      { lower_key:'a', upper_key: 'A', spec_key: '@', class: 'ml-20', icon: '', command: 'transparent' },
      { lower_key:'s', upper_key: 'S', spec_key: '#', class: '', icon: '', command: 'transparent' },
      { lower_key:'d', upper_key: 'D', spec_key: '$', class: '', icon: '', command: 'transparent' },
      { lower_key:'f', upper_key: 'F', spec_key: '_', class: '', icon: '', command: 'transparent' },
      { lower_key:'g', upper_key: 'G', spec_key: '&', class: '', icon: '', command: 'transparent' },
      { lower_key:'h', upper_key: 'H', spec_key: '-', class: '', icon: '', command: 'transparent' },
      { lower_key:'j', upper_key: 'J', spec_key: '+', class: '', icon: '', command: 'transparent' },
      { lower_key:'k', upper_key: 'K', spec_key: '(', class: '', icon: '', command: 'transparent' },
      { lower_key:'l', upper_key: 'L', spec_key: ')', class: '', icon: '', command: 'transparent' },
      { lower_key:'"', upper_key: '"', spec_key: '/', class: '', icon: '', command: 'transparent' },
      { lower_key:'' , upper_key: '' , spec_key: '/', class: 'hg-button-enter', icon: '/entericon.png', command: 'enter' }
    ],
    [
      { lower_key:'',  upper_key: '',  spec_key: '',  class: 'hg-button-lock', icon: '/arrowShiftRight.png', command: 'shift' },
      { lower_key:'z', upper_key: 'Z', spec_key: '*', class: '', icon: '', command: 'transparent' },
      { lower_key:'x', upper_key: 'X', spec_key: '"', class: '', icon: '', command: 'transparent' },
      { lower_key:'c', upper_key: 'C', spec_key: '´', class: '', icon: '', command: 'transparent' },
      { lower_key:'v', upper_key: 'V', spec_key: ':', class: '', icon: '', command: 'transparent' },
      { lower_key:'b', upper_key: 'B', spec_key: ';', class: '', icon: '', command: 'transparent' },
      { lower_key:'n', upper_key: 'N', spec_key: '!', class: '', icon: '', command: 'transparent' },
      { lower_key:'m', upper_key: 'M', spec_key: '?', class: '', icon: '', command: 'transparent' },
      { lower_key:',', upper_key: ',', spec_key: ',', class: '', icon: '', command: 'transparent' },
      { lower_key:'.', upper_key: '.', spec_key: '.', class: '', icon: '', command: 'transparent' },
      { lower_key:'?', upper_key: '?', spec_key: '?', class: '', icon: '', command: 'transparent' },
      { lower_key:'',  upper_key: '',  spec_key: '',  class: 'hg-button-lock', icon: '/arrowShiftRight.png', command: 'shift' }
    ],
    [
      { lower_key:'123', upper_key: '123', spec_key: '123', class: '', icon: '', command: 'transparent' },
      { lower_key:'@', upper_key: '@', spec_key: '@', class: '', icon: '', command: 'transparent' },
      { lower_key:' ', upper_key: ' ', spec_key: ' ', class: 'hg-button-space w-1/2', icon: '', command: 'space' },
      { lower_key:'<', upper_key: '<', spec_key: '<', class: '', icon: '', command: 'transparent' },
      { lower_key:'>', upper_key: '>', spec_key: '>', class: '', icon: '', command: 'transparent' },
      { lower_key:'ENG', upper_key: 'ENG', spec_key: 'ENG', class: '', icon: '', command: 'transparent' }
    ]
  ];

  onKeyPress = (tecla: Tecla) => {
    switch (tecla.command) {
      case 'space': this.caracterIngresado = ' '; break;
      case 'enter': this.caracterIngresado = 'enter'; break;
      case 'borrar': this.caracterIngresado = 'borrar'; break;
      default: this.caracterIngresado = tecla.lower_key; break;
    }
    this.emitValorTeclado(this.caracterIngresado)
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  emitValorTeclado(valorTecla: string){
    this.onValueTeclado.emit(valorTecla);
  }

}
