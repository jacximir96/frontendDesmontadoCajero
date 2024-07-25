import { Injectable } from '@angular/core';
import { routes } from '../config/routes.enum';
import { HttpClient } from '@angular/common/http';
import { ObtenerFondoAsignadoUsuarioEstacion } from '../../interfaces/home/home.interface';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http:HttpClient) { }

  /*obtenerFondoAsignadoEstacion( ip: string ):Observable<ObtenerFondoAsignadoUsuarioEstacion>{
    const url =  environment.apiural + routes.POST_OBTENER_FONDO_ASIGNADO_ESTACION
    return this.http.post<ObtenerFondoAsignadoUsuarioEstacion>( url, {"ipEstacion":ip})
  }*/

  obtenerFondoAsignadoEstacion(ip:string):Promise<ObtenerFondoAsignadoUsuarioEstacion>{
    return new Promise<ObtenerFondoAsignadoUsuarioEstacion>((resolve, reject) => {
      this.http.post<ObtenerFondoAsignadoUsuarioEstacion>(environment.apiural + routes.POST_OBTENER_FONDO_ASIGNADO_ESTACION,{"ipEstacion":ip})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }
}
