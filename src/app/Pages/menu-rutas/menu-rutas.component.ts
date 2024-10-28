import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SeleccionRutasComponent } from '../seleccion-rutas/seleccion-rutas.component';
import { TarjetaViajeComponent } from '../tarjeta-viaje/tarjeta-viaje.component';

@Component({
  selector: 'app-menu-rutas',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SeleccionRutasComponent, TarjetaViajeComponent],
  templateUrl: './menu-rutas.component.html',
  styleUrl: './menu-rutas.component.css'
})
export class MenuRutasComponent {

}
