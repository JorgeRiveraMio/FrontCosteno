import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { ChoferService } from '../../Services/chofer.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chofer } from '../../Interfaces/Chofer';
import bootstrap from 'bootstrap';

@Component({
  selector: 'app-chofer',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './chofer.component.html',
  styleUrls: ['./chofer.component.css'] // Corregido a styleUrls
})
export class ChoferComponent implements OnInit {
  private choferService = inject(ChoferService);
  private formBuild = inject(FormBuilder);
  
  choferes: Chofer[] = [];
  idEditado: number | null = null;

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.choferService.listarChoferes().subscribe((data: Chofer[]) => {
      this.choferes = data;
      console.log(this.choferes); // Asegúrate de que muestre los datos correctamente
    }, error => {
      console.error('Error al listar los choferes:', error); // Manejar el error
    });
  }

  choferForm = this.formBuild.group({
    numDocumento: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    estadoCivil: ['', Validators.required],
    direccion: ['', Validators.required],
    numTel: ['', Validators.required],
    fechaNac: ['', Validators.required], // Será convertido a 'yyyy-MM-dd'
    fechaLicencia: ['', Validators.required], // Será convertido a 'yyyy-MM-dd'
    licenciaConducir: ['', Validators.required],
    estado: [false, Validators.required],
  });

  guardar() {
    if (this.choferForm.valid) {
      const formData: Chofer = {
        idPersona: 0,  // Ajustar este valor según tu lógica
        numDocumento: Number(this.choferForm.get('numDocumento')?.value) ?? 0, // Convertir a número
        nombres: this.choferForm.get('nombres')?.value ?? '',
        apellidos: this.choferForm.get('apellidos')?.value ?? '',
        estadoCivil: this.choferForm.get('estadoCivil')?.value ?? '',
        direccion: this.choferForm.get('direccion')?.value ?? '',
        numTel: this.choferForm.get('numTel')?.value ?? '',
        fechaNac: new Date(this.choferForm.get('fechaNac')?.value ?? ''), // Convertir a Date
        fechaCreacion: new Date(),  // Fecha actual para la creación
        fechaLicencia: new Date(this.choferForm.get('fechaLicencia')?.value ?? ''), // Convertir a Date
        licenciaConducir: this.choferForm.get('licenciaConducir')?.value ?? '',
        estado: this.choferForm.get('estado')?.value ?? false,
      };
      console.log('Datos a enviar:', formData);
      if (this.idEditado != null) {
        // Se edita el chofer
        this.choferService.actualizarChofer(this.idEditado, formData).subscribe({
          next: (response) => {
            console.log('Chofer actualizado correctamente', response);
            this.listar();  // Volver a listar los choferes
          },
          error: (error) => {
            console.error('Error al actualizar el chofer', error);
          }
        });
      } else {
        // Se registra un nuevo chofer
        this.choferService.registrarChofer(formData).subscribe({
          next: (response) => {
            console.log('Chofer registrado correctamente', response);
            this.listar();  // Volver a listar los choferes
          },
          error: (error) => {
            console.error('Error al registrar el chofer', error);
          }
        });
      }
    }
  }

  editar(id: number) {
    console.log(id);
    this.idEditado = id;
    this.choferService.buscarChofer(id).subscribe({
      next: (chofer: Chofer) => {
        console.log('Chofer encontrado', chofer);
        console.log('Fecha de Nacimiento:', chofer.fechaNac, typeof chofer.fechaNac);
        console.log('Fecha de Licencia:', chofer.fechaLicencia, typeof chofer.fechaLicencia);

        // Asegúrate de que las fechas son objetos Date antes de convertirlas a string
        const fechaNac = chofer.fechaNac instanceof Date ? chofer.fechaNac : new Date(chofer.fechaNac);
        const fechaLicencia = chofer.fechaLicencia instanceof Date ? chofer.fechaLicencia : new Date(chofer.fechaLicencia);
        
        // Convertir fechas a string en formato 'yyyy-MM-dd' para el input de tipo 'date'
        const fechaNacString = fechaNac ? fechaNac.toISOString().split('T')[0] : '';
        const fechaLicenciaString = fechaLicencia ? fechaLicencia.toISOString().split('T')[0] : '';

        // Llenar los valores del formulario con los datos del chofer encontrado
        this.choferForm.patchValue({
          numDocumento: chofer.numDocumento.toString(),  // Convertir número a string para el input
          nombres: chofer.nombres,
          apellidos: chofer.apellidos,
          estadoCivil: chofer.estadoCivil,
          direccion: chofer.direccion,
          numTel: chofer.numTel,
          fechaNac: fechaNacString,  // Convertido a string
          fechaLicencia: fechaLicenciaString,  // Convertido a string
          licenciaConducir: chofer.licenciaConducir,
          estado: chofer.estado,
        });
      },
      error: (error) => {
        console.error('Error al buscar el chofer', error);
      }
    });
  }
  

  darDeBaja(id: number) {
    const nuevoEstado = false; // Cambiar a inactivo
    this.choferService.cambiarEstadoChofer(id, nuevoEstado).subscribe({
        next: (response) => {
            console.log(response);
            this.listar(); // Vuelve a listar los choferes para reflejar el cambio
        },
        error: (error) => {
            console.error('Error al cambiar el estado del chofer', error);
        }
    });
}
}
