import { Component } from '@angular/core';
import { Procesos } from 'src/app/core/interfaces/shared';

@Component({
  selector: 'app-arqueo-caja',
  templateUrl: './arqueo-caja.component.html',
  styleUrls: ['./arqueo-caja.component.scss']
})
export class ArqueoCajaComponent {
  proceso: string = Procesos.arqueo;
}
