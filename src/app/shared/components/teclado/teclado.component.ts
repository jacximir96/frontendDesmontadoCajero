import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import SimpleKeyboard from 'simple-keyboard';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.scss']
})
export class TecladoComponent implements OnInit{

  keyboard!: SimpleKeyboard;
  caracterIngresado!: string;

  @Input() public valueKeyboard!: string;

  @Output()
  public onValueTeclado: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.valueKeyboard = '';
  }

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}"){
      this.handleShift();
    }else{
      this.caracterIngresado = (button === '{space}' || button === '{tab}') ? ' ' : button;
      if(button == "{enter}"){
        document.getElementById('keyboardModal')!.classList.remove('opacity-100','block');
        document.getElementById('keyboardModal')!.classList.add('opacity-0','hidden');
      }
    }
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
    console.log(valorTecla);
    this.onValueTeclado.emit(valorTecla);
  }

}
