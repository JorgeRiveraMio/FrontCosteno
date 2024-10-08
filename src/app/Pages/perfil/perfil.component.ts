import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../Services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../../Interfaces/Cliente';
import { LoginService } from '../../Services/login.service';
import { DatePipe } from '@angular/common';


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
  private loginService = inject(LoginService);
  private datePipe=inject(DatePipe);
  public fechaCreacionFormateada: string | null = null;
  data = this.loginService.getUser();



  public fechaCreacion = this.data?.fechaCreacion ?? null;
  ngOnInit() {

    // Formatear la fecha de creación cuando el componente se inicializa
    if (this.data) {
      //cargar datos en mi perfil en caso exista
      // let  estadoCivil=this.data.estadoCivil
      // let   direccion=this.data.direccion
      // let  numTel=this.data.numero
      //   let fechaNac= new Date( this.data.fechaNacimiento)      
      // let password=this.data.contrasena

      fechaCreacion:this.data.fechaCreacion,
     
      this.fechaCreacionFormateada = this.datePipe.transform(this.fechaCreacion, 'MMMM d, y');
    }
  }
  perfilForm = this.formBuild.group({
    // estadoCivil: ['', Validators.required],
    // direccion: ['', Validators.required],
    // numero: ['', [Validators.required, Validators.pattern('[0-9]*')]], // Solo números
    // fechaNacimiento: ['', Validators.required],
    // contrasena: ['', [Validators.required, Validators.minLength(6)]], // Mínimo 6 caracteres
    estadoCivil: [this.data?.estadoCivil || '', Validators.required],
    direccion: [this.data?.direccion || '', Validators.required],
    numero: [this.data?.numTel || '', [Validators.required, Validators.pattern('[0-9]*')]], // Solo números
    fechaNacimiento: [new Date(this.data?.fechaNac )|| '', Validators.required],
    // contrasena: ['', [Validators.required, Validators.minLength(6)]], 
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

  // get contrasena() {
  //   return this.perfilForm.get('contrasena');
  // }

  actualizar(){
  
    console.log(this.data);
    if(this.perfilForm.valid){
       
       const formData: Cliente = {      
        idPersona:this. data.idPersona,
        numDocumento: this.data.numDocumento,
        nombres:  this.data.nombres ,
        apellidos: this.data.apellidos ,
        estadoCivil: this.estadoCivil?.value ?? '',
        direccion:this.direccion?.value ?? '',
        numTel:this.numero?.value ?? '',
        fechaNac: new Date( this.fechaNacimiento?.value ?? ''),
        fechaCreacion:this.data.fechaCreacion,
        correo:this.data.correo,
        password:this.data.contrasena,
        estadoCliente: { idEstadoCliente: 1, estado: 'Activo' }
       
       };
       this.clienteService.actualizarCliente(this.data.idPersona, formData).subscribe({
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
