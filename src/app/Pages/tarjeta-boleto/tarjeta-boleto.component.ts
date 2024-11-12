import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoletoService } from '../../Services/boleto.service';
import { Boleto } from '../../Interfaces/Boleto';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-tarjeta-boleto',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './tarjeta-boleto.component.html',
  styleUrls: ['./tarjeta-boleto.component.css']
})
export class TarjetaBoletoComponent implements OnInit {
  boletos: Boleto[] = [];

  constructor(
    private boletoService: BoletoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Obtener el usuario logueado
    const userId = this.loginService.getUser();

    if (userId) {
      // Imprimir el ID para verificar que estamos obteniendo correctamente
      console.log('User ID:', userId.idPersona); // Imprimir el ID del usuario
      const idCliente = userId.idPersona; // Asignamos el idPersona a idCliente

      // Llamamos a listar los boletos del cliente logueado
      this.boletoService.listarBoletosPorCliente(idCliente).subscribe(
        (boletos) => {
          this.boletos = boletos; // Guardamos los boletos obtenidos
        },
        (error) => {
          console.error('Error al obtener los boletos por cliente', error); // Si ocurre un error, lo mostramos
        }
      );
    } else {
      console.error('No se pudo obtener el ID del usuario logueado');
    }
  }
}
