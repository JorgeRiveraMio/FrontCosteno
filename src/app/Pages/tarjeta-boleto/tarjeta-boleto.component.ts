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
  boletosAgrupados: { key: string; boletos: Boleto[] }[] = [];

  constructor(
    private boletoService: BoletoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const userId = this.loginService.getUser();

    if (userId) {
      const idCliente = userId.idPersona;

      this.boletoService.listarBoletosPorCliente(idCliente).subscribe(
        (boletos) => {
          this.boletos = boletos;
          this.agruparBoletos();
        },
        (error) => {
          console.error('Error al obtener los boletos por cliente', error);
        }
      );
    } else {
      console.error('No se pudo obtener el ID del usuario logueado');
    }
  }

  agruparBoletos(): void {
    const agrupados = new Map<string, Boleto[]>();
  
    this.boletos.forEach((boleto) => {
      // Construir la clave de agrupación incluyendo la hora
      const key = `${boleto.viaje}-${boleto.fechaEmision}-${boleto.horaEmision}`;
  
      // Verificar si la clave ya existe y agregar el boleto al grupo
      if (!agrupados.has(key)) {
        agrupados.set(key, []);
      }
      agrupados.get(key)!.push(boleto);
    });
  
    // Convertir el Map en un arreglo para usar en la plantilla
    this.boletosAgrupados = Array.from(agrupados.entries()).map(([key, boletos]) => ({
      key,
      boletos,
    }));
  }

  getAsientos(group: any): string {
    return group.boletos.map((boleto: any) => boleto.asiento.numAsiento).join(', ');
  }

  getTotalPrecio(group: any): number {
    return group.boletos.reduce((total: number, boleto: any) => total + boleto.precio, 0);
  }
}
