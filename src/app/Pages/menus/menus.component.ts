import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ManagementViewComponent } from '../management-view/management-view.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ManagementViewComponent, ModalComponent],
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  currentView: string = 'buses';  // Vista por defecto
  buses: Array<any> = [{ placa: 'PLUS005', nombre: 'BUS 01', capacidadPiso1: 15, capacidadPiso2: 12, disponible: 'SI' }];
  rutas: Array<any> = [{ nombre: 'Ruta 1', origen: 'Ciudad A', destino: 'Ciudad B' }];
  viajes: Array<any> = [{ id: 'V001', bus: 'BUS 01', ruta: 'Ruta 1', fecha: '2024-09-27' }];
  choferes: Array<any> = [{ nombre: 'Juan Pérez', licencia: 'LIC1234' }];
  terminales: Array<any> = [{ nombre: 'Terminal Central', ciudad: 'Ciudad A' }, { nombre: 'Terminal Norte', ciudad: 'Ciudad B' }];

  busFormFields = [
    { name: 'placa', label: 'Placa', type: 'text', required: true },
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'capacidadPiso1', label: 'Capacidad Piso 1', type: 'number', required: true },
    { name: 'capacidadPiso2', label: 'Capacidad Piso 2', type: 'number', required: true }
  ];

  routeFormFields = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'origen', label: 'Origen', type: 'text', required: true },
    { name: 'destino', label: 'Destino', type: 'text', required: true }
  ];

  tripFormFields = [
    { name: 'id', label: 'ID', type: 'text', required: true },
    { name: 'bus', label: 'Bus', type: 'text', required: true },
    { name: 'ruta', label: 'Ruta', type: 'text', required: true },
    { name: 'fecha', label: 'Fecha', type: 'date', required: true }
  ];

  driverFormFields = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'licencia', label: 'Licencia', type: 'text', required: true }
  ];

  terminalFormFields = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'ciudad', label: 'Ciudad', type: 'text', required: true }
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

  openBusModal(): void {
    this.currentView = 'buses'; // Cambiar a vista de buses
  }

  openRouteModal(): void {
    this.currentView = 'rutas'; // Cambiar a vista de rutas
  }

  openTripModal(): void {
    this.currentView = 'viajes'; // Cambiar a vista de viajes
  }

  openDriverModal(): void {
    this.currentView = 'choferes'; // Cambiar a vista de choferes
  }

  openTerminalModal(): void {
    this.currentView = 'terminales'; // Cambiar a vista de terminales
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

  seleccionarBus(bus: any): void {
    // Código para seleccionar bus
  }

  eliminarBus(bus: any): void {
    const index = this.buses.findIndex(b => b.placa === bus.placa);
    if (index !== -1) {
      this.buses.splice(index, 1);  // Elimina el bus de la lista
    }
  }

  seleccionarRuta(ruta: any): void {
    // Código para seleccionar ruta
  }

  eliminarRuta(ruta: any): void {
    const index = this.rutas.findIndex(r => r.nombre === ruta.nombre);
    if (index !== -1) {
      this.rutas.splice(index, 1);  // Elimina la ruta de la lista
    }
  }

  seleccionarViaje(viaje: any): void {
    // Código para seleccionar viaje
  }

  eliminarViaje(viaje: any): void {
    const index = this.viajes.findIndex(v => v.id === viaje.id);
    if (index !== -1) {
      this.viajes.splice(index, 1);  // Elimina el viaje de la lista
    }
  }

  seleccionarChofer(chofer: any): void {
    // Código para seleccionar chofer
  }

  eliminarChofer(chofer: any): void {
    const index = this.choferes.findIndex(c => c.licencia === chofer.licencia);
    if (index !== -1) {
      this.choferes.splice(index, 1);  // Elimina el chofer de la lista
    }
  }

  seleccionarTerminal(terminal: any): void {
    // Código para seleccionar terminal
  }

  eliminarTerminal(terminal: any): void {
    const index = this.terminales.findIndex(t => t.nombre === terminal.nombre);
    if (index !== -1) {
      this.terminales.splice(index, 1);  // Elimina la terminal de la lista
    }
  }

  buscarBus(busqueda: string): Array<any> {
    return this.buses.filter(bus =>
      bus.placa.toLowerCase().includes(busqueda.toLowerCase()) ||
      bus.nombre.toLowerCase().includes(busqueda.toLowerCase()));
  }
}
