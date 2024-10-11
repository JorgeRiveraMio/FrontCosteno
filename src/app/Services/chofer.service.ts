import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../settings/appsettings'; // Ajusta la ruta según tu estructura de carpetas
import { HttpClient } from '@angular/common/http';
import { Chofer } from '../Interfaces/Chofer'; // Asegúrate de que esta ruta sea correcta
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/ResponseApi'; // Asegúrate de que esta ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ChoferService {

  private apiUrl = appsettingsCliente.apiUrl + "/chofer"; // URL base para el servicio de choferes

  constructor(private http: HttpClient) { }

  registrarChofer(chofer: Chofer): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}/registrar`, chofer);
  }

  listarChoferes(): Observable<Chofer[]> {
    return this.http.get<Chofer[]>(`${this.apiUrl}/listar`);
  }

  actualizarChofer(id: number, chofer: Chofer): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.apiUrl}/${id}`, chofer);
  }

  buscarChofer(id: number): Observable<Chofer> {
    return this.http.get<Chofer>(`${this.apiUrl}/buscar/${id}`);
  }

  cambiarEstadoChofer(id: number, nuevoEstado: boolean): Observable<any> {
    return this.http.put(`/chofer/cambiar-estado/${id}/${nuevoEstado}`, {});
}
}