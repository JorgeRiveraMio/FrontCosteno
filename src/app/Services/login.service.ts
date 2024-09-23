import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = appsettingsCliente.apiUrl ;

  constructor(private http: HttpClient) { }

  login (correo:string,password:string): Observable<any>{
    const body ={correo,password}
    return this.http.post(`${this.apiUrl}/ingresar`,body);
  }

}
