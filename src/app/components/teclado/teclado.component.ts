import { Component, EventEmitter, Input, Output } from '@angular/core';
import SimpleKeyboard from 'simple-keyboard';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.scss']
})
export class TecladoComponent {
  keyboard!: SimpleKeyboard;
  caracterIngresado!: string;

  @Input() public valueKeyboard!: string;

  @Output()
  public onValueTeclado: EventEmitter<string> = new EventEmitter();

  emitValorTeclado(): void{
    console.log('teclado', this.valueKeyboard);
    this.onValueTeclado.emit(this.caracterIngresado);
  }

  ngAfterContentInit() {
    this.keyboard = new SimpleKeyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      theme: "hg-theme-default myTheme1",
    });
  }

  onChange = (input: string) => {
    this.valueKeyboard = input;
    console.log("Input changed", input);
    this.emitValorTeclado();
  };

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

}
