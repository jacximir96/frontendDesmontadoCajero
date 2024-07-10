import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { InfoCajero } from 'src/app/interfaces/home/home.interface';
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
  dataUser: InfoCajero | [] = [];

  constructor(
    private validaUsuarioService: MenuPrincipalService, 
    private router: Router,
    private homeService: HomeService,
    private route: ActivatedRoute) 
  { }

  async ngOnInit(){
    try {
      const parametro = this.route.snapshot.queryParamMap.get('user') ? this.route.snapshot.queryParamMap.get('user') : localStorage.getItem('user');
      localStorage.setItem('user', parametro!);
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
