// menu-pasajero.component.ts
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PasajeroComponent } from '../pasajero/pasajero.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Viaje } from '../../Interfaces/Viaje';
import { ViajeDataService } from '../../Services/viaje-data.service';

@Component({
  selector: 'app-menu-pasajero',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, PasajeroComponent, CommonModule],
  templateUrl: './menu-pasajero.component.html',
  styleUrls: ['./menu-pasajero.component.css']
})
export class MenuPasajeroComponent implements OnInit {
  cantidadAsientos: number = 0;
  viajeSeleccionado: Viaje | null = null;

  constructor(private router: Router, private viajeDataService: ViajeDataService) {
    const navigation = this.router.getCurrentNavigation();
    this.cantidadAsientos = navigation?.extras?.state?.['cantidadAsientos'] || 0; // Recibe el número de asientos seleccionados
  }

  ngOnInit(): void {
    const idViaje = this.router.getCurrentNavigation()?.extras?.state?.['idViaje'];
    this.viajeDataService.currentViajes.subscribe(viajes => {
      this.viajeSeleccionado = viajes.find(viaje => viaje.idViaje === idViaje) || null;
  
      if (!this.viajeSeleccionado) {
        console.error('No se encontró el viaje seleccionado');
      }
    });
  }
}
