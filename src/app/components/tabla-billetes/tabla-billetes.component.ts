import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DenominacionesBilletes } from 'src/app/interfaces/arqueo-caja/denominacion-billete-response.interface';
import { DenominacionBilleteConfirmado } from './../../interfaces/arqueo-caja/denominacion-billete-confirmado.interface';
import { BilletesService } from 'src/app/services/billetes.service';
import { environment } from 'src/environments/environment.local';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tabla-billetes',
  templateUrl: './tabla-billetes.component.html',
  styleUrls: ['./tabla-billetes.component.scss']
})
export class TablaBilletesComponent implements OnInit{

  constructor(private billetesServicio: BilletesService) { }

  @Input() 
  public arrayDenominacionesBilletes!: DenominacionesBilletes[];

  @Input() 
  public IDFormaPagoEfectivo!: string;

  @Output() total = new EventEmitter<any[]>();;
  visible: boolean = false;
  inputRecibido!: string;
  denominacion!: string;
  IDDedominacionBillete!: string;
  denominacionBilleteConfirmado: DenominacionBilleteConfirmado = {};
  arrayIds: any[] = [];
  placeholder: string = "Presione aquí";
  aperturoCajon: boolean = false;

  confirmarValor(){
    this.denominacionBilleteConfirmado.valorImputRecibido = this.inputRecibido;
    this.total.emit([this.denominacionBilleteConfirmado]);
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
    console.log(this.IDFormaPagoEfectivo);
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
    if(!this.aperturoCajon){
      this.aperturarCajon();
    }

    const rowsInputBilletes = this.getRowsInputBillete();
    const currentIndexInput = this.focusNextInput(rowsInputBilletes);

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

  getRowsInputBillete(){
    const table = document.getElementById('tabla');
    const rows = table?.getElementsByTagName('tr');
    const rowsInputs: HTMLInputElement[] = [];
     
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
    return rowsInputs;
  }

  direccion(flecha: string) {
    const rowsInputs = this.getRowsInputBillete();
    let currentIndexFocus = this.focusNextInput(rowsInputs);
    currentIndexFocus = (flecha == 'adelante') ? currentIndexFocus+1 : currentIndexFocus-1;
    console.log(currentIndexFocus);
    rowsInputs[currentIndexFocus].focus();
    let IDenominacionBillete = rowsInputs[currentIndexFocus].closest('tr')!.id;
    this.teclado(rowsInputs[currentIndexFocus].id.toString(), IDenominacionBillete);
  }

  focusNextInput(rowsInputs: HTMLInputElement[]) {
    let focusCurrentIndex = 0;
    for (let i = 1; i < rowsInputs.length; i++) {
      let tr = rowsInputs[i].closest('tr');
      if(tr!.style.backgroundColor == 'ghostwhite'){
        focusCurrentIndex = i;
        if(rowsInputs[i].value == ''){
          rowsInputs[i].placeholder = this.placeholder
        }
      }
    }
    return focusCurrentIndex;
  }

  ocultar(valor: any) {
    this.visible = valor;
  }

  async aperturarCajon(){
      let aperturaCajonResponse = await this.billetesServicio.aperturaCajon(environment.ip_estacion, this.IDFormaPagoEfectivo);
      if(!aperturaCajonResponse.error && aperturaCajonResponse.resolucion){
          this.aperturoCajon = true;
      }else{
        /*Swal.fire({
          customClass: {
            confirmButton: "text-white bg-blue-700 hover:bg-blue-800",

          },
          title: 'Error!',
          text: aperturaCajonResponse.mensaje,
          icon: 'error',
          confirmButtonText: 'OK',
          footer: '<p>Por favor comuniquese con Administración</p>'
        })*/
      }
  }

}


