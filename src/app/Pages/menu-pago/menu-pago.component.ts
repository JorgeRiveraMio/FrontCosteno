import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-menu-pago',
  standalone: true,
  imports: [HeaderComponent,FooterComponent, CommonModule],
  templateUrl: './menu-pago.component.html',
  styleUrl: './menu-pago.component.css'
})
export class MenuPagoComponent implements OnInit {
  pasajerosData: any[] = [];
  viajeSeleccionado: any = {};
  cantidadAsientos: number = 0;
  asientosSeleccionados: string[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras?.state) {
      // Verificando los datos recibidos
      console.log('Datos recibidos desde la página anterior:', navigation.extras.state);

      this.pasajerosData = navigation.extras.state['pasajerosData'];
      this.viajeSeleccionado = navigation.extras.state['viajeSeleccionado'];
      this.cantidadAsientos = navigation.extras.state['cantidadAsientos'];
      this.asientosSeleccionados = navigation.extras.state['asientosSeleccionados'];
      
      console.log('Pasajeros Data:', this.pasajerosData);
      console.log('Viaje Seleccionado:', this.viajeSeleccionado);
      console.log('Cantidad de Asientos:', this.cantidadAsientos);
      console.log('Asientos Seleccionados:', this.asientosSeleccionados);
    } else {
      console.error('No se recibieron datos desde la página anterior.');
    }
  }

  ngOnInit(): void {
    
  }
}