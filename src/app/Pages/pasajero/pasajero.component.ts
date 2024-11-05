import { Component, Input } from '@angular/core';
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
}
