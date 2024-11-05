import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { ViajeService } from '../../Services/viaje.service'; // Cambia a mayúscula
import { Viaje } from '../../Interfaces/Viaje';
import { CommonModule } from '@angular/common';
import { Asiento } from '../../Interfaces/Asiento';
import { AsientoService } from '../../Services/asiento.service';

@Component({
  selector: 'app-detalle-viaje',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule],
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cod = params.get('cod') || ''; // Manejar el caso null
      console.log('Código del viaje:', this.cod);
      if (this.cod) { // Verifica que cod no esté vacío
        this.buscarViaje();
      } else {
        console.error('Código del viaje no proporcionado');
      }
    });
  }

  buscarViaje() {
    console.log('Código del viaje:', this.cod);
    const viajeId = parseInt(this.cod);

    if (!isNaN(viajeId)) {
      this.viajeService.buscarPorID(viajeId).subscribe({
        next: (data: Viaje) => {
          this.viaje = data;
          // console.log('Viaje encontrado:', this.viaje);

          // Asegúrate de que el viaje tenga un bus asociado antes de buscar asientos
          if (this.viaje?.bus?.idBus) {
            this.asientoService.obtenerAsientoPorCodBus(this.viaje.bus.idBus).subscribe(
              (data) => {
                console.log('Asientos encontrados:', data);
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
  
    // Cambiar el color de fondo del td según el estado del checkbox
    const tdElement = (event.target as HTMLElement).closest('td');
    if (tdElement) {
      if (checkbox.checked) {
        tdElement.style.backgroundColor = 'red'; // Cambia a rojo
        this.seleccionados[asiento.numAsiento] = true; // Marca el asiento como seleccionado
      } else {
        tdElement.style.backgroundColor = ''; // Reestablece el color
        this.seleccionados[asiento.numAsiento] = false; // Desmarca el asiento
      }
    }
  }
  
  Siguiente(): void {
    const asientosSeleccionados = this.obtenerAsientosSeleccionados();
    console.log('Asientos seleccionados:', asientosSeleccionados);
    // Aquí puedes enviar los asientosSeleccionados a donde necesites
  }
  
  obtenerAsientosSeleccionados(): string[] {
    return Object.keys(this.seleccionados).filter(numAsiento => this.seleccionados[numAsiento]);
  }
  
}
