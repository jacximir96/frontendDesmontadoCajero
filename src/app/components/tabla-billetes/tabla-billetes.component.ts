import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabla-billetes',
  templateUrl: './tabla-billetes.component.html',
  styleUrls: ['./tabla-billetes.component.scss']
})
export class TablaBilletesComponent {

  constructor() { }
  @Input() arrayLista!: any[];
  @Output() total = new EventEmitter<any[]>();;
  array: any[] = [];
  visible: boolean = false;
  inputRecibido!: string;
  denominacion!: string;
  arrayIds: any[] = [];
  placeholder: string = "Presione aquí";

 confirmarValor(){
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
    this.array = this.arrayLista;
  }

  urlBilletesMonedas(tipo: string) {
    return tipo.trim() == 'BILLETE' ? '../../../assets/images/billetes-nuevo.png' : '../../../assets/images/monedas-nuevo.png'
  }

  ordenarArray(field: string) {
    this.array.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  teclado(denominacion: string, id: string, cantidad: string) {

    const input = document.getElementById(denominacion) as HTMLInputElement;
    if (input) {
      input.placeholder = '';
    }
    this.visible = true;
    this.denominacion = denominacion;
    this.arrayLista.forEach(res => {
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

  direccion(flecha: any) {
    console.log(flecha);
    const table = document.getElementById('tabla');
    const rows = table?.getElementsByTagName('tr');
    let posicion = -1;
    let arrayId = [];
    if (rows) {

      for (let i = 1; i < rows.length; i++) {
        if(rows[i].id)
          arrayId.push(rows[i].id);
      }
      if(flecha=='adelante'){ 
      let index = 0;
      arrayId.forEach((res)=>{
        let fila = document.getElementById(res);
        if(fila?.style.backgroundColor == 'ghostwhite')
        {posicion = index; this.fondoFila(res, 'white');}
        else
        {this.fondoFila(res, 'white');}

        index++;
      });
      
      this.fondoFila(arrayId[posicion+1], 'ghostwhite');
    }

    if(flecha=='atras'){ 

      for (let i = arrayId.length; i >= 0; i--) {
        let fila = document.getElementById(arrayId[i]);
        if(fila?.style.backgroundColor == 'ghostwhite')
        {posicion = i; this.fondoFila(arrayId[i], 'white');}
        else
        {this.fondoFila(arrayId[i], 'white');}
      
    }
    this.fondoFila(arrayId[posicion-1], 'ghostwhite');


    }
  }}

  

  ocultar(valor: any) {
    this.visible = valor;
  }

}


