import { inject, Injectable } from '@angular/core';
import { appsettingsDni } from '../settings/appsettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
// export class DniService {
//   private apiUrlDni =appsettingsDni.apiUrl;
//   private apiUrlDniKey= appsettingsDni.apiKey;
//   private http= inject(HttpClient)
//   constructor() { }
//   consultarDni(dni:string): Observable<any> {

//     const headers =new HttpHeaders({
//       'Authorization':`Bearer ${this.apiUrlDniKey}`,
//       'Content-Type':'application/json'
//     });

//     return this.http.get(`${this.apiUrlDni}/${dni}`,{headers});

//   }
// }

export class DniService {
  private baseUrl = 'http://localhost:8080/consultar-dni';

  constructor(private http: HttpClient) { }

  consultarDni(dni: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?dni=${dni}`);
  }
  
}