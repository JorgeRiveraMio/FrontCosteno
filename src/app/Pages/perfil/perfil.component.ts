import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../Services/cliente.service';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, FooterComponent, HeaderComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  public formBuild = inject(FormBuilder);
  private router = inject(Router);
  private clienteService = inject(ClienteService);
  private loginService = inject(LoginService);
  private datePipe = inject(DatePipe);
  
  public fechaCreacionFormateada: string | null = null;
  public data = this.loginService.getUser();
  
  public fechaCreacion = this.data?.fechaCreacion ?? null;

  ngOnInit() {
    if (this.data) {
      this.perfilForm.patchValue({
        estadoCivil: this.data.estadoCivil || '',
        direccion: this.data.direccion || '',
        numero: this.data.numTel || '',
        fechaNacimiento: new Date(this.data.fechaNac) || ''
      });
      this.fechaCreacionFormateada = this.datePipe.transform(this.fechaCreacion, 'MMMM d, y');
    }
  }

  perfilForm = this.formBuild.group({
    estadoCivil: [this.data?.estadoCivil || '', Validators.required],
    direccion: [this.data?.direccion || '', Validators.required],
    numero: [this.data?.numTel || '', [Validators.required, Validators.pattern('[0-9]*')]],
    fechaNacimiento: [new Date(this.data?.fechaNac) || '', Validators.required],
    
    nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
    confirmarContrasena: ['', Validators.required]
  });

  get estadoCivil() {
    return this.perfilForm.get('estadoCivil');
  }

  get direccion() {
    return this.perfilForm.get('direccion');
  }

  get numero() {
    return this.perfilForm.get('numero');
  }

  get fechaNacimiento() {
    return this.perfilForm.get('fechaNacimiento');
  }

  get nuevaContrasena() {
    return this.perfilForm.get('nuevaContrasena');
  }

  get confirmarContrasena() {
    return this.perfilForm.get('confirmarContrasena');
  }

  actualizar() {
    if (this.perfilForm.valid) {
      if (this.nuevaContrasena?.value !== this.confirmarContrasena?.value) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Las contraseñas no coinciden",
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }

      const formData = {
        ...this.data,
        password: this.nuevaContrasena?.value,  
      };

      
      this.clienteService.actualizarCliente(this.data.idPersona, formData).subscribe({
        next: (response) => {
          console.log('Cliente actualizado correctamente:', response);
          this.mensajeCorrecto();
          this.router.navigate(['/perfil']);
        },
        error: (error) => {
          console.error('Error al actualizar el cliente', error);
        }
      });
    }
  }

  mensajeCorrecto() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Se actualizó correctamente",
      showConfirmButton: false,
      timer: 1500
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
