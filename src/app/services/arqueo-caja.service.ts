import { ConvertBilletes, RequestComprometerBillete } from './../interfaces/request/comprometer-billetes.interface';
import { Injectable } from '@angular/core';
import { ACEImprimirArqueo } from '../interfaces/arqueo-caja/imprime-arqueo.interface';
import { environment } from 'src/environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { routes } from '../config/routes.enum';
import { DenominacionBilleteResponse } from '../interfaces/arqueo-caja/denominacion-billete-response.interface';
import { RequestComprometerDinero } from '../interfaces/request/comprometer-dinero.interface';
import { RequestCancelarProceso } from '../interfaces/request/cancelar-proceso.interface';
import { ResponseGeneral } from '../interfaces/shared/response-general.interface';
import { RequestGeneralConPerfilAdmin } from '../interfaces/request/general-con-perfiladmin.interface';

@Injectable({
  providedIn: 'root'
})
export class ArqueoService {

  constructor(private http:HttpClient) { }

  imprimirArqueo(request: RequestGeneralConPerfilAdmin):Promise<ResponseGeneral>{
    return new Promise<ResponseGeneral>((resolve, reject) => {
      this.http.post<ResponseGeneral>(
        environment.apiural + routes.POST_ADE_IMPRIMIR_ARQUEO,
        request
      )
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }

  getObtenerBilletesComprometidos():Promise<DenominacionBilleteResponse>{
    return new Promise<DenominacionBilleteResponse>((resolve, reject) => {
      this.http.post<DenominacionBilleteResponse>(
        environment.apiural + routes.POS_ADE_BILLETES_COMPROMETIDOS,
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

  comprometerBillete(request: RequestComprometerBillete ):Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(
        environment.apiural + routes.POS_ADE_COMPROMETER_BILLETES,
        request
      )
      .subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error)
      })
    })
  }

  comprometerDineroArqueo(request: RequestComprometerDinero) {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(
        environment.apiural + routes.POS_ADE_COMPROMETER_DINERO_ARQUEO,
        request
      )
      .subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error)
      })
    })
  }

  cancelarDineroArqueo(request: RequestCancelarProceso){
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(
        environment.apiural + routes.POST_ADE_CANCELAR_ARQUEO,
        request
      )
      .subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error)
      })
    })
  }
}
