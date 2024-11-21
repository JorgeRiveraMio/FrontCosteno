import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClienteService } from '../../Services/cliente.service';
import { ValidacionesService } from '../../Services/validaciones.service'; // Importar el servicio

@Component({
  selector: 'app-nueva-contrasena',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './nueva-contrasena.component.html',
  styleUrls: ['./nueva-contrasena.component.css']
})
export class NuevaContrasenaComponent {
  public formBuild = inject(FormBuilder);
  private router = inject(Router);
  private clienteService = inject(ClienteService);
  private validacionesService = inject(ValidacionesService); // Inyectar el servicio
  correoForm: FormGroup;

  constructor() {
    this.correoForm = this.formBuild.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  get correo() {
    return this.correoForm.get('correo');
  }

  cambiarContrasena() {
    if (this.correoForm.valid) {
      const correo = this.correo?.value;

      this.clienteService.cambiarContrasena(correo).subscribe({
        next: (response) => {
          // Si la respuesta es exitosa (código 200)
          this.validacionesService.tarjeta('Se ha enviado una contraseña temporal al correo.', true);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al cambiar la contraseña:', error);
          // Verificar si el error es de tipo 400 (usuario no encontrado)
          if (error.status === 400) {
            this.validacionesService.tarjeta('No se encontró un usuario con ese correo.', false);
          } else {
            // Si ocurre otro tipo de error
            this.validacionesService.tarjeta('Ocurrió un error al intentar enviar la contraseña temporal.', false);
          }
        }
      });
    }
  }
}
