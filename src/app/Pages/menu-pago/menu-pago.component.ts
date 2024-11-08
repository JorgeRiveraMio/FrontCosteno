import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



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
  cardForm!: FormGroup;
  tarjetaValor:boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {
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
  pagar(){
    if(this.tarjetaValor){
      this.correcto("Pago realizado con exito");
      this.tarjetaValor=false;
      
   }else
   {
    this.error("Falta ingresar metodo de pago");
   }
  }
}