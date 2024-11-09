import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../Services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../../Interfaces/Cliente';
import { LoginService } from '../../Services/login.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


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
       
   
        this.perfilForm.patchValue({
          estadoCivil: this.data.estadoCivil || '',
          direccion: this.data.direccion || '',
          numero: this.data.numTel || '',
          fechaNacimiento: new Date(this.data.fechaNac) || ''
      });
      
      fechaCreacion:this.data.fechaCreacion
     
      this.fechaCreacionFormateada = this.datePipe.transform(this.fechaCreacion, 'MMMM d, y');
    }
  }
  perfilForm = this.formBuild.group({
 
    estadoCivil: [this.data?.estadoCivil || '', Validators.required],
    direccion: [this.data?.direccion || '', Validators.required],
    numero: [this.data?.numTel || '', [Validators.required, Validators.pattern('[0-9]*')]], // Solo números
    fechaNacimiento: [new Date(this.data?.fechaNac )|| '', Validators.required],

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
        estadoCliente: { idEstadoCliente: 1 }
       
       };
       //se actualiza el token
       this.clienteService.actualizarCliente(this.data.idPersona, formData).subscribe({
        next: (response) => {
          console.log('Cliente actualizado correctamente:', response);
          this.mensajeCorrecto()
            this.loginService.getCurrentUser().subscribe((user: any) => {
               this.loginService.setUser(user);
              console.log("nueva data");
              console.log(user);
          
          })
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

  mensajeCorrecto(){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Se actualizo correctamente",
      showConfirmButton: false,
      timer: 1500
    });
  }
}
