import { Component } from '@angular/core';
import { FormasPagoService } from 'src/app/services/formas-pago.service';

@Component({
  selector: 'app-agregar-forma-pago',
  templateUrl: './agregar-forma-pago.component.html',
  styleUrls: ['./agregar-forma-pago.component.scss']
})
export class AgregarFormaPagoComponent {
  visible:string = 'none';
  teclado:boolean = false;
  sinTeclado:boolean = true;
  cargando = true;
  formaSeleccionada = '';
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
  message:string = "Seleccionar la agrupación de la forma de pago";
  ruta:string = "";
  imagenes:any[]=[
    {image: '../../../assets/images/Rectangle 290.svg',forma:'EFECTIVO'},
    {image: '../../../assets/images/creditos.png',forma:'Creditos'},
    {image: '../../../assets/images/otros.png',forma:'Otras'},
    {image: '../../../assets/images/tarjetas.png',forma:'Tarjetas'}
        ];
  array:any[]=[];
  arrayAgregadores:any[]=[]
  constructor(private formasPagoService: FormasPagoService){}
  ngOnInit(){
    this.formasPago();
  }
   ocultarTarjetas(dato:any){
  this.message = "Formas de pago agrupadas: Tarjetas "+dato;
  this.array.forEach(element => {
    if(element.title == dato)
    { 
    element.rule = "none";
    element.estado = false
    } else {
      element.estado = false;
      element.rule="none"; 
    }
  });
   this.hide = "calc(100vh - 335px";
   this.totales = false;
   this.formasPagoCategoria(dato);
   this.formaSeleccionada = dato;
   }
  
   inicio (){
    this.teclado = false;
    this.sinTeclado = true;
    this.visible = 'none';
    this.totales = true;
    this.hide = "457px";
    this.validaMonto = false;
    this.array.forEach(element => {
      element.estado =  true;
      element.rule = "block";
    });
   
   }
   seleccionarFormaPago(title:string){
    this.validaMonto = true;
    this.teclado = true;
    this.sinTeclado = false;

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

   async formasPago(){
    try {
      let formasPago = await this.formasPagoService.agruparFormasPago('127.0.0.1')
      this.array = Object.keys(formasPago.resolucion).map(key => {
        return { name: key, items: formasPago.resolucion[key] };
      });
      this.array.sort((a, b) => a.name.localeCompare(b.name));
      this.cargando = false;
    } catch (error) {
    }
   }
  urlImagenes(name:string){
    this.ruta = "";
    this.imagenes.forEach(item => {
      if(item.forma == name)
        this.ruta = item.image;
    })
    return this.ruta;
  }
  formasPagoCategoria(categoria:string)
  {
    this.visible = 'block';
    this.array.forEach(item =>{
      if(item.name == categoria){
        this.arrayAgregadores = item.items
      }
    })
  }
}
