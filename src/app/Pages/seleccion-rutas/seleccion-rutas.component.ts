import { Component, inject, OnInit } from '@angular/core';
import { TerminalService } from '../../Services/terminal.service';
import { RutaService } from '../../Services/ruta.service';
import { ViajeService } from '../../Services/viaje.service';
import { ViajeDataService } from '../../Services/viaje-data.service';
import { Terminal } from '../../Interfaces/Terminal';
import { Ruta } from '../../Interfaces/Ruta';
import { Viaje } from '../../Interfaces/Viaje';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ValidacionesService } from '../../Services/validaciones.service';

@Component({
  selector: 'app-seleccion-rutas',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './seleccion-rutas.component.html',
  styleUrls: ['./seleccion-rutas.component.css']
})
export class SeleccionRutasComponent implements OnInit {
  private terminalService = inject(TerminalService);
  private rutaService = inject(RutaService);
  private viajeService = inject(ViajeService);
  private validatorService = inject(ValidacionesService);
  constructor(private router: Router,  private viajeDataService: ViajeDataService) { }

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
       
        this.validatorService.tarjeta("Debe seleccionar una terminal de origen y destino",false)
        return;
    }

    this.rutaService.buscarRutaPorTerminales(this.selectedTerminalOrigen, this.selectedTerminalDestino).subscribe((data: Ruta) => {
        console.log('Fecha de Salida seleccionada:', this.selectedFechaSalida);
        console.log('Fecha de Llegada seleccionada:', this.selectedFechaLlegada); 

        console.log('Datos de ruta obtenidos:', data);
        if( data==null ){
          this.validatorService.tarjeta("No existe esa ruta asignada a un viaje",false)
         
          return;
        }
        this.idRuta = data.idRuta;
        
        const fechaSalida = new Date(this.selectedFechaSalida + 'T19:00:00'); 
        const fechaLlegada = new Date(this.selectedFechaLlegada + 'T19:00:00'); 
        if (isNaN(fechaSalida.getTime()) || isNaN(fechaLlegada.getTime())) {
            console.error('Fechas inválidas:', this.selectedFechaSalida, this.selectedFechaLlegada);
            return;
        }

        console.log('Buscando viajes con:', fechaSalida.toISOString(), fechaLlegada.toISOString(), this.idRuta);
        this.viajeService.buscarViajes(fechaSalida, fechaLlegada, this.idRuta).subscribe((data: Viaje[]) => {
          console.log('Datos de viajes obtenidos:', data);
          this.viajeDataService.updateViajes(data); // Actualiza el servicio con los datos
          this.router.navigate(['/rutas']);
        }, error => {
          console.error('Error al buscar los viajes:', error);
        });

    }, error => {
        console.error('Error al buscar las rutas:', error);
    });
}

}
