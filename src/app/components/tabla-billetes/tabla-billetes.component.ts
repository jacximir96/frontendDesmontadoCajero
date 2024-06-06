import { Component, Input } from '@angular/core';
import { BilletesService } from 'src/app/services/billetes.service';

@Component({
  selector: 'app-tabla-billetes',
  templateUrl: './tabla-billetes.component.html',
  styleUrls: ['./tabla-billetes.component.scss']
})
export class TablaBilletesComponent   {

  constructor(){}
 @Input() arrayLista!:any[];
  array:any[] =[];
  visible:boolean = false;
  inputRecibido!: string;
  denominacion! : string;

  recibirMensaje(valor: any) {
    this.inputRecibido = valor[0];
    this.cambiarValor(valor[1]);
  }
  cambiarValor(id:string){
      const inputElement = document.getElementById(id) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = this.inputRecibido;
      }
    
  }
   ngOnInit() {
   this.array = this.arrayLista;
    // try {
    //   let billetes = await this.billetesServicio.obtenerDenominaciones('10.104.19.201')
    //   this.array = billetes.resolucion;
    //   this.ordenarArray('Billete_Denominacion_btd_Tipo');
    // } catch (error) {
    //   console.log(error)
    // }
  }

  urlBilletesMonedas(tipo:string){
    return tipo.trim() == 'BILLETE' ? '../../../assets/images/billetes-nuevo.png': '../../../assets/images/monedas-nuevo.png'
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
  teclado(denominacion:string,id:string){
    this.visible = true;
    this.denominacion = denominacion;
  this.arrayLista.forEach(res =>{
    this.fondoFila(res.Billete_Denominacion_IDBilleteDenominacion,'white');
  })
     this.fondoFila(id,"ghostwhite"); 
  }
   fondoFila(id:string,color:string){
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement) {
      inputElement.style.backgroundColor = color;
    }
   }
  placeholder(valor:any){
    return valor == 0 ? 'Presione aquí':valor
  }
}


