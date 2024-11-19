import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { Pasajero, PasajeroDTO } from '../Interfaces/Pasajero';
import { ResponseApi } from '../Interfaces/ResponseApi';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PasajeroService {

  private apiUrl = appsettingsCliente.apiUrl + "/pasajero";
  
  constructor(private http: HttpClient) { }

  

  listarPasajero(): Observable<Pasajero[]> {
    return this.http.get<Pasajero[]>(`${this.apiUrl}/listar`);
  }

  buscarPasajero(id: number): Observable<Pasajero> {
    return this.http.get<Pasajero>(`${this.apiUrl}/buscar/${id}`);
  }

  registrarPasajero(pasajeroDTO: PasajeroDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}/registrar`, pasajeroDTO);
  }
}
