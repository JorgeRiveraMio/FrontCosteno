import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { Ruta } from '../Interfaces/Ruta';
import { ResponseApi } from '../Interfaces/ResponseApi';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class RutaService {

  private apiUrl = appsettingsCliente.apiUrl + "/ruta";

  constructor(private http: HttpClient) { }
  registrarRuta(ruta:Ruta):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.apiUrl}/registrar`, ruta);
  }
  listarRutas(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(`${this.apiUrl}/listar`);
  }
  actualizarRuta(id:number, ruta:Ruta): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.apiUrl}/${id}`, ruta);
  }
  buscarRuta(id:number): Observable<Ruta>{
    return this.http.get<Ruta>(`${this.apiUrl}/buscar/${id}`);
  }
  actualizarEstado(id:number): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.apiUrl}/actualizarEstado/${id}`,null);
  }
}
