import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ManagementViewComponent } from '../management-view/management-view.component';
import { ModalComponent } from '../modal/modal.component';
// import { Bus, Ruta, Viaje, Chofer, Terminal } from '../../Interfaces/Vistas';
import { Bus, Ruta, Viaje, Chofer } from '../../Interfaces/Vistas';
import { TerminalService } from '../../Services/terminal.service';
import { Terminal } from '../../Interfaces/Terminal';


@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ManagementViewComponent, ModalComponent],
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  currentView: string = 'buses';  // Vista por defecto
  
  terminalService =inject(TerminalService);

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
  // terminales: Array<Terminal> = [
  //    { nombre: 'Terminal Central', direccion: 'Av. Principal 123', departamento: 'Lima', provincia: 'Lima', distrito: 'Miraflores', geolocalizacionLatitud: -12.1203, geolocalizacionLongitud: -77.0302 }
  // ];
//   terminales: Array<Terminal> = [
//     { nombre: 'Terminal Central', direccion: 'Av. Principal 123', departamento: 'Lima', provincia: 'Lima', distrito: 'Miraflores', coordenadaLatitud: 'Miraflores', coordenadaLongitud: 'Miraflores'}
//  ];

  formFields = [
    { name: 'placa', label: 'Placa', type: 'text', required: true, entity: 'buses' },
    { name: 'modelo', label: 'Modelo', type: 'text', required: true, entity: 'buses' },
    { name: 'asientosPiso1', label: 'Asientos Piso 1', type: 'number', required: true, entity: 'buses' },
    { name: 'asientosPiso2', label: 'Asientos Piso 2', type: 'number', required: true, entity: 'buses' },
    { name: 'tipoAsiento', label: 'Tipo de Asiento', type: 'text', required: true, entity: 'buses' },
    { name: 'estadoBus', label: 'Estado del Bus', type: 'text', required: true, entity: 'buses' },
    
    { name: 'distanciaKm', label: 'Distancia en Km', type: 'number', required: true, entity: 'rutas' },
    { name: 'duracionAproximada', label: 'Duración Aproximada', type: 'text', required: true, entity: 'rutas' },
    { name: 'estadoRuta', label: 'Estado de la Ruta', type: 'text', required: true, entity: 'rutas' },
    
    { name: 'fechaHoraSalida', label: 'Fecha y Hora de Salida', type: 'datetime-local', required: true, entity: 'viajes' },
    { name: 'fechaHoraLlegada', label: 'Fecha y Hora de Llegada', type: 'datetime-local', required: true, entity: 'viajes' },
    { name: 'estadoViaje', label: 'Estado del Viaje', type: 'text', required: true, entity: 'viajes' },
    
    { name: 'liceConducir', label: 'Licencia de Conducir', type: 'text', required: true, entity: 'choferes' },
    { name: 'fechaLincencia', label: 'Fecha de la Licencia', type: 'date', required: true, entity: 'choferes' },
    { name: 'estadoChofer', label: 'Estado del Chofer', type: 'text', required: true, entity: 'choferes' },
    
    { name: 'nombre', label: 'Nombre', type: 'text', required: true, entity: 'terminales' },
    { name: 'direccion', label: 'Dirección', type: 'text', required: true, entity: 'terminales' },
    { name: 'departamento', label: 'Departamento', type: 'text', required: true, entity: 'terminales' },
    { name: 'provincia', label: 'Provincia', type: 'text', required: true, entity: 'terminales' },
    { name: 'distrito', label: 'Distrito', type: 'text', required: true, entity: 'terminales' },
    { name: 'geolocalizacionLatitud', label: 'Geolocalización (Latitud)', type: 'number', required: true, entity: 'terminales' },
    { name: 'geolocalizacionLongitud', label: 'Geolocalización (Longitud)', type: 'number', required: true, entity: 'terminales' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    //this.listarTerminal();
  }

  ngOnInit(): void {
    //  this.listarTerminal();
        
    this.route.url.subscribe(urlSegments => {
      const path = urlSegments.map(segment => segment.path).join('/');
      this.currentView = path.split('/').pop() || ''; // Establecer la vista actual
      console.log('Vista actual:', this.currentView);
      
    });
  }

  setView(view: string): void {
    this.currentView = view; // Establecer la vista actual
    console.log('Vista actualizada:', this.currentView);
    // this.router.navigate([`/menus/${view}`]); // Navegar a la nueva ruta
  }

  openModal(view: string): void {
    this.currentView = view; // Cambiar a vista según el tipo de entidad
    const modalElement = document.getElementById('crearBusModal');
    
    if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        
        // Asegúrate de que estás pasando los formFields correctamente
        const modalComponent = modalElement.querySelector('app-modal') as any;
        modalComponent.formFields = this.getFormFields(view);
        
        console.log('Form Fields for Modal:', modalComponent.formFields); // Verifica los campos
        modal.show();
    } else {
        console.error('El modal no se encontró en el DOM.');
    }
  }
  

  getFormFields(view: string) {
    const fields = this.formFields.filter(field => field.entity === view);
    console.log('Fields for view:', view, fields);
    return fields;
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
        // return this.terminales;
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
        // this.terminales.push(item);
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
        // this.terminales = this.terminales.filter(terminal => terminal.nombre !== entidad.nombre);
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
        // return this.terminales.filter(terminal =>
        //   terminal.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        //   terminal.departamento.toLowerCase().includes(busqueda.toLowerCase()) ||
        //   terminal.provincia.toLowerCase().includes(busqueda.toLowerCase()) ||
        //   terminal.distrito.toLowerCase().includes(busqueda.toLowerCase())
        // );
      default:
        return [];
    }
  }
  listarTerminal() {
    this.terminalService.listarTerminales().subscribe(
      (response) => {
        if (response && response.length) {
          console.log('Terminales encontrados:', response); // Mostrar los terminales en la consola
          // this.terminales = response; // Asignar los terminales recibidos si es necesario
        } else {
          console.log('No se encontraron terminales.');
        }
      },
      (error) => {
        console.error('Error al obtener los terminales:', error);
      }
    );
  }
  
}
