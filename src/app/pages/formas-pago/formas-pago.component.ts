import { Component } from '@angular/core';

@Component({
  selector: 'app-formas-pago',
  templateUrl: './formas-pago.component.html',
  styleUrls: ['./formas-pago.component.scss'],
})
export class FormasPagoComponent {
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
      estado:true
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
      estado:true
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
      estado:true
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
      estado:true
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
      estado:true
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
      estado:true
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
      estado:true
    },
  ]
}
