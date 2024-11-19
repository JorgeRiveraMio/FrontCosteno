import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PasajeroService } from '../../Services/pasajero.service';
import { Pasajero } from '../../Interfaces/Pasajero';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pasajero',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  edadMensaje: string | null = null;

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

  emitirDatos() {
    this.datosPasajeroChange.emit(this.pasajero);
  }

  validarEdad() {
    if (!this.pasajero.fecNacimiento) {
      this.edadMensaje = null;
      return;
    }
  
    const hoy = new Date();
    const nacimiento = new Date(this.pasajero.fecNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear(); // Cambié 'const' por 'let'
    const mes = hoy.getMonth() - nacimiento.getMonth();
    const dia = hoy.getDate() - nacimiento.getDate();
  
    if (mes < 0 || (mes === 0 && dia < 0)) {
      edad--;
    }
  
    if (edad < 12) {
      this.edadMensaje = `Los menores de 12 años deberán viajar OBLIGATORIAMENTE acompañados de alguno de sus padres o persona mayor de edad que cuente y presente de manera física autorización notarial.`;
    } else if (edad >= 12 && edad < 18) {
      this.edadMensaje = `Los mayores de 12 años podrán viajar solos con la autorización notarial de alguno de sus padres.`;
    } else {
      this.edadMensaje = null;
    }
  }
}
