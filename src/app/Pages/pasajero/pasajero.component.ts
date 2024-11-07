import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PasajeroService } from '../../Services/pasajero.service';
import { Pasajero } from '../../Interfaces/Pasajero';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pasajero',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pasajero.component.html',
  styleUrls: ['./pasajero.component.css']
})
export class PasajeroComponent {
  @Input() numeroPasajero: number = 1; 
  @Output() datosPasajeroChange = new EventEmitter<any>();
  pasajero: Pasajero = {
    idPasajero: 0,
    numDocumento: '',
    nombres: '',
    apellidos: '',
    fecNacimiento: new Date()
  };

  constructor(private pasajeroService: PasajeroService) {}

  registrarPasajero() {
    this.pasajeroService.registrarPasajero(this.pasajero).subscribe({
      next: (response) => {
        console.log('Pasajero registrado:', response);
      },
      error: (error) => {
        console.error('Error al registrar el pasajero:', error);
      }
    });
  }
   // Método que emite los datos actuales del pasajero
   emitirDatos() {
    this.datosPasajeroChange.emit(this.pasajero);
  }
}
