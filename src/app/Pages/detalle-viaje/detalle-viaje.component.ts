import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ViajeService } from '../../Services/viaje.service'; 
import { Viaje } from '../../Interfaces/Viaje';
import { CommonModule } from '@angular/common';
import { Asiento } from '../../Interfaces/Asiento';
import { AsientoService } from '../../Services/asiento.service';
import { ValidacionesService } from '../../Services/validaciones.service';

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
  precioTotal: number = 0;

  private viajeService = inject(ViajeService); 
  private asientoService = inject(AsientoService); 
  private router = inject(Router); // Inyecta el Router
  private validator = inject(ValidacionesService)

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
    this.actualizarPrecioTotal();
  }
 // Función para calcular y actualizar el precio total
  actualizarPrecioTotal(): void {
    // Si viaje y su precio están disponibles
    if (this.viaje?.precio) {
      this.precioTotal = this.viaje.precio * this.contarAsientosSeleccionados();
    }
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

  hayAsientosSeleccionados(): boolean {
    return this.obtenerAsientosSeleccionados().length > 0;
  }
  
  // Siguiente(): void {
  //   const asientosSeleccionados = this.obtenerAsientosSeleccionados();
    
  //   // Si no hay asientos seleccionados, no hace nada y no navega
  //   if (asientosSeleccionados.length === 0) {
  //     this.validator.tarjeta("Debe seleccionar un asiento para continuar",false);
  //     return; // No navega si no hay asientos seleccionados
  //   }else if (asientosSeleccionados.length > 5){
  //     this.validator.tarjeta("No puedes seleccionar mas de 5 asientos",false);
  //     return; 
  //   }
  
  //   const navigationExtras: NavigationExtras = {
  //     state: { cantidadAsientos: asientosSeleccionados.length, asientosSeleccionados: asientosSeleccionados,
  //       precioTotal:this.precioTotal
  //      }
  //   };
  //   this.router.navigate(['/pasajero', this.cod], navigationExtras); // Navega a MenuPasajeroComponent
  // }
  Siguiente(): void {
    const asientosSeleccionados = this.obtenerAsientosSeleccionados();
    
    // Si no hay asientos seleccionados, no hace nada y no navega
    if (asientosSeleccionados.length === 0) {
      this.validator.tarjeta("Debe seleccionar un asiento para continuar", false);
      return; // No navega si no hay asientos seleccionados
    } else if (asientosSeleccionados.length > 5) {
      this.validator.tarjeta("No puedes seleccionar mas de 5 asientos", false);
      return; 
    }
  
    // Crear un array con los idAsiento de los asientos seleccionados
    const asientosIds = asientosSeleccionados.map(numAsiento => {
      const asiento = this.asientos.find(a => a.numAsiento.toString() === numAsiento.toString());

      return asiento ? asiento.idAsiento : null;
    }).filter(id => id !== null);
  
    const navigationExtras: NavigationExtras = {
      state: { cantidadAsientos: asientosIds.length, asientosSeleccionados: asientosIds, precioTotal: this.precioTotal }
    };
    this.router.navigate(['/pasajero', this.cod], navigationExtras); // Navega a MenuPasajeroComponent
  }
  

  obtenerAsientosSeleccionados(): string[] {
    return Object.keys(this.seleccionados).filter(numAsiento => this.seleccionados[numAsiento]);
  }

  toggleSeat(asiento: Asiento): void {
    console.log("togle"+asiento); // Para ver si la información del asiento es correcta
  
    // Solo permitir seleccionar o deseleccionar si el asiento está disponible (activo)
    if (asiento.estadoAsiento && asiento.estadoAsiento.estado === 'LIBRE') {
      // Si el asiento ya está seleccionado, deseleccionarlo
      if (this.seleccionados[asiento.numAsiento]) {
        // Cambiar el estado de selección a false
        this.seleccionados[asiento.numAsiento] = false;
      } else {
        // Si el asiento no está seleccionado, seleccionarlo
        this.seleccionados[asiento.numAsiento] = true;
      }
    }
    // Actualizar el precio total después de cada cambio en los asientos seleccionados
    this.actualizarPrecioTotal();
  }

  // Este método puede deshabilitar los checkboxes de asientos ocupados o ya seleccionados
  isSeatDisabled(asiento: Asiento): boolean {
    return asiento.estadoAsiento.estado === 'OCUPADO';
  }
  contarAsientosSeleccionados(): number {
    return this.obtenerAsientosSeleccionados().length;
  }

}
