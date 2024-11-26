import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../settings/appsettings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Viaje, ViajeDTO } from '../Interfaces/Viaje';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  private apiUrl = appsettingsCliente.apiUrl + "/viaje";

  constructor(private http: HttpClient) { }

  registrarViaje(viaje: ViajeDTO):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.apiUrl}/registrar`, viaje);
  }
  listarViajes(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`${this.apiUrl}/listar`);
  }
  actualizarViaje(id:number, viaje:ViajeDTO): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.apiUrl}/${id}`, viaje);
  }
  actualizarEstado(id:number): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.apiUrl}/actualizarEstado/${id}`,null);
  }
  buscarViajes(fechaSalida: Date, fechaLlegada: Date, idRuta: number): Observable<Viaje[]> {
    const params = new HttpParams()
      .set('fechaSalida', fechaSalida.toISOString().split('T')[0]) // Formatear como 'YYYY-MM-DD'
      .set('fechaLlegada', fechaLlegada.toISOString().split('T')[0]) // Formatear como 'YYYY-MM-DD'
      .set('idRuta', idRuta.toString()); // Convertir a string

    //return this.http.get<Viaje[]>(`${this.apiUrl}/buscar`, { params });
    return this.http.get<Viaje[]>(`${this.apiUrl}/buscarProximos`, { params });
  }
  buscarPorID(cod: number): Observable<Viaje> {
    return this.http.get<Viaje>(`${this.apiUrl}/buscar/${cod}`);
  }

  

}