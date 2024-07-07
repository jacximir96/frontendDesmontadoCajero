import { DenominacionBilleteConfirmado } from './../../interfaces/arqueo-caja/denominacion-billete-confirmado.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DenominacionesBilletes } from 'src/app/interfaces/arqueo-caja/arqueo-caja.interface';

@Component({
  selector: 'app-tabla-billetes',
  templateUrl: './tabla-billetes.component.html',
  styleUrls: ['./tabla-billetes.component.scss']
})
export class TablaBilletesComponent implements OnInit{

  constructor() { }
  @Input() 
  public arrayDenominacionesBilletes!: DenominacionesBilletes[];

  @Output() total = new EventEmitter<any[]>();;
  visible: boolean = false;
  inputRecibido!: string;
  denominacion!: string;
  IDDedominacionBillete!: string;
  denominacionBilleteConfirmado: DenominacionBilleteConfirmado = {};
  arrayIds: any[] = [];
  placeholder: string = "Presione aquí";

  confirmarValor(){
    this.denominacionBilleteConfirmado.valorImputRecibido = this.inputRecibido;
    this.total.emit([this.denominacion,this.inputRecibido]);
  }

  recibirMensaje(valor: any) {
    this.inputRecibido = valor[0];
    this.cambiarValor(valor[1]);
  }
  cambiarValor(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = this.inputRecibido;
    }
  }
  ngOnInit() {
    //this.arrayBillletes = this.arrayDenominacionesBilletes;
  }

  urlBilletesMonedas(tipo: string) {
    return tipo.trim() == 'BILLETE' ? '../../../assets/images/billetes-nuevo.png' : '../../../assets/images/monedas-nuevo.png'
  }

  ordenarArray(field: string) {
    this.arrayDenominacionesBilletes.sort((a:any, b:any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  teclado(denominacion: string, id: string, cantidad?: number) {

    const input = document.getElementById(denominacion.toString()) as HTMLInputElement;
    if (input) {
      input.placeholder = '';
    }
    this.visible = true;
    this.denominacion = denominacion.toString();
    this.denominacionBilleteConfirmado.Billete_Denominacion_btd_Valor = denominacion;
    this.denominacionBilleteConfirmado.Billete_Denominacion_IDBilleteDenominacion = id;
    this.arrayDenominacionesBilletes.forEach(res => {
      this.fondoFila(res.Billete_Denominacion_IDBilleteDenominacion, 'white');
    })
    this.fondoFila(id, "ghostwhite");
  }

  fondoFila(id: string, color: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement) {
      inputElement.style.backgroundColor = color;
    }
  }

  direccion(flecha: string) {
    console.log(flecha);
    const table = document.getElementById('tabla');
    const rows = table?.getElementsByTagName('tr');
    const rowsInputs: HTMLInputElement[] = [];
     
    let posicion = -1;
    let arrayId = [];
    if (rows) {

      //Obtener los elementos 
      for (let i = 1; i < rows.length; i++) {
        if(rows[i].id)
          arrayId.push(rows[i].id);
      }
      arrayId.forEach( res => {
        let fila = document.getElementById(res);
        let input = fila!.querySelectorAll('input')[0];
        rowsInputs.push(input);
      })
    }


    let currentIndexFocus = this.focusNextInput(rowsInputs);
    console.log(currentIndexFocus);
    rowsInputs[currentIndexFocus!+1].focus();
    let IDenominacionBillete = rowsInputs[currentIndexFocus!+1].closest('tr')!.id;
    this.teclado(rowsInputs[currentIndexFocus!+1].id.toString(), IDenominacionBillete);
    //rowsInputs[currentIndexFocus!+1].focus();
    //rowsInputs[currentIndexFocus!+1].dispatchEvent(eventoKeypress);
  }

  focusNextInput(rowsInputs: HTMLInputElement[]) {
    let focusCurrentIndex = 0;
    for (let i = 1; i < rowsInputs.length; i++) {
      let tr = rowsInputs[i].closest('tr');
      if(tr!.style.backgroundColor == 'ghostwhite'){
        focusCurrentIndex = i;
      }
    }
    return focusCurrentIndex;
  }

  

  ocultar(valor: any) {
    this.visible = valor;
  }

}


