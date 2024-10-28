import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Viaje } from '../../Interfaces/Viaje';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-viaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-viaje.component.html',
  styleUrls: ['./tarjeta-viaje.component.css']
})
export class TarjetaViajeComponent {
  data: Viaje[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Aquí es donde recibirás los datos si se navega desde otro componente
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.data = navigation.extras.state['data'] || [];
      console.log(this.data);
    }
    // Si los datos están en el mismo componente (por ejemplo, de una búsqueda), también puedes recibirlos así
  }
}
