import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DenominacionBilleteResponse } from '../interfaces/shared/response/denominacion-billete-response.interface';
import { routes } from '../config/routes.enum';
import { environment } from 'src/environments/environment.local';
import { RequestComprometerDinero } from '../interfaces/shared/request/comprometer-dinero.interface';
import { RequestCancelarProceso } from '../interfaces/shared/request/cancelar-proceso.interface';
import { RequestGeneralConPerfilAdmin } from '../interfaces/shared/request/general-con-perfiladmin.interface';
import { RequestConsolidarCompromisoBillete } from '../../interfaces/retiros/request/consolidar-compromisos-billetes.interface';
import { RequestComprometerBillete } from '../interfaces/shared/request/comprometer-billetes.interface';
import { ResponseGeneral } from '../interfaces/shared';

@Injectable({
  providedIn: 'root'
})
export class RetiroService {

  constructor(private http:HttpClient) { }

  imprimirRetiros(request: RequestGeneralConPerfilAdmin):Promise<ResponseGeneral>{
    return new Promise<ResponseGeneral>((resolve, reject) => {
      this.http.post<ResponseGeneral>(
        environment.apiural + routes.POST_RDE_IMPRIMIR_RETIRO,
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

  consolidarCompromisoBilletes(request: RequestConsolidarCompromisoBillete) {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(
        environment.apiural + routes.POST_RDE_CONSOLIDAR_COMPROMISO_BILLETES_MONEDAS,
        request
      )
      .subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error)
      })
    })
  }

  comprometerBilletesRetiros(request: RequestComprometerBillete ):Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(
        environment.apiural + routes.POST_RDE_COMPROMETER_BILLETES,
        request
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

  retiroDineroEstacion(request: RequestGeneralConPerfilAdmin) {
    return new Promise<ResponseGeneral>((resolve, reject) => {
      this.http.post<ResponseGeneral>(
        environment.apiural + routes.POST_RDE_RETIRAR_DINERO,
        request
      )
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
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
