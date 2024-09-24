import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../Services/cliente.service';
import { Cliente } from '../../Interfaces/Cliente';
import { DniService } from '../../Services/dni.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  
  public formBuild = inject(FormBuilder);
  private router = inject(Router);
  private clienteService = inject(ClienteService);
  private dniService = inject(DniService);

  // Añadir la propiedad para manejar mensajes de error
  errorMessage: string = '';

  registerForm = this.formBuild.group({
    dni: ['', Validators.required],
    apellidos: ['', Validators.required],
    nombres: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmarPassword: ['', Validators.required]
  });

  get dni() {
    return this.registerForm.controls.dni;
  }

  get nombres() {
    return this.registerForm.controls.nombres;
  }

  get apellidos() {
    return this.registerForm.controls.apellidos;
  }

  get correo() {
    return this.registerForm.controls.correo;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get confirmarPassword() {
    return this.registerForm.controls.confirmarPassword;
  }

  registrar() {
    if (this.registerForm.valid) {
      const formData: Cliente = {
        idPersona: 0, // Ajusta estos valores según corresponda       
        numDocumento: Number(this.registerForm.value.dni),
        nombres: this.registerForm.value.nombres ?? '',
        apellidos: this.registerForm.value.apellidos ?? '',
        estadoCivil: '',
        direccion: '',
        numTel: '',
        fechaNac: new Date(), // Ajusta según corresponda
        fechaCreacion: new Date(),
        correo: this.registerForm.value.correo ?? '',
        password: this.registerForm.value.password ?? '',
        estadoCliente: { idEstadoCliente: 1, estado: 'Activo' } // Ajusta según corresponda
      };
      // registra antiguo
      // this.clienteService.registrar(formData).subscribe({
      //   next: (response) => {
      //     console.log('Registro exitoso:', response);
      //     // Redirige al login después del registro exitoso
      //     this.router.navigate(['/login']);
      //   },
      //   error: (error) => {
      //     console.error('Error al registrar cliente', error);
      //     this.errorMessage = 'Error al registrar cliente';
      //   }
      // });
      this.clienteService.enviarCodigo(formData).subscribe({
        next: (response) => {
          console.log('Codigo enviado correctamente:', response);
          // Redirige al login después del registro exitoso
            this.validarCodigo();
          // this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error Codigo :', error);
          this.errorMessage = 'Error al registrar cliente';
        }
      });
    }else{
      console.log('formulario no valido')
    }
    
  }

  consultarDni() {
    const dniValue = this.dni?.value ?? '';
    let dniVacio = !dniValue || dniValue.trim() === '';

    if (!dniVacio) {
      this.dniService.consultarDni(dniValue).subscribe(
        (data) => {
          // Llenar campos del formulario con los datos recibidos
          this.registerForm.patchValue({
            nombres: data.nombres ?? '',
            apellidos: data.apellidoPaterno + " " + data.apellidoMaterno,
          });
        },
        (error) => {
          console.error('Error al consultar DNI', error);
          this.errorMessage = 'No se pudo consultar el DNI. Intente nuevamente.';
        }
      );
    }
  }

//   validarCodigo() {
//     Swal.fire({
//         title: "Ingresa el código de verificación",
//         input: "text",
//         inputAttributes: {
//             autocapitalize: "off"
//         },
//         showCancelButton: true,
//         confirmButtonText: "Verificar",
//         showLoaderOnConfirm: true,
//         preConfirm: async (codigo) => {
//             try {
//                 // Llamamos a tu servicio para validar el código
//                 const response = await this.clienteService.validarCodigo(this.registerForm.value.correo ?? '', codigo).toPromise();
//                 return response;  // Si la verificación es exitosa, se retorna la respuesta
//             } catch (error) {
//                 // Mostrar el mensaje de error directamente
//                 console.log(error)
//                 Swal.showValidationMessage(`
//        Codigo incorrecto: ${error}
//       `);
//             }
//         },
//         allowOutsideClick: () => !Swal.isLoading()
//     }).then((result) => {
//         if (result.isConfirmed) {
//             Swal.fire({
//                 title: "¡Código validado!",
//                 text: result.value.message,
//                 icon: "success"
//             }).then(() => {
//               // Navegar a la ruta /login
//               this.router.navigate(['/login']);
//           });
//         } else if (result.dismiss === Swal.DismissReason.cancel) {
//             Swal.fire({
//                 title: "Validación cancelada",
//                 icon: "error"
//             });
//         }
//     });
// }
validarCodigo() {
  // Mostrar el SweetAlert inmediatamente
  Swal.fire({
      title: "Ingresa el código de verificación",
      input: "text",
      inputAttributes: {
          autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Verificar",
      allowOutsideClick: () => !Swal.isLoading()
  }).then(async (result) => {
      if (result.isConfirmed) {
          const codigo = result.value;
          // Mostrar un loading mientras validas el código
          Swal.fire({
              title: 'Validando...',
              didOpen: () => {
                  Swal.showLoading();
              }
          });

          try {
              const response = await this.clienteService.validarCodigo(this.registerForm.value.correo ?? '', codigo).toPromise();
              Swal.fire({
                  title: "¡Código validado!",
                  text: response.message,
                  icon: "success"
              }).then(() => {
                  this.router.navigate(['/login']);
              });
          } catch (error) {
              Swal.fire({
                  title: "Código incorrecto",
                  text: this.errorMessage,
                  icon: "error"
              });
          }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
              title: "Validación cancelada",
              icon: "error"
          });
      }
  });
}


}