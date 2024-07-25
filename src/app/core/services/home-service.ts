import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { routes } from '../config/routes.enum';
import { ObtenerFondoAsignadoUsuarioEstacion, InfoCajero } from '../../interfaces/home/home.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public cacheStore: InfoCajero = {
    magnitud: '',
    descripcionUsuarioEstacion: ''
  };

  constructor(
    private http:HttpClient) 
  { }

  obtenerOpcionesMenus(ip:string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiural + routes.GET_OBTENER_OPCIONES_MENUS,{"ipEstacion":ip})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }

  obtenerFondoAsignadoEstacion(ip:string):Promise<ObtenerFondoAsignadoUsuarioEstacion>{
    return new Promise<ObtenerFondoAsignadoUsuarioEstacion>((resolve, reject) => {
      this.http.post<ObtenerFondoAsignadoUsuarioEstacion>(environment.apiural + routes.POST_OBTENER_FONDO_ASIGNADO_ESTACION,{"ipEstacion":ip})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }

  obtenerFondoAsignadoEstacion2( ip: string ):Observable<ObtenerFondoAsignadoUsuarioEstacion>{
    const url =  environment.apiural + routes.POST_OBTENER_FONDO_ASIGNADO_ESTACION
    return this.http.post<ObtenerFondoAsignadoUsuarioEstacion>( url, {"ipEstacion":ip})
      .pipe(
        //tap( data: ObtenerFondoAsignadoUsuarioEstacion => this.cacheStore = data.resolucion?)
        tap( ( data ) => this.cacheStore = data.resolucion )
      );
  }
}
