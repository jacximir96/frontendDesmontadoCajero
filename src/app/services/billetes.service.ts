import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { routes } from '../config/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class BilletesService {

 constructor ( private http:HttpClient) { }
   
  obtenerDenominaciones(ip:string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiural + routes.POST_OBTENER_EFECTIVO_PROCESO,{"ipEstacion":ip,"proceso":"retiro"})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }
  obtenerFormasPago(ip:string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiural + routes.POST_CONSULTAR_RETIROS_ESTACION,{"ipEstacion":ip})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }
}
