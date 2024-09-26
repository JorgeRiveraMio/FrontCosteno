import { Component, OnInit } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit {
  // Lista de rutas
  rutas: Array<any> = [
    {
      origen: { nombre: 'Terminal A', direccion: 'Dirección A' },
      destino: { nombre: 'Terminal B', direccion: 'Dirección B' },
      distanciaKm: 100,
      duracionAprox: '2h',
      estado: 'Disponible'
    },
    // Agrega más rutas aquí si es necesario
  ];

  // Variables para la nueva ruta
  nuevaRuta: any = {
    origen: { nombre: '', direccion: '' },
    destino: { nombre: '', direccion: '' },
    distanciaKm: null,
    duracionAprox: '',
    estado: 'Disponible'
  };

  // Variables para la ruta que se va a editar
  rutaEditando: any = null;

  constructor() { }

  ngOnInit(): void { }

  // Método para agregar una nueva ruta
  agregarRuta(): void {
    if (this.nuevaRuta.distanciaKm && this.nuevaRuta.duracionAprox && this.nuevaRuta.origen.nombre && this.nuevaRuta.destino.nombre) {
      this.rutas.push({ ...this.nuevaRuta }); // Agrega la nueva ruta
      this.nuevaRuta = { origen: { nombre: '', direccion: '' }, destino: { nombre: '', direccion: '' }, distanciaKm: null, duracionAprox: '', estado: 'Disponible' }; // Reinicia el formulario
    }
  }

  // Método para seleccionar una ruta para edición
  seleccionarRuta(ruta: any): void {
    this.rutaEditando = { ...ruta }; // Crea una copia de la ruta a editar
  }

  // Método para guardar los cambios de la ruta editada
  guardarCambiosRuta(): void {
    if (this.rutaEditando) {
      const index = this.rutas.findIndex(r => 
        r.origen.nombre === this.rutaEditando.origen.nombre && 
        r.destino.nombre === this.rutaEditando.destino.nombre &&
        r.distanciaKm === this.rutaEditando.distanciaKm &&
        r.duracionAprox === this.rutaEditando.duracionAprox);
      if (index !== -1) {
        this.rutas[index] = this.rutaEditando;
        this.rutaEditando = null; // Limpia el modo de edición
      }
    }
  }

  // Método para eliminar una ruta
  eliminarRuta(ruta: any): void {
    const index = this.rutas.findIndex(r => 
      r.origen.nombre === ruta.origen.nombre && 
      r.destino.nombre === ruta.destino.nombre &&
      r.distanciaKm === ruta.distanciaKm &&
      r.duracionAprox === ruta.duracionAprox);
    if (index !== -1) {
      this.rutas.splice(index, 1); // Elimina la ruta de la lista
    }
  }

  // Método para filtrar rutas (por ejemplo, por distancia o duración)
  buscarRuta(busqueda: string): Array<any> {
    return this.rutas.filter(ruta => 
      ruta.distanciaKm.toString().includes(busqueda) || 
      ruta.duracionAprox.toLowerCase().includes(busqueda.toLowerCase()) ||
      ruta.origen.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      ruta.destino.nombre.toLowerCase().includes(busqueda.toLowerCase()));
  }
}
