import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../Services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../../Interfaces/Cliente';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})

export class PerfilComponent {
  public formBuild = inject(FormBuilder);
  private router = inject(Router);
  private clienteService = inject(ClienteService);
  loginService = inject(LoginService);
  
  perfilForm = this.formBuild.group({
    estadoCivil: ['', Validators.required],
    direccion: ['', Validators.required],
    numero: ['', [Validators.required, Validators.pattern('[0-9]*')]], // Solo números
    fechaNacimiento: ['', Validators.required],
    contrasena: ['', [Validators.required, Validators.minLength(6)]], // Mínimo 6 caracteres
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

  get contrasena() {
    return this.perfilForm.get('contrasena');
  }

  actualizar(){
    const data = this.loginService.getUser();
    console.log(data);
    if(this.perfilForm.valid){
     
       const formData: Cliente = {      
        idPersona: data.idPersona,
        numDocumento: data.numDocumento,
        nombres:  data.nombres ,
        apellidos: data.apellidos ,
        estadoCivil: this.estadoCivil?.value ?? '',
        direccion:this.direccion?.value ?? '',
        numTel:this.numero?.value ?? '',
        fechaNac: new Date( this.fechaNacimiento?.value ?? ''),
        fechaCreacion:data.fechaCreacion,
        correo:data.correo,
        password:this.contrasena?.value ?? '',
        estadoCliente: { idEstadoCliente: 1, estado: 'Activo' }
       
       };
       this.clienteService.actualizarCliente(data.idPersona, formData).subscribe({
        next: (response) => {
          console.log('Cliente actualizado correctamente:', response);
          this.router.navigate(['/perfil']);
        },
        error: (error) => {
          console.error('Error al actualizar el cliente', error);
        }
       })
       console.log(formData);
    }
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
