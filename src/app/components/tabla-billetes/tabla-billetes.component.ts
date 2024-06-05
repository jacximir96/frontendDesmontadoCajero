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
   ngOnInit() {
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
  teclado(){
    this.visible = true
  }
}


