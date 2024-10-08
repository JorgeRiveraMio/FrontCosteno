import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { Terminal } from '../Interfaces/Terminal';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  private apiUrl = appsettingsCliente.apiUrl + "/terminal";

  constructor(private http: HttpClient) { }

  registrarTerminal(terminal: Terminal):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.apiUrl}/registrar`, terminal);
  }
  
  // listarTerminal():Observable<any>{
  //   return this.http.get<any>(`${this.apiUrl}/listar`);
  // }
  listarTerminales(): Observable<Terminal[]> {
    return this.http.get<Terminal[]>(`${this.apiUrl}/listar`);
  }
}
