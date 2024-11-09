import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Boleto, BoletoDTO } from '../Interfaces/Boleto';

@Injectable({
  providedIn: 'root'
})
export class BoletoService {

  private apiUrl = appsettingsCliente.apiUrl + "/boleto";

  constructor(private http: HttpClient) { }
   // Método para registrar un boleto
   registrarBoleto(boletoDTO: BoletoDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, boletoDTO);
  }

  // Método para listar todos los boletos
  listarBoletos(): Observable<Boleto[]> {
    return this.http.get<Boleto[]>(`${this.apiUrl}/listar`);
  }

  // Método para buscar un boleto por su ID
  buscarBoletoPorId(id: number): Observable<Boleto> {
    return this.http.get<Boleto>(`${this.apiUrl}/buscar/${id}`);
  }
}
