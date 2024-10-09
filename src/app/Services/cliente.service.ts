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

  enviarCodigo(cliente: Cliente): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}/enviarCodigo`, cliente);
  }
  validarCodigo(email: string, codigo: string): Observable<any> {
   
    const body = { email, codigo };  // Construimos el objeto JSON con los datos
    return this.http.post<ResponseApi>(`${this.apiUrl}/validarCodigo`, body);
  }
  
  actualizarCliente(id:number, cliente: Cliente): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.apiUrl}/${id}`, cliente);
  }
  
  actualizarContrasena(password:string,correo:string): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.apiUrl}/cambiarContrasena`, {password,correo});
  }
}
