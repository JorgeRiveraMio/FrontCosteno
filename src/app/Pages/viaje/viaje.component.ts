import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Viaje, ViajeDTO } from '../../Interfaces/Viaje';
import { viajeService } from '../../Services/viaje.service';
import { RutaService } from '../../Services/ruta.service';
import { BusService } from '../../Services/bus.service';
import { ChoferService } from '../../Services/chofer.service';
import { LoginService } from '../../Services/login.service';
import { CommonModule, Time } from '@angular/common';
import { Ruta } from '../../Interfaces/Ruta';
import { Bus } from '../../Interfaces/Bus';
import { Chofer } from '../../Interfaces/Chofer';

@Component({
  selector: 'app-viaje',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './viaje.component.html',
  styleUrl: './viaje.component.css'
})
export class ViajeComponent {
  private viajeService = inject(viajeService);
  private formBuild = inject(FormBuilder);
  private rutaService = inject(RutaService);
  private busService = inject(BusService);
  private choferService = inject(ChoferService);
  private loginService = inject(LoginService);

  viajes: Viaje[] = [];
  rutas: Ruta[] = [];
  buses: Bus[] = [];
  choferes: Chofer[] = [];
  idEditado: number | null = null;
  searchTerm: string = '';

  ngOnInit(): void {
    this.listarViajes();
    this.cargarCombos();
  }

  listarViajes() {
    this.viajeService.listarViajes().subscribe((data: Viaje[]) => {
      this.viajes = data;
    }, error => {
      console.error('Error al listar los viajes:', error);
    });
  }

  cargarCombos() {
    this.rutaService.listarRutas().subscribe((data: Ruta[]) => {
      this.rutas = data;
    }, error => {
      console.error('Error al obtener las rutas:', error);
    });

    this.busService.listarBuses().subscribe((data: Bus[]) => {
      this.buses = data;
    }, error => {
      console.error('Error al obtener los buses:', error);
    });

    this.choferService.listarChoferes().subscribe((data: Chofer[]) => {
      this.choferes = data;
    }, error => {
      console.error('Error al obtener los choferes:', error);
    });
  }

  viajeForm = this.formBuild.group({
    ruta: ['', Validators.required],
    bus: ['', Validators.required],
    chofer1: ['', Validators.required],
    chofer2: ['', Validators.required],
    fechaSalida: ['', Validators.required],
    fechaLlegada: ['', Validators.required],
    horaSalida: ['', Validators.required],
    horaLlegada: ['', Validators.required]
  });

  guardarViaje() {
    if (this.viajeForm.valid) {
      // Convertir los valores del formulario a cadenas en formato "HH:mm:ss"
      const horaSalida: string = this.formatTime(this.viajeForm.get('horaSalida')?.value ?? '');
      const horaLlegada: string = this.formatTime(this.viajeForm.get('horaLlegada')?.value ?? '');
  
      const formData: ViajeDTO = {
        idViaje: 0,
        fechaSalida: new Date(this.viajeForm.get('fechaSalida')?.value ?? ''),
        fechaLlegada: new Date(this.viajeForm.get('fechaLlegada')?.value ?? ''),
        horaSalida: horaSalida, // Enviar como cadena
        horaLlegada: horaLlegada, // Enviar como cadena
        idRuta: Number(this.viajeForm.get('ruta')?.value ?? ''),
        idAdministrador: Number(this.loginService.getUser().idPersona),
        idBus: Number(this.viajeForm.get('bus')?.value ?? ''),
        idChofer1: Number(this.viajeForm.get('chofer1')?.value ?? ''),
        idChofer2: Number(this.viajeForm.get('chofer2')?.value ?? ''),
      };
  
      this.viajeService.registrarViaje(formData).subscribe({
        next: () => {
          this.listarViajes();
          this.alertaCorrecto();
        },
        error: (error) => {
          console.error('No se pudo registrar el viaje', error);
        }
      });
    }
  }
  
  // Método formatTime para convertir a cadenas en formato "HH:mm:ss"
  private formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}:00`; // Formato "HH:mm:ss"
  }
  
  filtrarViajes() {
    this.viajeService.listarViajes().subscribe((data: Viaje[]) => {
      let viajesFiltrados = data;
      if (this.searchTerm) {
        viajesFiltrados = data.filter(viaje =>
          viaje.ruta.terminalOrigen.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          viaje.ruta.terminalDestino.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          viaje.bus.placa.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          viaje.chofer1.nombres.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          viaje.chofer2.nombres.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      this.viajes = viajesFiltrados;
    }, error => {
      console.error('Error al listar los viajes:', error);
    });
  }

  alertaCorrecto() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Operación realizada correctamente",
      showConfirmButton: false,
      timer: 1500
    });
  }
}
