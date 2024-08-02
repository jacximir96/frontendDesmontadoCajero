import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { routes } from '../config/routes.enum';
import { CalcularTotalVentasEstacion } from '../../interfaces/arqueo-caja/arqueo-caja.interface';
import { DenominacionBilleteResponse } from '../interfaces/shared/response/denominacion-billete-response.interface';
import { AperturaCajaResponse } from '../../interfaces/arqueo-caja/apertura-caja-response.interface';
import { ResponseDataFast } from '../../interfaces/transacciones-datafast.interface';

@Injectable({
  providedIn: 'root'
})

export class BilletesService {

 constructor ( private http:HttpClient) { }
   
  obtenerDenominaciones():Promise<DenominacionBilleteResponse>{
    let ip = environment.ip_estacion;
    return new Promise<DenominacionBilleteResponse>((resolve, reject) => {
      this.http.post<DenominacionBilleteResponse>(environment.apiural + routes.POST_OBTENER_DENOMINACION_BILLETES,{"ipEstacion":ip,"proceso":"retiro"})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }

  obtenerTransaccionesEstacion(ip:string):Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(environment.apiural + routes.POST_ADE_CONSOLIDAR_TRANSACCIONES_ESTACION, {"ipEstacion": environment.ip_estacion})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }

  obtenerTransaccionesDataFast(ip:string):Promise<ResponseDataFast>{
    return new Promise<ResponseDataFast>((resolve, reject) => {
      this.http.post<ResponseDataFast>(environment.apiural + routes.POST_ADE_CONSOLIDAR_TRANSACCIONES_DATAFAST,{"ipEstacion":ip})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }

  obtenerTotales(ip:string):Promise<CalcularTotalVentasEstacion>{
    return new Promise<CalcularTotalVentasEstacion>((resolve, reject) => {
      this.http.post<CalcularTotalVentasEstacion>(environment.apiural + routes.POST_CALCULAR_VENTAS_ESTACION, {'ipEstacion': ip})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }

  aperturaCajon(ip: string, idFormaPago: string):Promise<AperturaCajaResponse>{
    return new Promise<AperturaCajaResponse>((resolve, reject) => {
      this.http.post<AperturaCajaResponse>(
        environment.apiural + routes.POS_APERTURAR_CAJON,
        {
          "ipEstacion":ip,
          "idFormaPago":idFormaPago
        }
      ).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error)
      });
    });
  }
}
