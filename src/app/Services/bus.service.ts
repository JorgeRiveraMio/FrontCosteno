import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../settings/appsettings'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/ResponseApi'; 
import { Bus } from '../Interfaces/Bus'; 

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private apiUrl = appsettingsCliente.apiUrl + "/bus";

  constructor(private http: HttpClient) { }

  registrarBus(bus: Bus): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}/registrar`, bus);
  }

  listarBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.apiUrl}/listar`);
  }

  actualizarEstado(id: number): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.apiUrl}/actualizarEstado/${id}`, null);
  }
}
