import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Resolucion } from 'src/app/interfaces/home/home.interface';
import { HomeService } from 'src/app/services/home-service';
import { MenuPrincipalService } from 'src/app/services/menu-principal.service';
import { environment } from 'src/environments/environment.local'

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],

})
export class PrincipalComponent {
  mensaje: string = "";
  error: boolean = false;
  dataUser: Resolucion | [] = [];

  constructor(
    private validaUsuarioService: MenuPrincipalService, 
    private router: Router,
    private homeService: HomeService,
    private route: ActivatedRoute) 
  { }

  async ngOnInit(){
    try {
      //let result = await this.homeService.obtenerFondoAsignadoEstacion(environment.ip_estacion)
      //this.dataUser = result.resolucion;*/
      this.homeService.obtenerFondoAsignadoEstacion2(environment.ip_estacion)
        .subscribe(result => {
          this.dataUser = result.resolucion
      });
      this.dataUser = this.homeService.cacheStore;
      console.log(this.dataUser);

      const parametro = this.route.snapshot.queryParamMap.get('user') ? this.route.snapshot.queryParamMap.get('user') : localStorage.getItem('user');
      localStorage.setItem('user', parametro!);
     // this.ordenarArray('Billete_Denominacion_btd_Tipo');
    } catch (error) {
      console.log(error)
    }
  }


  async validaUsuario(ruta:string) {
    try {
      let mesasEnUso = await this.validaUsuarioService.validaMesasEnUso('10.104.19.201')
      this.mensaje = mesasEnUso.mensaje;
      this.error = mesasEnUso.error;
      if (this.error) return;
    } catch (error) {
      console.log(error)
    }
    try {
      let mesasEnUso = await this.validaUsuarioService.validaCuentasAbiertas('10.104.19.201')
      this.mensaje = mesasEnUso.mensaje;
      this.error = mesasEnUso.error;
      if (this.error) return;
    } catch (error) {
      console.log(error)
    }
    try {
      let mesasEnUso = await this.validaUsuarioService.validaPedidosPendinetesApp('10.104.19.201')
      this.mensaje = mesasEnUso.mensaje;
      this.error = mesasEnUso.error;
      if (this.error) return;
    } catch (error) {
      console.log(error)
    }
    try {
      let mesasEnUso = await this.validaUsuarioService.validaPedidosPendinetesRestaurante('10.104.19.201')
      this.mensaje = mesasEnUso.mensaje;
      this.error = mesasEnUso.error.length > 0 ? true : false;
      if (this.error) return;
    } catch (error) {
      console.log(error)
    }
    this.router.navigate([ruta]);
  }

  cerrarModal() {
    this.error = false;
  }
}
