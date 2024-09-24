import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = appsettingsCliente.apiUrl ;

  constructor(private http: HttpClient) { }

  // login (correo:string,password:string): Observable<any>{
  //   const body ={correo,password}
  //   return this.http.post(`${this.apiUrl}/ingresar`,body);
  // }

  login(correo: string, password: string): Observable<any> {
    const body = { correo, password };
    
    return this.http.post<any>(`${this.apiUrl}/ingresar`, body).pipe(
      tap((response) => {
        // Verifica que haya un token en la respuesta
        if (response.token) {
          // Almacena el token en sessionStorage
          sessionStorage.setItem('token', response.token);
          // Aquí puedes emitir el token a otros servicios si lo deseas
        }
      }),
      map((response) => response.token), // Mapea la respuesta para devolver solo el token
      catchError((error) => {
        console.error('Error durante el login', error);
        return throwError(error); // Lanza el error para que pueda ser manejado por el componente
      })
    );
  }
  
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }


  getToken(): string | null {
    return  localStorage.getItem('token') // o localStorage.getItem('token') si es necesario
  }

}
