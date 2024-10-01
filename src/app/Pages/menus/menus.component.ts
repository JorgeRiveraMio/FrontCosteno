import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ManagementViewComponent } from '../management-view/management-view.component';
import { ModalComponent } from '../modal/modal.component';
import { Bus, Ruta, Viaje, Chofer, Terminal } from '../../Interfaces/Vistas';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ManagementViewComponent, ModalComponent],
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  currentView: string = 'buses';  // Vista por defecto

  // Usar las interfaces para definir los datos de cada entidad
  buses: Array<Bus> = [
    { placa: 'PLUS005', modelo: 'Mercedes-Benz', asientosPiso1: 15, asientosPiso2: 12, tipoAsiento: 'Reclinable', estadoBus: 'Disponible' }
  ];
  rutas: Array<Ruta> = [
    { distanciaKm: 150, duracionAproximada: '3h 30min', estadoRuta: 'Activa' }
  ];
  viajes: Array<Viaje> = [
    { fechaHoraSalida: '2024-09-27 09:00', fechaHoraLlegada: '2024-09-27 12:30', estadoViaje: 'Programado' }
  ];
  choferes: Array<Chofer> = [
    { liceConducir: 'LIC1234', fechaLincencia: '2023-01-15', estadoChofer: 'Activo' }
  ];
  terminales: Array<Terminal> = [
    { nombre: 'Terminal Central', direccion: 'Av. Principal 123', departamento: 'Lima', provincia: 'Lima', distrito: 'Miraflores', geolocalizacionLatitud: -12.1203, geolocalizacionLongitud: -77.0302 }
  ];

  // Campos del formulario para cada tipo de entidad
  busFormFields = [
    { name: 'placa', label: 'Placa', type: 'text', required: true },
    { name: 'modelo', label: 'Modelo', type: 'text', required: true },
    { name: 'asientosPiso1', label: 'Asientos Piso 1', type: 'number', required: true },
    { name: 'asientosPiso2', label: 'Asientos Piso 2', type: 'number', required: true },
    { name: 'tipoAsiento', label: 'Tipo de Asiento', type: 'text', required: true },
    { name: 'estadoBus', label: 'Estado del Bus', type: 'text', required: true }
  ];

  routeFormFields = [
    { name: 'distanciaKm', label: 'Distancia en Km', type: 'number', required: true },
    { name: 'duracionAproximada', label: 'Duración Aproximada', type: 'text', required: true },
    { name: 'estadoRuta', label: 'Estado de la Ruta', type: 'text', required: true }
  ];

  tripFormFields = [
    { name: 'fechaHoraSalida', label: 'Fecha y Hora de Salida', type: 'datetime-local', required: true },
    { name: 'fechaHoraLlegada', label: 'Fecha y Hora de Llegada', type: 'datetime-local', required: true },
    { name: 'estadoViaje', label: 'Estado del Viaje', type: 'text', required: true }
  ];

  driverFormFields = [
    { name: 'liceConducir', label: 'Licencia de Conducir', type: 'text', required: true },
    { name: 'fechaLincencia', label: 'Fecha de la Licencia', type: 'date', required: true },
    { name: 'estadoChofer', label: 'Estado del Chofer', type: 'text', required: true }
  ];

  terminalFormFields = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'direccion', label: 'Dirección', type: 'text', required: true },
    { name: 'departamento', label: 'Departamento', type: 'text', required: true },
    { name: 'provincia', label: 'Provincia', type: 'text', required: true },
    { name: 'distrito', label: 'Distrito', type: 'text', required: true },
    { name: 'geolocalizacionLatitud', label: 'Geolocalización (Latitud)', type: 'number', required: true },
    { name: 'geolocalizacionLongitud', label: 'Geolocalización (Longitud)', type: 'number', required: true }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      const path = urlSegments.map(segment => segment.path).join('/');
      this.currentView = path.split('/').pop() || ''; // Establecer la vista actual
    });
  }

  setView(view: string): void {
    this.currentView = view; // Establecer la vista actual
    this.router.navigate([`/menus/${view}`]); // Navegar a la nueva ruta
  }

  openModal(view: string): void {
    this.currentView = view; // Cambiar a vista según el tipo de entidad
    // Aquí podrías agregar cualquier lógica necesaria para abrir el modal
  }

  getFormFields(view: string) {
    switch (view) {
      case 'buses':
        return this.busFormFields;
      case 'rutas':
        return this.routeFormFields;
      case 'viajes':
        return this.tripFormFields;
      case 'choferes':
        return this.driverFormFields;
      case 'terminales':
        return this.terminalFormFields;
      default:
        return [];
    }
  }
  
  getItems(view: string) {
    switch (view) {
      case 'buses':
        return this.buses;
      case 'rutas':
        return this.rutas;
      case 'viajes':
        return this.viajes;
      case 'choferes':
        return this.choferes;
      case 'terminales':
        return this.terminales;
      default:
        return [];
    }
  }

  handleItemCreated(item: any) {
    switch (this.currentView) {
      case 'buses':
        this.buses.push(item);
        break;
      case 'rutas':
        this.rutas.push(item);
        break;
      case 'viajes':
        this.viajes.push(item);
        break;
      case 'choferes':
        this.choferes.push(item);
        break;
      case 'terminales':
        this.terminales.push(item);
        break;
    }
  }

  seleccionarEntidad(entidad: any, tipo: string): void {
    switch (tipo) {
      case 'buses':
        console.log('Bus seleccionado:', entidad);
        break;
      case 'rutas':
        console.log('Ruta seleccionada:', entidad);
        break;
      case 'viajes':
        console.log('Viaje seleccionado:', entidad);
        break;
      case 'choferes':
        console.log('Chofer seleccionado:', entidad);
        break;
      case 'terminales':
        console.log('Terminal seleccionada:', entidad);
        break;
    }
  }

  eliminarEntidad(entidad: any, tipo: string): void {
    switch (tipo) {
      case 'buses':
        this.buses = this.buses.filter(bus => bus.placa !== entidad.placa);
        break;
      case 'rutas':
        this.rutas = this.rutas.filter(ruta => ruta.distanciaKm !== entidad.distanciaKm);
        break;
      case 'viajes':
        this.viajes = this.viajes.filter(viaje => viaje.fechaHoraSalida !== entidad.fechaHoraSalida);
        break;
      case 'choferes':
        this.choferes = this.choferes.filter(chofer => chofer.liceConducir !== entidad.liceConducir);
        break;
      case 'terminales':
        this.terminales = this.terminales.filter(terminal => terminal.nombre !== entidad.nombre);
        break;
    }
  }

  buscarEntidad(busqueda: string, tipo: string): Array<any> {
    switch (tipo) {
      case 'buses':
        return this.buses.filter(bus =>
          bus.placa.toLowerCase().includes(busqueda.toLowerCase()) ||
          bus.modelo.toLowerCase().includes(busqueda.toLowerCase())
        );
      case 'rutas':
        return this.rutas.filter(ruta =>
          ruta.duracionAproximada.toLowerCase().includes(busqueda.toLowerCase()) ||
          ruta.estadoRuta.toLowerCase().includes(busqueda.toLowerCase())
        );
      case 'viajes':
        return this.viajes.filter(viaje =>
          viaje.estadoViaje.toLowerCase().includes(busqueda.toLowerCase())
        );
      case 'choferes':
        return this.choferes.filter(chofer =>
          chofer.liceConducir.toLowerCase().includes(busqueda.toLowerCase()) ||
          chofer.estadoChofer.toLowerCase().includes(busqueda.toLowerCase())
        );
      case 'terminales':
        return this.terminales.filter(terminal =>
          terminal.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          terminal.departamento.toLowerCase().includes(busqueda.toLowerCase()) ||
          terminal.provincia.toLowerCase().includes(busqueda.toLowerCase()) ||
          terminal.distrito.toLowerCase().includes(busqueda.toLowerCase())
        );
      default:
        return [];
    }
  }
}
