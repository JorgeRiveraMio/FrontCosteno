import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../Services/login.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { TerminalService } from '../../Services/terminal.service';
import { Terminal } from '../../Interfaces/Terminal';
import { RutaService } from '../../Services/ruta.service';
import { Ruta } from '../../Interfaces/Ruta';
import { viajeService } from '../../Services/viaje.service';
import { Viaje } from '../../Interfaces/Viaje';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent  {
  private terminalService = inject(TerminalService);
  private rutaService = inject(RutaService);
  private viajeService = inject(viajeService);
  terminals: Terminal[] = [];
  filtro: string = 'activo';
  selectedTerminalOrigen: string = ''; // Inicializa con un valor vacío
  selectedTerminalDestino: string = ''; // Inicializa con un valor vacío
  selectedFechaSalida:Date= new Date();
  selectedFechaLlegada:Date= new Date();
  idRuta: number = 0;
  today: string = "";

  ngOnInit(): void {
    this.listar(this.filtro);
    this.today = new Date().toISOString().split('T')[0];
  }
  listar(filtro: string) {
    this.terminalService.listarTerminales().subscribe((data: Terminal[]) => {
      if (filtro === 'activo') {
        this.terminals = data.filter(terminal => terminal.estado.toLowerCase()  === 'activo');
      } else if (filtro === 'inactivo') {
        this.terminals = data.filter(terminal => terminal.estado.toLowerCase()  === 'inactivo');
      } else {
        this.terminals = data; // En caso de que el filtro no sea válido
      }
      console.log(this.terminals); // Mover aquí para asegurarte de que muestre los datos correctos
    }, error => {
      console.error('Error al listar las terminales:', error); // Manejar el error
    });
  }
  buscarRutas(){
    if(this.selectedTerminalDestino === '' || this.selectedTerminalOrigen === ''){
      console.log("Debe seleccionar una terminal de origen y destino");
      return;

    }else{
      this.rutaService.buscarRutaPorTerminales(this.selectedTerminalOrigen, this.selectedTerminalDestino).subscribe((data: Ruta) => {
        console.log(data);
        this.idRuta = data.idRuta;

        // Asegúrate de que selectedFechaSalida y selectedFechaLlegada sean instancias de Date
        const fechaSalida = new Date(this.selectedFechaSalida);
        const fechaLlegada = new Date(this.selectedFechaLlegada);

        // Verifica si las fechas son válidas
        if (isNaN(fechaSalida.getTime()) || isNaN(fechaLlegada.getTime())) {
            console.error('Fechas inválidas:', this.selectedFechaSalida, this.selectedFechaLlegada);
            return; // Salir si las fechas no son válidas
        }

        this.viajeService.buscarViajes(fechaSalida, fechaLlegada, this.idRuta).subscribe((data: Viaje[]) => {
            console.log(data);
        }, error => {
            console.error('Error al buscar los viajes:', error); // Manejar el error
        });

    }, error => {
        console.error('Error al buscar las rutas:', error); // Manejar el error
    });
    }
    console.log(this.selectedTerminalOrigen);
    console.log(this.selectedTerminalDestino);
    console.log(this.selectedFechaLlegada);
    console.log(this.selectedFechaSalida);
  }
}
