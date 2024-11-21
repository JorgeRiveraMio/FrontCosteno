import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../Services/login.service';
import { BoletoService } from '../../Services/boleto.service';
import { AsientoService } from '../../Services/asiento.service';

@Component({
  selector: 'app-valida-pago',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule  ],
  templateUrl: './valida-pago.component.html',
  styleUrl: './valida-pago.component.css'
})
export class ValidaPagoComponent  implements OnInit{
  paymentStatus: string = '';  // Estado del pago
  message: string = '';  // Mensaje que se mostrará en la página
  private  boletoService= inject(BoletoService);
  private  loginService= inject(LoginService);
  private asientoService = inject(AsientoService);
  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      const status = params['status'];
      const collectionStatus = params['collection_status'];

      // Comprobar el estado del pago y mostrar el mensaje correspondiente
      if (status === 'approved' || collectionStatus === 'approved') {
        this.paymentStatus = 'Aprobado';
        this.message = 'El pago fue realizado con éxito.';
      } else if (status === 'pending' || collectionStatus === 'pending') {
        this.paymentStatus = 'Pendiente';
        this.message = 'El pago está pendiente de confirmación.';
      } else {
        this.paymentStatus = 'Fallido';
        this.message = 'Hubo un problema con el pago. Por favor, intente nuevamente.';
      }
    });
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      // Obtener los datos del localStorage
      const viajeData = localStorage.getItem('datosCompra');
     
      // Verificar si los datos existen en el localStorage
      if (viajeData) {
        const viaje = JSON.parse(viajeData);
        console.log('datos recibidos',viaje)
        // Iterar sobre los asientos seleccionados
        for (const idAsiento of viaje.asientosSeleccionados) {
          this.boletoService.registrarBoleto({
            idBoleto: 0,
            precio: viaje.viajeSeleccionado.precio,
            fechaEmision: new Date(),      
            horaEmision: new Date().toLocaleTimeString('en-GB'),
            idCliente: this.loginService.getUser().idPersona,
            idViaje: viaje.viajeSeleccionado.idViaje,
            idAsiento: parseInt(idAsiento),
            idBus: viaje.viajeSeleccionado.bus.idBus,
            idEstadoBoleto: 1
          }).subscribe({
            next: (response) => {
              console.log('Boleto registrado correctamente:', response);
            
      
              // Actualiza el estado del asiento a OCUPADO
              this.asientoService.actualizarEstadoAsiento(parseInt(idAsiento), 2).subscribe({
                next: () => {
                  console.log(`Asiento ${idAsiento} actualizado a OCUPADO`);
                },
                error: (error) => {
                  console.error(`Error al actualizar el estado del asiento ${idAsiento}:`, error);
                }
              });
      
            
            },
            error: (error) => {
              console.error('Error al registrar el boleto:', error);
             
            }
          });
          
          console.log("idAsiento :" + idAsiento);
             // Una vez procesado el pago y registrado el boleto, eliminamos los datos del viaje del localStorage
      // localStorage.removeItem('datosCompra');
      console.log('Datos del viaje eliminados del localStorage');
        }
      } else {
        console.log('No se encontraron datos del viaje en el localStorage');
      }
    } else {
      console.log('localStorage no está disponible');
    }

    }
    navigateToHome() {
      this.router.navigate(['/']);
    }
    
    navigateToMisViajes() {
      this.router.navigate(['/mis-viajes']);
    }
  }

