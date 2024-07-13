import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObtenerCajaChicaResponse } from '../interfaces/caja-chica/obtener-valor.interface';
import { environment } from 'src/environments/environment.local';
import { routes } from '../config/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class CajaChicaService {

  constructor ( private http:HttpClient) { }

  obtenerValorCajaChica(ip:string):Promise<ObtenerCajaChicaResponse>{
    return new Promise<ObtenerCajaChicaResponse>((resolve, reject) => {
      this.http.get<ObtenerCajaChicaResponse>(environment.apilocal + routes.POS_OBTENER_VALOR_CAJA_CHICA)
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }
}
