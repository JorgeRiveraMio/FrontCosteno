import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private apiUrl = appsettingsCliente.apiUrl + "/mercadoPago";

  constructor(private http: HttpClient) {
  }

  crearPreferencia(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-preferencia`, data);
  }
}
