import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PasajeroComponent } from '../pasajero/pasajero.component';
import { Router, ActivatedRoute } from '@angular/router';  // Inyecta ActivatedRoute para leer los parámetros de la URL
import { CommonModule } from '@angular/common';
import { Viaje } from '../../Interfaces/Viaje';
import { ViajeDataService } from '../../Services/viaje-data.service';
import { ValidacionesService } from '../../Services/validaciones.service';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-menu-pasajero',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, PasajeroComponent, CommonModule],
  templateUrl: './menu-pasajero.component.html',
  styleUrls: ['./menu-pasajero.component.css']
})
export class MenuPasajeroComponent implements OnInit {
  cantidadAsientos: number = 0;
  viajeSeleccionado: Viaje | null = null;
  asientosSeleccionados: string[] = [];
  totalAPagar: number = 0;
  pasajerosData: any[] = []; // Array para almacenar los datos de cada pasajero
  private validator =inject(ValidacionesService);
  private loginService =inject(LoginService);

  constructor(
    private router: Router,
    private viajeDataService: ViajeDataService,
    private route: ActivatedRoute  ,
   
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.cantidadAsientos = navigation?.extras?.state?.['cantidadAsientos'] || 0;  // Número de asientos seleccionados
    this.asientosSeleccionados = navigation?.extras?.state?.['asientosSeleccionados'] || []; 
    this.totalAPagar = navigation?.extras?.state?.['precioTotal'] || 0; 
  }

  ngOnInit(): void {
    
    const idViaje = this.route.snapshot.paramMap.get('cod'); // Usando 'cod' como parámetro

    if (idViaje) {
      this.viajeDataService.currentViajes.subscribe(viajes => {
        this.viajeSeleccionado = viajes.find(viaje => viaje.idViaje === Number(idViaje)) || null;
      });
    } else {
      console.error('No se pasó el ID del viaje en la URL');
    }
  }
  actualizarDatosPasajero(index: number, datos: any) {
    this.pasajerosData[index] = datos;
  }

  continuarConElPago() {
    
    if(this.loginService.isLoggedIn()) { 
      if (
        this.pasajerosData.length !== this.cantidadAsientos ||
        this.pasajerosData.some(p => !p.numDocumento || !p.nombres || !p.apellidos || !p.fecNacimiento)
      ) {
  
        this.validator.tarjeta('Por favor, complete todos los datos de los pasajeros.',false)
        return;
      }

    }else{
      this.validator.tarjeta('Debe iniciar sesion para continuar',false)
      return;
    }
   
  
    // Lógica para continuar con el proceso de pago o enviar los datos al backend
    console.log('Datos que se están enviando:', {
      pasajerosData: this.pasajerosData, 
      viajeSeleccionado: this.viajeSeleccionado,       
      cantidadAsientos: this.cantidadAsientos, 
      asientosSeleccionados: this.asientosSeleccionados
    });
    
    this.router.navigate(['/menu-pago'], { 
      state: { 
        pasajerosData: this.pasajerosData, 
        viajeSeleccionado: this.viajeSeleccionado,       
        cantidadAsientos: this.cantidadAsientos, 
        asientosSeleccionados: this.asientosSeleccionados ,
        precioTotal: this.totalAPagar
      } 
    });
    
  }
}
