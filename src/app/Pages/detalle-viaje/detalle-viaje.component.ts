import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ViajeService } from '../../Services/viaje.service'; 
import { Viaje } from '../../Interfaces/Viaje';
import { CommonModule } from '@angular/common';
import { Asiento } from '../../Interfaces/Asiento';
import { AsientoService } from '../../Services/asiento.service';

@Component({
  selector: 'app-detalle-viaje',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './detalle-viaje.component.html',
  styleUrls: ['./detalle-viaje.component.css'] 
})
export class DetalleViajeComponent {
  cod: string = '';
  viaje: Viaje | null = null;
  asientos: Asiento[] = [];
  seleccionados: { [numAsiento: string]: boolean } = {};

  private viajeService = inject(ViajeService); 
  private asientoService = inject(AsientoService); 
  private router = inject(Router); // Inyecta el Router

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cod = params.get('cod') || ''; 
      if (this.cod) { 
        this.buscarViaje();
      } else {
        console.error('Código del viaje no proporcionado');
      }
    });
  }

  buscarViaje() {
    const viajeId = parseInt(this.cod);
    if (!isNaN(viajeId)) {
      this.viajeService.buscarPorID(viajeId).subscribe({
        next: (data: Viaje) => {
          this.viaje = data;
          if (this.viaje?.bus?.idBus) {
            this.asientoService.obtenerAsientoPorCodBus(this.viaje.bus.idBus).subscribe(
              (data) => {
                this.asientos = data;
              },
              (error) => {
                console.error('Error al buscar asientos:', error);
              }
            );
          } else {
            console.error('El viaje no tiene un bus asociado.');
          }
        },
        error: (err) => {
          console.error('Error al buscar el viaje:', err);
        }
      });
    } else {
      console.error('Código del viaje no es válido para buscar');
    }
  }

  cambiarColor(event: Event, asiento: Asiento): void {
    const checkbox = event.target as HTMLInputElement;
    const tdElement = (event.target as HTMLElement).closest('td');
    if (tdElement) {
      if (checkbox.checked) {
        tdElement.style.backgroundColor = 'red';
        this.seleccionados[asiento.numAsiento] = true;
      } else {
        tdElement.style.backgroundColor = '';
        this.seleccionados[asiento.numAsiento] = false;
      }
    }
  }

  Siguiente(): void {
    const asientosSeleccionados = this.obtenerAsientosSeleccionados();
    const navigationExtras: NavigationExtras = {
      state: { cantidadAsientos: asientosSeleccionados.length, asientosSeleccionados: asientosSeleccionados}
    };
    this.router.navigate(['/pasajero', this.cod], navigationExtras); // Navega a MenuPasajeroComponent
  }

  obtenerAsientosSeleccionados(): string[] {
    return Object.keys(this.seleccionados).filter(numAsiento => this.seleccionados[numAsiento]);
  }

  toggleSeat(asiento: Asiento): void {
    console.log(asiento); // Para ver si la información del asiento es correcta

    // Solo permitir seleccionar si el asiento está disponible (activo)
    if (asiento.estadoAsiento && asiento.estadoAsiento.estado === 'Activo') {
        // Cambiar el estado de selección del asiento
        this.seleccionados[asiento.numAsiento] = !this.seleccionados[asiento.numAsiento];
    }
  }

  
}
