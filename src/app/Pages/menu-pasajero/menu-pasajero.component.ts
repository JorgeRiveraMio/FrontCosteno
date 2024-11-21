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
import { MercadoPagoService } from '../../Services/mercado-pago.service';
declare var MercadoPago: any;

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
  pasajerosData: any[] = [];
  pasajerosValidos = false;
  preferenceId: string | null = null;

  private validator = inject(ValidacionesService);
  private loginService = inject(LoginService);

  constructor(
    private router: Router,
    private viajeDataService: ViajeDataService,
    private route: ActivatedRoute,
    private mercadoPagoService: MercadoPagoService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.cantidadAsientos = navigation?.extras?.state?.['cantidadAsientos'] || 0;
    this.asientosSeleccionados = navigation?.extras?.state?.['asientosSeleccionados'] || [];
    this.totalAPagar = navigation?.extras?.state?.['precioTotal'] || 0;
  }

  ngOnInit(): void {
    const idViaje = this.route.snapshot.paramMap.get('cod');
    
    if (idViaje && !isNaN(Number(idViaje))) {
      this.viajeDataService.currentViajes.subscribe(viajes => {
        this.viajeSeleccionado = viajes.find(viaje => viaje.idViaje === Number(idViaje)) || null;
      });
      this.verificarEstadoPago();
    } else {
      console.error('No se pasó el ID del viaje en la URL o el ID es inválido');
    }
  }

  actualizarDatosPasajero(index: number, datos: any) {
    this.pasajerosData[index] = datos;
  }

  continuarConElPago() {
    if (!this.loginService.isLoggedIn()) {
      this.validator.tarjeta('Debe iniciar sesión para continuar', false);
      return;
    }

    if (
      this.pasajerosData.length !== this.cantidadAsientos ||
      this.pasajerosData.some(p => !p.numDocumento || !p.nombres || !p.apellidos || !p.fecNacimiento)
    ) {
      this.validator.tarjeta('Por favor, complete todos los datos de los pasajeros.', false);
      return;
    }
    console.log('Viaje error',this.viajeSeleccionado)
    this.pasajerosValidos = true;
    this.generarPreferencia();
  }

  generarPreferencia() {
    const compra = {
      nombre: 'Compra de boletos',
      descripcion: 'Boletos de viaje',
      cantidadBoletos: this.cantidadAsientos,
      precioTotal: this.totalAPagar,
      back_urls: {
        success: 'https://barbie-resident-fortune-push.trycloudflare.com',
        failure: 'https://tusitio.com/pago-fallido',
        pending: 'https://tusitio.com/pago-pendiente',
      },
      auto_return: 'approved'
    };

    const datosCompra = {
      pasajerosData: this.pasajerosData,
      viajeSeleccionado: this.viajeSeleccionado,
      cantidadAsientos: this.cantidadAsientos,
      asientosSeleccionados: this.asientosSeleccionados
    };

    this.mercadoPagoService.crearPreferencia(compra).subscribe(response => {
      this.preferenceId = response.id;
      if (this.preferenceId) {
        this.inicializarMercadoPago(this.preferenceId);
        localStorage.setItem('datosCompra', JSON.stringify(datosCompra));
      } else {
        console.error('Error: No se pudo obtener el preferenceId');
      }
    }, error => {
      console.error('Error al crear la preferencia:', error);
    });
  }

  inicializarMercadoPago(preferenceId: string) {
    // Verificar si el contenedor ya existe para evitar crear varios botones
    const container = document.getElementById('wallet_container');
    if (container) {
      // Si ya existe el contenedor, no hacer nada
      console.log('El botón de pago ya está inicializado.');
      return;
    }
  
    // Si el contenedor no existe, entonces crear el botón de pago
    const mp = new MercadoPago('APP_USR-7fc38130-5c0c-4c26-88d6-0dea162d9263');
    const bricksBuilder = mp.bricks();
  
    bricksBuilder.create('wallet', 'wallet_container', {
      initialization: { preferenceId: preferenceId },
      customization: { texts: { valueProp: 'Continuar con el Pago' } },
    }).catch((error: any) => {
      console.error('Error al inicializar Mercado Pago:', error);
    });
  }
  

  verificarEstadoPago() {
    this.route.queryParams.subscribe(params => {
      const paymentStatus = params['status'];
      const paymentId = params['payment_id'];
      const merchantOrderId = params['merchant_order_id'];

      if (paymentStatus) {
        if (paymentStatus === 'approved') {
          console.log('Pago aprobado', paymentId, merchantOrderId);
        } else if (paymentStatus === 'pending') {
          console.log('Pago pendiente', paymentId, merchantOrderId);
        } else if (paymentStatus === 'failure') {
          console.log('Pago fallido', paymentId, merchantOrderId);
        }
      }
    });
  }
}
