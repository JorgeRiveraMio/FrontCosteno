import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { Asiento } from '../Interfaces/Asiento';

@Injectable({
  providedIn: 'root'
})
export class AsientoService {
  private apiUrl = appsettingsCliente.apiUrl + "/asiento";

  constructor(private http: HttpClient) { }

  obtenerAsientoPorCodBus(id:number):Observable<Asiento[]>{
    return this.http.get<Asiento[]>(`${this.apiUrl}/buscarPorCodBus/${id}`);
  }
}
