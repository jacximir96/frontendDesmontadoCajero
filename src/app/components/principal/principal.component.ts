import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuPrincipalService } from 'src/app/services/menu-principal.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],

})
export class PrincipalComponent {
  mensaje: string = "";
  error: boolean = false;
  constructor(private validaUsuarioService: MenuPrincipalService, private router: Router) { }


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
