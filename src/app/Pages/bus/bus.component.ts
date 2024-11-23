import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Bus } from '../../Interfaces/Bus';
import { BusService } from '../../Services/bus.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../Services/login.service';

import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-bus',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent {
  private busService = inject(BusService);
  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);

  buses: Bus[] = [];
  idEditado: number | null = null;
  filtro: string = "ACTIVO";
  searchTerm: string = '';

  // Propiedades para la paginación
  p: number = 1; // Página actual
  itemsPerPage: number = 10; // Número de elementos por página

  modelosBus = [
    { modelo: 'Costeño Ejecutivo', capacidadPiso1: 18, capacidadPiso2: 40 },
    { modelo: 'Costeño VIP', capacidadPiso1: 11, capacidadPiso2: 23 },
    { modelo: 'Costeño Premium', capacidadPiso1: 10, capacidadPiso2: 23 }
  ];

  cambiarFiltro(filtro: string) {
    this.filtro = filtro;
    this.p = 1; // Reiniciar la página a la primera
    this.listar(this.filtro);
  }

  ngOnInit(): void {
    this.listar(this.filtro);
  }

  listar(filtro: string) {
    this.busService.listarBuses().subscribe((data: Bus[]) => {
        if (filtro === 'ACTIVO') {
            this.buses = data.filter(bus => bus.estadoBus.estado === filtro);
        } else if (filtro === 'INACTIVO') {
            this.buses = data.filter(bus => bus.estadoBus.estado === 'INACTIVO');
        } else {
            this.buses = data;
        }
    }, error => {
        console.error('Error al listar los buses:', error);
    });
}

  busForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    placa: ['', Validators.required],
    modelo: ['', Validators.required],
    capacidadPiso1: [{ value: '', disabled: true }, Validators.required],
    capacidadPiso2: [{ value: '', disabled: true }, Validators.required]
  });

  onModeloChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; 
    const modelo = selectElement.value; 

    const model = this.modelosBus.find(m => m.modelo === modelo); 
    if (model) {
        this.busForm.patchValue({
            capacidadPiso1: model.capacidadPiso1.toString(), 
            capacidadPiso2: model.capacidadPiso2.toString()
        });
        this.busForm.get('capacidadPiso1')?.enable();
        this.busForm.get('capacidadPiso2')?.enable();
    }
}

guardar() {
  console.log(this.busForm.value); 
  if (this.busForm.valid) {
      const formData: Bus = {
          idBus: 0, 
          nombre: this.busForm.get('nombre')?.value ?? '',
          placa: this.busForm.get('placa')?.value ?? '',
          modelo: this.busForm.get('modelo')?.value ?? '',
          capacidadPiso1: Number(this.busForm.get('capacidadPiso1')?.value ?? ''),
          capacidadPiso2: Number(this.busForm.get('capacidadPiso2')?.value ?? ''),
          estadoBus: {
              idEstadoBus: 1, 
              estado: 'ACTIVO' 
          }
      };

      console.log('Datos a enviar:', formData);

      this.busService.registrarBus(formData).subscribe({
          next: (response) => {
              console.log('Bus registrado correctamente', response);
              this.listar(this.filtro);
              this.alertaCorrecto();
          },
          error: (error) => {
              console.error('No se registró correctamente el bus', error);
              if (error.error && error.error.message) {
                  Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: error.error.message 
                  });
              } else {
                  Swal.fire({
                      icon: 'error',
                      title: 'Error desconocido',
                      text: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
                  });
              }
          }
      });
  } else {
      console.log('Formulario inválido', this.busForm.errors);
      Object.keys(this.busForm.controls).forEach(controlName => {
          const control = this.busForm.get(controlName);
          if (control && control.errors) {
              console.log(`El campo ${controlName} tiene errores:`, control.errors);
          }
      });
  }
}



  filtrarBuses() {
    this.p = 1; // Reiniciar la página a la primera
    this.busService.listarBuses().subscribe((data: Bus[]) => {
      let busesFiltrados = data;
      if (this.searchTerm) {
        busesFiltrados = data.filter(bus =>
          bus.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          bus.placa.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          bus.modelo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          bus.estadoBus.estado.toUpperCase().includes(this.searchTerm.toUpperCase())
        );
      }
      this.buses = busesFiltrados;
    }, error => {
      console.error('Error al listar los buses:', error);
    });
  }

  actualizarEstado(id: number) {
    this.busService.actualizarEstado(id).subscribe({
      next: (response) => {
        console.log('Estado actualizado correctamente', response);
        this.listar(this.filtro);
        this.alertaCorrecto();
      },
      error: (error) => {
        console.error('Error al actualizar el estado', error);
      }
    });
  }

  alertaCorrecto() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Operación realizada correctamente",
      showConfirmButton: false,
      timer: 1500
    });
  }
}
