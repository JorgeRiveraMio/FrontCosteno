import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Bus } from '../../Interfaces/Bus';
import { BusService } from '../../Services/bus.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-bus',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent {
  private busService = inject(BusService);
  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);

  buses: Bus[] = [];
  idEditado: number | null = null;
  filtro: string = "activo";
  searchTerm: string = '';

  modelosBus = [
    { modelo: 'A', capacidadPiso1: 30, capacidadPiso2: 25 },
    { modelo: 'B', capacidadPiso1: 40, capacidadPiso2: 30 },
    { modelo: 'C', capacidadPiso1: 35, capacidadPiso2: 20 }
  ];

  cambiarFiltro(filtro: string) {
    this.filtro = filtro;
    this.listar(this.filtro);
  }

  ngOnInit(): void {
    this.listar(this.filtro);
  }

  listar(filtro: string) {
    this.busService.listarBuses().subscribe((data: Bus[]) => {
        if (filtro === 'Activo') {
            this.buses = data.filter(bus => bus.estadoBus.estado === 'Activo');
        } else if (filtro === 'Inactivo') {
            this.buses = data.filter(bus => bus.estadoBus.estado === 'Inactivo');
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
    const selectElement = event.target as HTMLSelectElement; // Asegurarte de que es un HTMLSelectElement
    const modelo = selectElement.value; // Obtén el valor seleccionado

    const model = this.modelosBus.find(m => m.modelo === modelo); // Busca el modelo
    if (model) {
        this.busForm.patchValue({
            capacidadPiso1: model.capacidadPiso1.toString(), // Asigna la capacidad en el formulario
            capacidadPiso2: model.capacidadPiso2.toString()
        });
        this.busForm.get('capacidadPiso1')?.enable();
        this.busForm.get('capacidadPiso2')?.enable();
    }
}

  guardar() {
      if (this.busForm.valid) {
          const formData: Bus = {
              idBus: 0, // Este será generado por la base de datos
              nombre: this.busForm.get('nombre')?.value ?? '',
              placa: this.busForm.get('placa')?.value ?? '',
              modelo: this.busForm.get('modelo')?.value ?? '',
              capacidadPiso1: Number(this.busForm.get('capacidadPiso1')?.value ?? ''),
              capacidadPiso2: Number(this.busForm.get('capacidadPiso2')?.value ?? ''),
              estadoBus: {
                  idEstadoBus: 1, // Asegúrate de que esto se ajuste a tu lógica de estado
                  estado: 'Activo' 
              }
          };
          console.log('Datos a enviar:', formData);

          // Llamar al servicio para registrar el bus
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
                  }
              }
          });
      } else {
          console.log('Formulario inválido', this.busForm.errors);
          // Mostrar qué campos no cumplen
          Object.keys(this.busForm.controls).forEach(controlName => {
              const control = this.busForm.get(controlName);
              if (control && control.errors) {
                  console.log(`El campo ${controlName} tiene errores:`, control.errors);
              }
          });
      }
  }


  filtrarBuses() {
    this.busService.listarBuses().subscribe((data: Bus[]) => {
      let busesFiltrados = data;
      if (this.searchTerm) {
        busesFiltrados = data.filter(bus =>
          bus.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          bus.placa.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          bus.modelo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          bus.estadoBus.estado.toLowerCase().includes(this.searchTerm.toLowerCase())
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
