import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { routes } from '../config/routes.enum';
import { CalcularTotalVentasEstacion } from '../interfaces/arqueo-caja/arqueo-caja.interface';
import { ConsolidarTransaccionesAgregadoresEstacion } from '../interfaces/transacciones-agregadores.interface';
import { ConsolidarTransaccionesEstacion } from '../interfaces/transacciones-estacion.interface';
import { DenominacionBilleteResponse } from '../interfaces/arqueo-caja/denominacion-billete-response.interface';

@Injectable({
  providedIn: 'root'
})
export class BilletesService {

 constructor ( private http:HttpClient) { }
   
  obtenerDenominaciones(ip:string):Promise<DenominacionBilleteResponse>{
    return new Promise<DenominacionBilleteResponse>((resolve, reject) => {
      this.http.post<DenominacionBilleteResponse>(environment.apiural + routes.POST_OBTENER_DENOMINACION_BILLETES,{"ipEstacion":ip,"proceso":"retiro"})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }
  obtenerFormasPago(ip:string):Promise<ConsolidarTransaccionesEstacion>{
    return new Promise<ConsolidarTransaccionesEstacion>((resolve, reject) => {
      this.http.get<ConsolidarTransaccionesEstacion>(environment.apilocal + routes.POST_CONSULTAR_RETIROS_ESTACION)
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }
  /*obtenerTransaccionesDataFast(ip:string):Promise<ConsolidarTransaccionesDatafastEstacion>{
    return new Promise<ConsolidarTransaccionesDatafastEstacion>((resolve, reject) => {
      this.http.post<ConsolidarTransaccionesDatafastEstacion>(environment.apiural + routes.POST_RDE_CONSOLIDAR_TRANSACCIONES_DATAFAST_ESTACION,{"ipEstacion":ip})
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }*/
  obtenerTransaccionesEstacion(ip:string):Promise<ConsolidarTransaccionesEstacion>{
    return new Promise<ConsolidarTransaccionesEstacion>((resolve, reject) => {
      this.http.get<ConsolidarTransaccionesEstacion>(environment.apilocal + routes.POST_RDE_CONSOLIDAR_TRANSACCIONES_ESTACION)
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }
  obtenerTotales(ip:string):Promise<CalcularTotalVentasEstacion>{
    return new Promise<CalcularTotalVentasEstacion>((resolve, reject) => {
      this.http.get<CalcularTotalVentasEstacion>(environment.apilocal + routes.POST_CALCULAR_VENTAS_ESTACION)
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }
  obtenerTransaccionesAgregadores(ip:string):Promise<ConsolidarTransaccionesAgregadoresEstacion>{
    return new Promise<ConsolidarTransaccionesAgregadoresEstacion>((resolve, reject) => {
      this.http.get<ConsolidarTransaccionesAgregadoresEstacion>(environment.apilocal + routes.POST_RDE_CONSOLIDAR_TRANSACCIONES_AGREGADORES_ESTACION)
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }
}
