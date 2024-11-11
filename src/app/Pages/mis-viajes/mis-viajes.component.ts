import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { TarjetaBoletoComponent } from "../tarjeta-boleto/tarjeta-boleto.component";

@Component({
  selector: 'app-mis-viajes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, TarjetaBoletoComponent],
  templateUrl: './mis-viajes.component.html',
  styleUrl: './mis-viajes.component.css'
})
export class MisViajesComponent {

}
