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
  asientos: Asiento[] = [];
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
        
        // Suponiendo que quieres obtener los asientos del primer viaje
        // Asegúrate de que cada objeto en 'this.data' tiene un 'idBus' o el campo correcto
        const idBus = this.data[0].bus.idBus; // Usamos el id del primer viaje como ejemplo
  
        // Llamar al servicio para obtener los asientos
        this.asientoService.obtenerAsientoPorCodBus(idBus).subscribe(
          (asientos: Asiento[]) => {
            console.log(asientos);  // Aquí puedes manejar los asientos recibidos
               // Filtrar los asientos con estado '1' y contar cuántos hay
          const asientosConEstado1 = asientos.filter(asiento => asiento.estadoAsiento.idEstadoAsiento == 1);
          this.asientosLibres = asientosConEstado1.length;
          },
          (error) => {
            console.error('Error al obtener los asientos:', error);
          }
        );
      }
    });
  }
  
  detalle(cod:Number){
    console.log('Detalle del viaje:', cod);
    this.router.navigate(['/detalleViaje',{cod} ]);
    
  }
}
