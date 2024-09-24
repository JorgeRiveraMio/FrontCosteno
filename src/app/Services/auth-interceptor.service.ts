import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
 
   
    const token = localStorage.getItem('token'); // Aquí estás llamando a getToken()


    // Verifica que el token no sea null
    console.log('Token recuperado en el interceptor:', token); // Verifica que este no sea null
    // console.log('Token recuperado en el interceptor con session:',sessionStorage.getItem('token'));
    if (token) {
      authReq = authReq.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(authReq);
  }
  

}
  export const authInterceptorProviders = [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ];