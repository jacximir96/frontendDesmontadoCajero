import { Component } from '@angular/core';
import { Procesos } from 'src/app/core/interfaces/shared';

@Component({
  selector: 'app-desmontado',
  templateUrl: './desmontado.component.html',
  styleUrls: ['./desmontado.component.scss']
})
export class DesmontadoComponent {
  proceso: string = Procesos.desmontado
}
