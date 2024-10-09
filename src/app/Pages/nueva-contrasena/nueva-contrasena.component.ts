import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../Services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-contrasena',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './nueva-contrasena.component.html',
  styleUrl: './nueva-contrasena.component.css'
})
export class NuevaContrasenaComponent {
  public formBuild = inject(FormBuilder);
  private router = inject(Router);
  private clienteService = inject(ClienteService);
  private route =inject(ActivatedRoute)
  email: string = '';
  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email') ?? ''; // Captura el email
    console.log('Correo recibido:', this.email);
  }
  contrasenaForm = this.formBuild.group({  
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmarPassword: ['', Validators.required]
  }, { validators: this.passwordsMatchValidator });




  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmarPassword = form.get('confirmarPassword')?.value;
    return password === confirmarPassword ? null : { mismatch: true };
  }
  get password() {
    return this.contrasenaForm.get('password');
  }

  get confirmarPassword() {
    return this.contrasenaForm.get('confirmarPassword');
  }
  cambiarContrasena(){
    if(this.contrasenaForm.valid){
      this.clienteService.actualizarContrasena(this.password?.value, this.email).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          if (response.isSuccess) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Contraseña actualizada correctamente",
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/login']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo actualizar la contraseña. Por favor, inténtalo nuevamente.'
            });
          }
        },
        error: (error) => {
          console.error('Error al actualizar la contraseña:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error al actualizar la contraseña. Por favor, intenta nuevamente.'
          });
        }
      });
      
    }
  }

}
