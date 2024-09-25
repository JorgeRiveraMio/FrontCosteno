import {  Injectable } from '@angular/core';
import { appsettingsDni } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})


export class DniService {
  
  private apiUrlDni =appsettingsDni.apiUrl;
  constructor(private http: HttpClient) { }

  consultarDni(dni: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlDni}?dni=${dni}`);
  }
  
}