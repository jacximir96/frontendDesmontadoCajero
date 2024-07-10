import { Injectable } from '@angular/core';
import { ACEImprimirArqueo } from '../interfaces/arqueo-caja/imprime-arqueo.interface';
import { environment } from 'src/environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { routes } from '../config/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class ArqueoService {

  constructor(private http:HttpClient) { }

  imprimirArqueo(ip:string):Promise<ACEImprimirArqueo>{
    return new Promise<ACEImprimirArqueo>((resolve, reject) => {
      this.http.get<ACEImprimirArqueo>(environment.apilocal + routes.POST_ACE_IMPRIMIR_ARQUEO)
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error)
        });
    });
  }

}
