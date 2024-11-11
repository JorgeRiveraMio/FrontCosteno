// tarjeta-boleto.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para los pipes como 'date'
import { BoletoService } from '../../Services/boleto.service';
import { Boleto } from '../../Interfaces/Boleto';
import { HttpClientModule } from '@angular/common/http'; // Si usas HttpClient en el servicio

@Component({
  selector: 'app-tarjeta-boleto',
  standalone: true,
  imports: [
    CommonModule, // Importamos CommonModule para poder usar el pipe 'date' en el template
    HttpClientModule, // Si usas HttpClientModule para hacer las peticiones
  ],
  templateUrl: './tarjeta-boleto.component.html',
  styleUrls: ['./tarjeta-boleto.component.css']
})
export class TarjetaBoletoComponent implements OnInit {
  boletos: Boleto[] = []; // Almacena los boletos

  constructor(private boletoService: BoletoService) {}

  ngOnInit(): void {
    // Al cargar el componente, realizamos la llamada para obtener los boletos
    this.boletoService.listarBoletos().subscribe(
      (boletos) => {
        this.boletos = boletos; // Guardamos los boletos recibidos
      },
      (error) => {
        console.error('Error al obtener los boletos', error); // Si ocurre un error, lo logueamos
      }
    );
  }
}
