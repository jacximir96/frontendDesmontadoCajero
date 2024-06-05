import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BilletesService } from 'src/app/services/billetes.service';

@Component({
  selector: 'app-tarjeta-forma-pago',
  templateUrl: './tarjeta-forma-pago.component.html',
  styleUrls: ['./tarjeta-forma-pago.component.scss']
})
export class TarjetaFormaPagoComponent {
efectivo:boolean = false;
hide:string = "457px";
color:string = "white";
totales:boolean = true;
validaMonto:boolean = false;
confirmar:boolean = false;
validaMontoTarjeta:[{title:string,validado:boolean}] = [{title:'',validado:false}];
validaMontoWidth:string = "478px";
inicialHeigth:string = (innerHeight - 310)+'px' ; 
rule:string = "block"
array:any[]=[
  {
    title:'Efectivo',
    image: 'Rectangle 290.svg',
    transacciones: '4',
    posCalculado: '$449.02',
    valorDeclarado: '$0.00',
    diferencia: '-$449.02',
    ingresos:'$0.00',
    egresos:'$0.00',
    retirado:'$0.00',
    estado:true,
    rule:"block"
  },
  {
    title:'Tarjetas Datafast',
    image: 'tarjetas.png',
    transacciones: '4',
    posCalculado: '$449.02',
    valorDeclarado: '$0.00',
    diferencia: '-$449.02',
    ingresos:'$0.00',
    egresos:'$0.00',
    retirado:'$0.00',
    estado:true,
    rule:"block"

  },
  {
    title:'Tarjetas Pinpad',
    image: 'tarjetas.png',
    transacciones: '4',
    posCalculado: '$449.02',
    valorDeclarado: '$0.00',
    diferencia: '-$449.02',
    ingresos:'$0.00',
    egresos:'$0.00',
    retirado:'$0.00',
    estado:true,
    rule:"block"
    
  },
  {
    title:'Agregadores',
    image: 'agregador.png',
    transacciones: '4',
    posCalculado: '$449.02',
    valorDeclarado: '$0.00',
    diferencia: '-$449.02',
    ingresos:'$0.00',
    egresos:'$0.00',
    retirado:'$0.00',
    estado:true,
    rule:"block"
  },
  {
    title:'Créditos',
    image: 'creditos.png',
    transacciones: '4',
    posCalculado: '$449.02',
    valorDeclarado: '$0.00',
    diferencia: '-$449.02',
    ingresos:'$0.00',
    egresos:'$0.00',
    retirado:'$0.00',
    estado:true,
    rule:"block"
  },
  {
    title:'Otros',
    image: 'otros.png',
    transacciones: '4',
    posCalculado: '$449.02',
    valorDeclarado: '$0.00',
    diferencia: '-$449.02',
    ingresos:'$0.00',
    egresos:'$0.00',
    retirado:'$0.00',
    estado:true,
    rule:"block"
  }
];
arrayAgregadores:any[]=[
  {
    title:'Uber',
    image: 'uber.png',
    transacciones: '4',
    posCalculado: '$449.02',
    valorDeclarado: '$0.00',
    diferencia: '-$449.02',
    ingresos:'$0.00',
    egresos:'$0.00',
    retirado:'$0.00',
    estado:true,
    validado:false,
    color:"white"
  },
  {
    title:'Pedidos ya',
    image: 'pedidosya.png',
    transacciones: '4',
    posCalculado: '$449.02',
    valorDeclarado: '$0.00',
    diferencia: '-$449.02',
    ingresos:'$0.00',
    egresos:'$0.00',
    retirado:'$0.00',
    estado:true,
    validado:false,
    seleccionado:false,
    color:"white"
  },
  
]
arrayBilletes:any[] = [];
constructor(private billetesServicio : BilletesService){}
  async ngOnInit() {
  try {
    let billetes = await this.billetesServicio.obtenerDenominaciones('10.104.19.201')
    this.arrayBilletes = billetes.resolucion;
    this.ordenarArray('Billete_Denominacion_btd_Tipo');
  } catch (error) {
    console.log(error)
  }
}
ordenarArray(field: string) {
  this.arrayBilletes.sort((a, b) => {
    if (a[field] < b[field]) {
      return -1;
    } else if (a[field] > b[field]) {
      return 1;
    } else {
      return 0;
    }
  });
}


 ocultarTarjetas(dato:any){
this.array.forEach(element => {
  if(element.title == dato)
  { if(element.title=='Efectivo')
    this.efectivo = true;
  element.rule = "block";
  element.estado = true
  } else {
    element.estado = false;
    element.rule="none"; 
  }
});
 this.hide = "calc(100vh - 335px";
 this.totales = false;
 }

 inicio (){
  this.efectivo = false;
  this.totales = true;
  this.hide = "457px";
  this.validaMonto = false;
  this.array.forEach(element => {
    console.log(element.title);
    element.estado =  true;
    element.rule = "block";
  });
  this.arrayAgregadores.forEach(element => {
    console.log(element.title);
    element.color =  'white';

  });
 }
 seleccionarFormaPago(title:string){
  
  this.validaMonto = true;
  this.arrayAgregadores.forEach(element => {
  if(element.title == title)  
  {  this.validaMontoTarjeta[0].title = element.title;
    this.validaMontoTarjeta[0].validado = element.validado;
    this.validaMontoWidth = element.validado ? '249px': '301px';
    element.color = "rgb(217, 237, 255,30%)";
  }
  else{
    element.color = "white";
  }
  
  });
 }
 confirmarMonto(title:string){
  this.confirmar = true;
  this.validaMonto = false;
  this.arrayAgregadores.forEach(element => {
    if(element.title == title)
     {  element.validado =  true;
       element.color = "white";
       }
  });
 }
 cerrarValidaMonto(){
  this.validaMonto = false;
  this.arrayAgregadores.forEach(element => {
       element.color = "white";
       
  });
 }
 confirmarButton(){
  this.arrayAgregadores.forEach(element => {
    element.estado = false;
    
});
this.array.forEach(element => {
  element.estado = true;
  
});
this.totales = true;
}

}
