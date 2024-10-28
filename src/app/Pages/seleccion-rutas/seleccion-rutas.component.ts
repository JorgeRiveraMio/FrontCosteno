import { Component, inject, OnInit } from '@angular/core';
import { TerminalService } from '../../Services/terminal.service';
import { RutaService } from '../../Services/ruta.service';
import { viajeService } from '../../Services/viaje.service';
import { Terminal } from '../../Interfaces/Terminal';
import { Ruta } from '../../Interfaces/Ruta';
import { Viaje } from '../../Interfaces/Viaje';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion-rutas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seleccion-rutas.component.html',
  styleUrls: ['./seleccion-rutas.component.css']
})
export class SeleccionRutasComponent implements OnInit {
  private terminalService = inject(TerminalService);
  private rutaService = inject(RutaService);
  private viajeService = inject(viajeService);

  constructor(private router: Router) { }

  terminals: Terminal[] = [];
  filtro: string = 'activo';
  selectedTerminalOrigen: string = '';
  selectedTerminalDestino: string = '';
  selectedFechaSalida: string = ''; // Cambiado a string
  selectedFechaLlegada: string = ''; // Cambiado a string
  idRuta: number = 0;
  today: string = '';

  ngOnInit(): void {
    this.listar(this.filtro);
    this.today = new Date().toISOString().split('T')[0]; // Formato 'yyyy-MM-dd'
    this.selectedFechaSalida = this.today; // Inicializar como hoy
    this.selectedFechaLlegada = this.today; // Inicializar como hoy
  }

  listar(filtro: string) {
    this.terminalService.listarTerminales().subscribe((data: Terminal[]) => {
      if (filtro === 'activo') {
        this.terminals = data.filter(terminal => terminal.estado.toLowerCase() === 'activo');
      } else if (filtro === 'inactivo') {
        this.terminals = data.filter(terminal => terminal.estado.toLowerCase() === 'inactivo');
      } else {
        this.terminals = data;
      }
    }, error => {
      console.error('Error al listar las terminales:', error);
    });
  }

  buscarRutas() {
    if (this.selectedTerminalDestino === '' || this.selectedTerminalOrigen === '') {
      console.log("Debe seleccionar una terminal de origen y destino");
      return;
    }

    this.rutaService.buscarRutaPorTerminales(this.selectedTerminalOrigen, this.selectedTerminalDestino).subscribe((data: Ruta) => {
      console.log('Datos de ruta obtenidos:', data);
      this.idRuta = data.idRuta;

      const fechaSalida = new Date(this.selectedFechaSalida);
      const fechaLlegada = new Date(this.selectedFechaLlegada);

      if (isNaN(fechaSalida.getTime()) || isNaN(fechaLlegada.getTime())) {
        console.error('Fechas inválidas:', this.selectedFechaSalida, this.selectedFechaLlegada);
        return;
      }

      console.log('Buscando viajes con:', fechaSalida, fechaLlegada, this.idRuta);
      this.viajeService.buscarViajes(fechaSalida, fechaLlegada, this.idRuta).subscribe((data: Viaje[]) => {
        console.log('Datos de viajes obtenidos:', data);
        this.router.navigate(['/rutas'], { state: { data } });
      }, error => {
        console.error('Error al buscar los viajes:', error);
      });

    }, error => {
      console.error('Error al buscar las rutas:', error);
    });
  }
}
