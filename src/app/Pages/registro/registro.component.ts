import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../Services/cliente.service';
import { Cliente } from '../../Interfaces/Cliente';
import { DniService } from '../../Services/dni.service';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, CommonModule], // Asegurarte de incluir CommonModule
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
    apellidos: [''],
    nombres: [''],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmarPassword: ['', Validators.required]
  }, { validators: this.passwordsMatchValidator });

  get dni() {
    return this.registerForm.controls['dni'];
  }

  get nombres() {
    return this.registerForm.controls['nombres'];
  }

  get apellidos() {
    return this.registerForm.controls['apellidos'];
  }

  get correo() {
    return this.registerForm.controls['correo'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmarPassword() {
    return this.registerForm.controls['confirmarPassword'];
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmarPassword = form.get('confirmarPassword')?.value;
    return password === confirmarPassword ? null : { mismatch: true };
  }

  registrar() {
    if (this.registerForm.valid) {
      const formData: Cliente = {
        idPersona: 0,
        numDocumento: Number(this.registerForm.value.dni),
        nombres: this.registerForm.value.nombres ?? '',
        apellidos: this.registerForm.value.apellidos ?? '',
        estadoCivil: '',
        direccion: '',
        numTel: '',
        fechaNac: new Date(),
        fechaCreacion: new Date(),
        correo: this.registerForm.value.correo ?? '',
        password: this.registerForm.value.password ?? '',
        estadoCliente: { idEstadoCliente: 1, estado: 'Activo' }
      };

      this.clienteService.registrar(formData).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al registrar cliente', error);
          this.errorMessage = 'Error al registrar cliente';
        }
      });
    } else {
      console.log('Formulario no válido');
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
}
