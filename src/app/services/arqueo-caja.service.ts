import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { routes } from '../config/routes.enum';
import { RequestComprometerBillete } from '../interfaces/shared/request/comprometer-billetes.interface';
import { DenominacionBilleteResponse } from '../interfaces/shared/response/denominacion-billete-response.interface';
import { RequestComprometerDinero } from '../interfaces/shared/request/comprometer-dinero.interface';
import { RequestCancelarProceso } from '../interfaces/shared/request/cancelar-proceso.interface';
import { RequestGeneralConPerfilAdmin } from '../interfaces/shared/request/general-con-perfiladmin.interface';
import { RequestConsolidarCompromisoBillete } from '../interfaces/arqueo-caja/request/consolidar-compromisos-billetes.interface';
import { ResponseGeneral } from '../interfaces/shared';

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

  arquearDineroEstacion(request: RequestGeneralConPerfilAdmin) {
    return new Promise<ResponseGeneral>((resolve, reject) => {
      this.http.post<ResponseGeneral>(
        environment.apiural + routes.POST_ADE_ARQUEAR_DINERO,
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

  /*getObtenerBilletesComprometidos(): Observable<DenominacionBilleteResponse | null> {
    return this.http.post<DenominacionBilleteResponse | null>(environment.apiural + routes.POS_ADE_BILLETES_COMPROMETIDOS,
      {"ipEstacion": environment.ip_estacion})
    .pipe(
      catchError( () => of(null) )
    );
  }*/

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

  consolidarCompromisoBilletes(request: RequestConsolidarCompromisoBillete) {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(
        environment.apiural + routes.POST_ADER_CONSOLIDAR_COMPROMISO_BILLETES_MONEDAS,
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
