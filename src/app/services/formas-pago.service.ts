import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { routes } from '../config/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class FormasPagoService {


  constructor ( private http:HttpClient) { }
   
  agruparFormasPago(ip:string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiural + routes.POST_AGRUPAR_FORMAS_PAGO,{"ipEstacion":ip})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }


}
