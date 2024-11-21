import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BoletoService } from '../../Services/boleto.service';
import { LoginService } from '../../Services/login.service';
import { AsientoService } from '../../Services/asiento.service';
import { PasajeroService } from '../../Services/pasajero.service';


@Component({
  selector: 'app-menu-pago',
  standalone: true,
  imports: [HeaderComponent,FooterComponent, CommonModule,ReactiveFormsModule],
  templateUrl: './menu-pago.component.html',
  styleUrl: './menu-pago.component.css'
})
export class MenuPagoComponent implements OnInit {
  pasajerosData: any[] = [];
  viajeSeleccionado: any = {};
  cantidadAsientos: number = 0;
  asientosSeleccionados: string[] = [];
  private pasajeroService = inject(PasajeroService);
  cardForm!: FormGroup;
  tarjetaValor:boolean = false;
  subtotal: number = 0;
  precioTotal: number = 0;

  private  boletoService= inject(BoletoService);
  private  loginService= inject(LoginService);
  private asientoService = inject(AsientoService);
  constructor(private router: Router, private formBuilder: FormBuilder) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras?.state) {
      // Verificando los datos recibidos
      console.log('Datos recibidos desde la página anterior:', navigation.extras.state);

      this.pasajerosData = navigation.extras.state['pasajerosData'];
      this.viajeSeleccionado = navigation.extras.state['viajeSeleccionado'];
      this.cantidadAsientos = navigation.extras.state['cantidadAsientos'];
      this.asientosSeleccionados = navigation.extras.state['asientosSeleccionados'];
      this.subtotal= navigation.extras.state['precioTotal'];
      
      console.log('Pasajeros Data:', this.pasajerosData);
      console.log('Viaje Seleccionado:', this.viajeSeleccionado);
      console.log('Cantidad de Asientos:', this.cantidadAsientos);
      console.log('Asientos Seleccionados:', this.asientosSeleccionados);
    } else {
      console.error('No se recibieron datos desde la página anterior.');
    }
    this.precioTotal = Math.round(this.subtotal * 1.18 * 100) / 100;


  }

  

  ngOnInit(): void {
    this.cardForm = this.formBuilder.group({
      cardName: ['', Validators.required],  // Nombre en la tarjeta
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],  // 16 dígitos
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],  // MM/AA
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]  // Código CVV de 3 dígitos
    });
  }
  validar(){
    if(this.cardForm.valid){
        console.log('Datos correctos');
        this.correcto( "Se realizo el correcto pago");
        this.tarjetaValor=true;
        // this.cardForm.reset();
    }else{
      this.tarjetaValor=false;
      this.error("Los datos de la tarjeta son incorrectos");
    }
    
  }

  correcto(message?: string) {
    Swal.fire({
      position: "center",
      icon: "success",
      title : message ,
      showConfirmButton: false,
      timer: 1500
    });
  }
  error(message?: string){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message
    
    });
  }
  pagar() {
    if (this.tarjetaValor) {
      console.log("idCliente :" + this.loginService.getUser().idPersona);
      
      for (const idAsiento of this.asientosSeleccionados) {
        this.boletoService.registrarBoleto({
          idBoleto: 0,
          precio: this.viajeSeleccionado.precio,
          fechaEmision: new Date(),
      
          horaEmision: new Date().toLocaleTimeString('en-GB'),
          idCliente: this.loginService.getUser().idPersona,
          idViaje: this.viajeSeleccionado.idViaje,
          idAsiento: parseInt(idAsiento),
          idBus: this.viajeSeleccionado.bus.idBus,
          idEstadoBoleto: 1
        }).subscribe({
          next: (response) => {
            console.log('Boleto registrado correctamente:', response);
            this.correcto("Pago realizado con éxito");
  
          // Actualizar estado de los asientos a OCUPADO
          const asientoPromises = this.asientosSeleccionados.map((idAsiento) =>
            this.asientoService.actualizarEstadoAsiento(parseInt(idAsiento), 2).toPromise()
          );
  
          return Promise.all(asientoPromises);
        })
        .then(() => {
          console.log('Todos los asientos actualizados correctamente.');
          this.router.navigate(['/mis-viajes']);
        })
        .catch((error) => {
          console.error('Error en el proceso de pago:', error);
          this.error('Error en el proceso de pago');
        })
        .finally(() => {
          this.tarjetaValor = false;
        });
    } else {
      this.error('Falta ingresar método de pago');
    }
  }  
}

