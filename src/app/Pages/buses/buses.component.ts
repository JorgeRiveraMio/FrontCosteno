import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-buses',
    standalone: true,
    imports: [CommonModule, FormsModule, HeaderComponent],
    templateUrl: './buses.component.html',
    styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {

  // Lista de buses
  buses: Array<any> = [
    { placa: 'PLUS005', nombre: 'BUS 01', capacidadPiso1: 15, capacidadPiso2: 12, disponible: 'SI' },
    // Agrega más buses aquí si es necesario
  ];

  // Variables para el nuevo bus
  nuevoBus: any = {
    placa: '',
    nombre: '',
    capacidadPiso1: null,
    capacidadPiso2: null,
    disponible: 'SI'
  };

  // Variables para el bus que se va a editar
  busEditando: any = null;

  constructor() { }

  ngOnInit(): void { }

  // Método para agregar un nuevo bus
  agregarBus(): void {
    if (this.nuevoBus.placa && this.nuevoBus.nombre) {
      this.buses.push({ ...this.nuevoBus }); // Agrega el nuevo bus
      this.nuevoBus = { placa: '', nombre: '', capacidadPiso1: null, capacidadPiso2: null, disponible: 'SI' }; // Reinicia el formulario
    }
  }

  // Método para seleccionar un bus para edición
  seleccionarBus(bus: any): void {
    this.busEditando = { ...bus }; // Crea una copia del bus a editar
  }

  // Método para guardar los cambios del bus editado
  guardarCambiosBus(): void {
    if (this.busEditando) {
      const index = this.buses.findIndex(b => b.placa === this.busEditando.placa);
      if (index !== -1) {
        this.buses[index] = this.busEditando;
        this.busEditando = null; // Limpia el modo de edición
      }
    }
  }

  // Método para eliminar un bus
  eliminarBus(bus: any): void {
    const index = this.buses.findIndex(b => b.placa === bus.placa);
    if (index !== -1) {
      this.buses.splice(index, 1); // Elimina el bus de la lista
    }
  }

  // Método para filtrar buses (por ejemplo, por placa o nombre)
  buscarBus(busqueda: string): Array<any> {
    return this.buses.filter(bus => 
      bus.placa.toLowerCase().includes(busqueda.toLowerCase()) || 
      bus.nombre.toLowerCase().includes(busqueda.toLowerCase()));
  }
}
