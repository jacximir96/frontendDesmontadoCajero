import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DenominacionesBilletes, DenominacionBilleteConfirmado} from 'src/app/interfaces/shared';
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
  valueInputActual: string = '';
  denominacion!: string;
  tipoDenominacion!: string;
  imagenMonedaBillete: string = '';
  IDDedominacionBillete!: string;
  denominacionBilleteConfirmado: DenominacionBilleteConfirmado = {};
  arrayIds: any[] = [];
  placeholder: string = "Presione aquí";
  aperturoCajon: boolean = false;

  denominacionBilleteActual!: DenominacionesBilletes;

  @ViewChild('tablaBilletes') tablaBilletes: ElementRef | undefined;

  confirmarValor(){
    this.denominacionBilleteConfirmado.valorImputRecibido = this.inputRecibido;
    this.total.emit([this.denominacionBilleteConfirmado]);
  }

  recibirMensaje(valor: any) {
    this.inputRecibido = valor[0];
    this.cambiarValor(valor[1]);
  }
  cambiarValor(id: string) {
    const inputElement = document.getElementById(`${id}-${this.tipoDenominacion.trim()}`) as HTMLInputElement;
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

  teclado(denominacion: string, id: string, tipoDenominacion: string) {
    console.log(`${denominacion.toString()}-${tipoDenominacion}`);
    this.redimensionar()
    if(!this.aperturoCajon){
      //this.aperturarCajon();
    }

    const input = document.getElementById(`${denominacion.toString()}-${tipoDenominacion.trim()}`) as HTMLInputElement;
    console.log(input)
    if (input) {
      console.log(input.value);
      input.placeholder = '';
      this.valueInputActual = (input.value) ? input.value : '';
    }

    this.arrayDenominacionesBilletes.forEach(billete => {
      if(billete.Billete_Denominacion_IDBilleteDenominacion == id){
        this.denominacionBilleteActual = billete
      }
    })

    const rowsInputBilletes = this.getRowsInputBillete();
    const currentIndexInput = this.focusNextInput(rowsInputBilletes);
    console.log(currentIndexInput);
    this.visible = true;
    this.denominacion = denominacion.toString();
    this.tipoDenominacion = tipoDenominacion;
    this.imagenMonedaBillete = this.tipoDenominacion.trim() == 'BILLETE' ? 'billetes-nuevo.png' : 'monedas-nuevo.png';
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
    let IDenominacionBillete = rowsInputs[currentIndexFocus].closest('tr')!.id;
    //Enviar mensaje cuando el input tiene valor y fue movido por las flechas
    if(rowsInputs[currentIndexFocus].value != ''){
      this.inputRecibido = rowsInputs[currentIndexFocus].value;
      this.denominacionBilleteConfirmado.Billete_Denominacion_btd_Valor = this.denominacion;
      this.denominacionBilleteConfirmado.Billete_Denominacion_IDBilleteDenominacion = IDenominacionBillete;
      this.confirmarValor();
    }
    //console.log(rowsInputs[currentIndexFocus].value);

    currentIndexFocus = (flecha == 'adelante') ? currentIndexFocus+1 : currentIndexFocus-1;
    rowsInputs[currentIndexFocus].focus();
    IDenominacionBillete = rowsInputs[currentIndexFocus].closest('tr')!.id;
    var arrayDeCadenas = rowsInputs[currentIndexFocus].id.toString().split('-');
    this.teclado(arrayDeCadenas[0], IDenominacionBillete, arrayDeCadenas[1]);
  }

  focusNextInput(rowsInputs: HTMLInputElement[]) {
    let focusCurrentIndex = 0;
    for (let i = 0; i < rowsInputs.length; i++) {
      let tr = rowsInputs[i].closest('tr');
      if(tr!.style.backgroundColor == 'ghostwhite'){
        focusCurrentIndex = i;
        console.log(rowsInputs[i].getAttribute('custom'))
        if(rowsInputs[i].getAttribute('custom') != null && rowsInputs[i].value == ''){
          rowsInputs[i].value = rowsInputs[i].getAttribute('custom')!;
        }
        else if(rowsInputs[i].value == ''){
          rowsInputs[i].placeholder = this.placeholder
        }
      }
    }
    return focusCurrentIndex;
  }

  redimensionar(ocultaTeclado = false){
    if (this.tablaBilletes) {
      const nativeElement: HTMLElement = this.tablaBilletes.nativeElement;
      if(ocultaTeclado){
        nativeElement.classList.remove('col-xl-7', 'col-lg-7', 'col-md-12', 'col-sm-12', 'col-12');
        nativeElement.classList.add('w-full','px-3');
      }else{
        nativeElement.classList.remove('w-full','px-3');
        nativeElement.classList.add('col-xl-7', 'col-lg-7', 'col-md-12', 'col-sm-12', 'col-12');
      }
      
    }
  }

  ocultar(valor: any) {
    this.visible = valor;
    this.redimensionar(true);
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


