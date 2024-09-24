import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ClienteService } from '../../Services/cliente.service';
import { Cliente } from '../../Interfaces/Cliente';
import { DniService } from '../../Services/dni.service';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  
  public formBuild = inject(FormBuilder);
  private router = inject(Router);
  private clienteService = inject(ClienteService);
  private dniService = inject(DniService);

  errorMessage: string = '';

  registerForm = this.formBuild.group({
    dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    apellidos: ['', Validators.required],
    nombres: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmarPassword: ['', Validators.required]
  }, { validators: this.passwordsMatchValidator });

  // Validadores personalizados
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmarPassword = form.get('confirmarPassword')?.value;
    return password === confirmarPassword ? null : { mismatch: true };
  }

  // Getter para facilitar el acceso a los controles del formulario
  get dni() {
    return this.registerForm.get('dni');
  }
  
  get nombres() {
    return this.registerForm.get('nombres');
  }

  get apellidos() {
    return this.registerForm.get('apellidos');
  }

  get correo() {
    return this.registerForm.get('correo');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmarPassword() {
    return this.registerForm.get('confirmarPassword');
  }

  registrar() {
    if (this.registerForm.valid) {
      const formData: Cliente = {
        idPersona: 0,
        numDocumento: Number(this.dni?.value),
        nombres: this.nombres?.value ?? '',
        apellidos: this.apellidos?.value ?? '',
        estadoCivil: '',
        direccion: '',
        numTel: '',
        fechaNac: new Date(),
        fechaCreacion: new Date(),
        correo: this.correo?.value ?? '',
        password: this.password?.value ?? '',
        estadoCliente: { idEstadoCliente: 1, estado: 'Activo' }
      };

      this.clienteService.enviarCodigo(formData).subscribe({
        next: (response) => {
          console.log('Código enviado correctamente:', response);
          this.validarCodigo();
        },
        error: (error) => {
          console.error('Error al enviar el código:', error);
          this.errorMessage = 'Error al registrar cliente';
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  consultarDni() {
    const dniValue = this.dni?.value ?? '';
    if (dniValue.trim()) {
      this.dniService.consultarDni(dniValue).subscribe(
        (data) => {
          this.registerForm.patchValue({
            nombres: data.nombres ?? '',
            apellidos: `${data.apellidoPaterno} ${data.apellidoMaterno}`
          });
        },
        (error) => {
          console.error('Error al consultar DNI', error);
          this.errorMessage = 'No se pudo consultar el DNI. Intente nuevamente.';
        }
      );
    }
  }

  validarCodigo() {
    Swal.fire({
      title: 'Ingresa el código de verificación',
      input: 'text',
      inputAttributes: { autocapitalize: 'off' },
      showCancelButton: true,
      confirmButtonText: 'Verificar',
      allowOutsideClick: () => !Swal.isLoading()
    }).then(async (result) => {
      if (result.isConfirmed) {
        const codigo = result.value;
        Swal.fire({
          title: 'Validando...',
          didOpen: () => Swal.showLoading()
        });

        try {
          const response = await this.clienteService.validarCodigo(this.correo?.value ?? '', codigo).toPromise();
          Swal.fire({
            title: '¡Código validado!',
            text: response.message,
            icon: 'success'
          }).then(() => this.router.navigate(['/login']));
        } catch (error) {
          Swal.fire({
            title: 'Código incorrecto',
            text: this.errorMessage,
            icon: 'error'
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Validación cancelada',
          icon: 'error'
        });
      }
    });
  }
}
