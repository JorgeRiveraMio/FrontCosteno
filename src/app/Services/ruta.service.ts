import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../settings/appsettings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ruta, RutaDTO } from '../Interfaces/Ruta';
import { ResponseApi } from '../Interfaces/ResponseApi';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class RutaService {
  patchValue(arg0: { origen: (string | ((control: import("@angular/forms").AbstractControl) => import("@angular/forms").ValidationErrors | null))[]; destino: (string | ((control: import("@angular/forms").AbstractControl) => import("@angular/forms").ValidationErrors | null))[]; distancia: (string | ((control: import("@angular/forms").AbstractControl) => import("@angular/forms").ValidationErrors | null))[]; duracion: (string | ((control: import("@angular/forms").AbstractControl) => import("@angular/forms").ValidationErrors | null))[]; }) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = appsettingsCliente.apiUrl + "/ruta";

  constructor(private http: HttpClient) { }
  registrarRuta(ruta:RutaDTO):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.apiUrl}/registrar`, ruta);
  }
  listarRutas(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(`${this.apiUrl}/listar`);
  }
  actualizarRuta(id:number, ruta:RutaDTO): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.apiUrl}/${id}`, ruta);
  }
  buscarRuta(id:number): Observable<Ruta>{
    return this.http.get<Ruta>(`${this.apiUrl}/buscar/${id}`);
  }
  actualizarEstado(id:number): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.apiUrl}/actualizarEstado/${id}`,null);
  }
  buscarRutaPorTerminales(nombreOrigen: string, nombreDestino: string): Observable<Ruta> {
    const params = new HttpParams()
      .set('nombreOrigen', nombreOrigen)
      .set('nombreDestino', nombreDestino);

    return this.http.get<Ruta>(`${this.apiUrl}/buscar`, { params });
  }
}
