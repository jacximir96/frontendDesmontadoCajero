import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DenominacionBilleteResponse } from '../interfaces/arqueo-caja/denominacion-billete-response.interface';
import { routes } from '../config/routes.enum';
import { environment } from 'src/environments/environment.local';
import { RequestComprometerDinero } from '../interfaces/request/comprometer-dinero.interface';
import { RequestCancelarProceso } from '../interfaces/request/cancelar-proceso.interface';

@Injectable({
  providedIn: 'root'
})
export class RetiroService {

  constructor(private http:HttpClient) { }

  getObtenerBilletesComprometidos():Promise<DenominacionBilleteResponse>{
    return new Promise<DenominacionBilleteResponse>((resolve, reject) => {
      this.http.post<DenominacionBilleteResponse>(
        environment.apiural + routes.POST_RDE_BILLETES_COMPROMETIDOS,
        {
          "ipEstacion": environment.ip_estacion
        }
      )
      .subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error)
      })
    })
  }

  comprometerDineroRetiros(request: RequestComprometerDinero) {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(
        environment.apiural + routes.POST_RDE_COMPROMETER_DINERO_RETIRO,
        request
      )
      .subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error)
      })
    })
  }

  cancelarDineroRetiros(request: RequestCancelarProceso){
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(
        environment.apiural + routes.POST_RDE_CANCELAR_RETIRO,
        request
      )
      .subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error)
      })
    })
  }
}
