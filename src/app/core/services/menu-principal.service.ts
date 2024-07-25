import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { routes } from '../config/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class MenuPrincipalService {
  
  constructor(
    private http:HttpClient
  ) { }
   
  validaMesasEnUso(ip:string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiural + routes.POST_SESION_VALIDA_MESAS_EN_USO,{"ipEstacion":ip})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }
  validaCuentasAbiertas(ip:string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiural + routes.POST_VALORAR_CONCLUSION_SESSION_CUENTAS_ABIERTAS,{"ipEstacion":ip})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }
  validaPedidosPendinetesApp(ip:string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiural + routes.POST_VALIDAR_EXISTENCIA_PEDIDOS_OENDIENTES_APP,{"ipEstacion":ip})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }
  validaPedidosPendinetesRestaurante(ip:string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiural + routes.POST_OBTENER_PEDIDOS_PENDIENTES_RESTAURANTE,{"ipEstacion":ip})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }
}
