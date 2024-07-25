import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseTranseferenciaVentas } from '../../interfaces/transferencia-ventas/response/valida-transferencia.interface';
import { environment } from 'src/environments/environment.local';
import { routes } from '../config/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  constructor(private http:HttpClient) { }
  
  aplicaTransferencia(request: ResponseTranseferenciaVentas):Promise<ResponseTranseferenciaVentas>{
    return new Promise<ResponseTranseferenciaVentas>((resolve, reject) => {
      this.http.get<ResponseTranseferenciaVentas>(
        environment.apiural + routes.POST_VALIDA_TRANSFERENCIA_VENTAS,
      )
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }
  
}
