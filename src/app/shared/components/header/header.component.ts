import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { InfoCajero } from 'src/app/interfaces/home/home.interface';
import { HeaderService } from 'src/app/core/services/header.service';
import { environment } from 'src/environments/environment.local';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit{
  @Input() title!:string;
  user: String = '';

  constructor(
    private headerService: HeaderService) 
  { }

  async ngOnInit() {
    try {
      let result = await this.headerService.obtenerFondoAsignadoEstacion(environment.ip_estacion)
      this.user = result.resolucion.descripcionUsuarioEstacion;
      this.user = localStorage.getItem('user')!
    } catch (error) {
      console.log(error)
    }
  }

}
