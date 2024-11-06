import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PasajeroComponent } from '../pasajero/pasajero.component';
import { Router, ActivatedRoute } from '@angular/router';  // Inyecta ActivatedRoute para leer los parámetros de la URL
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
  asientosSeleccionados: string[] = [];

  constructor(
    private router: Router,
    private viajeDataService: ViajeDataService,
    private route: ActivatedRoute  // Inyectamos ActivatedRoute para acceder a los parámetros de la URL
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.cantidadAsientos = navigation?.extras?.state?.['cantidadAsientos'] || 0;  // Número de asientos seleccionados
    this.asientosSeleccionados = navigation?.extras?.state?.['asientosSeleccionados'] || []; 
  }

  ngOnInit(): void {
    
    const idViaje = this.route.snapshot.paramMap.get('cod'); // Usando 'cod' como parámetro

    if (idViaje) {
      this.viajeDataService.currentViajes.subscribe(viajes => {
        this.viajeSeleccionado = viajes.find(viaje => viaje.idViaje === Number(idViaje)) || null;
      });
    } else {
      console.error('No se pasó el ID del viaje en la URL');
    }
  }
}
