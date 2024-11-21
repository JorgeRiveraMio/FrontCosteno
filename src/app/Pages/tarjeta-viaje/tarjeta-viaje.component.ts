import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViajeDataService } from '../../Services/viaje-data.service';
import { Router } from '@angular/router';
import { Viaje } from '../../Interfaces/Viaje';
import { AsientoService } from '../../Services/asiento.service';
import { Asiento } from '../../Interfaces/Asiento';

@Component({
  selector: 'app-tarjeta-viaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-viaje.component.html',
  styleUrls: ['./tarjeta-viaje.component.css']
})
export class TarjetaViajeComponent implements OnInit {
  data: Viaje[] = [];
  asientosDisponiblesPorViaje: { [idViaje: number]: number } = {}; // Almacenar los asientos disponibles por viaje
  asientosLibres:number = 0;
  router = inject(Router);
  constructor(private viajeDataService: ViajeDataService, private asientoService:AsientoService) {}
  ngOnInit(): void {
    // Suscribirse a los datos del servicio
    this.viajeDataService.currentViajes.subscribe(viajes => {
      this.data = viajes;
      if (this.data.length === 0) {
        console.error('No se han recibido datos de viajes');
      } else {
        console.log('Datos recibidos:', this.data);
        
        // Para cada viaje, obtener los asientos disponibles
        this.data.forEach(viaje => {
          const idBus = viaje.bus.idBus; // Usamos el id del bus de cada viaje
          
          // Llamar al servicio para obtener los asientos para cada viaje
          this.asientoService.obtenerAsientoPorCodBus(idBus).subscribe(
            (asientos: Asiento[]) => {
              console.log(`Asientos para el viaje ${viaje.idViaje}:`, asientos);
              
              // Filtrar los asientos con estado '1' (libre) y contar cuántos hay
              const asientosLibres = asientos.filter(asiento => asiento.estadoAsiento.idEstadoAsiento == 1).length;
              
              // Almacenar el número de asientos disponibles para cada viaje
              this.asientosDisponiblesPorViaje[viaje.idViaje] = asientosLibres;
            },
            (error) => {
              console.error(`Error al obtener los asientos para el viaje ${viaje.idViaje}:`, error);
            }
          );
        });
      }
    });
  }
  
  detalle(cod:Number){
    console.log('Detalle del viaje:', cod);
    this.router.navigate(['/detalleViaje',{cod} ]);
    
  }
}
