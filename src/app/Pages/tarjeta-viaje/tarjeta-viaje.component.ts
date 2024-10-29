import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViajeDataService } from '../../Services/viaje-data.service';
import { Router } from '@angular/router';
import { Viaje } from '../../Interfaces/Viaje';

@Component({
  selector: 'app-tarjeta-viaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-viaje.component.html',
  styleUrls: ['./tarjeta-viaje.component.css']
})
export class TarjetaViajeComponent implements OnInit {
  data: Viaje[] = [];

  constructor(private viajeDataService: ViajeDataService) {}

  ngOnInit(): void {
    // Suscribirse a los datos del servicio
    this.viajeDataService.currentViajes.subscribe(viajes => {
      this.data = viajes;
      if (this.data.length === 0) {
        console.error('No se han recibido datos de viajes');
      } else {
        console.log('Datos recibidos:', this.data);
      }
    });
  }
}
