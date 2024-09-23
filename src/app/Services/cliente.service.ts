import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../Interfaces/Cliente';
import { ResponseApi } from '../Interfaces/ResponseApi';
import { Observable } from 'rxjs';
import { appsettingsCliente } from '../settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = appsettingsCliente.apiUrl + "/cliente";

  constructor(private http: HttpClient) { }

  // registrar(cliente: Cliente): Observable<ResponseApi> {
  //   return this.http.post<ResponseApi>(`${this.apiUrl}/guardar`, cliente);
  // }

  enviarCodigo(cliente: Cliente): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}/enviarCodigo`, cliente);
  }
  validarCodigo(email: string, codigo: string): Observable<any> {
   
    const body = { email, codigo };  // Construimos el objeto JSON con los datos
    return this.http.post<ResponseApi>(`${this.apiUrl}/validarCodigo`, body);
  }
  
}
