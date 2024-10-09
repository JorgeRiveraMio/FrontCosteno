import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
//import { AccesoService } from '../../Services/acceso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../Interfaces/Login';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule,CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  loginError:string="";
  public formBuild=inject(FormBuilder);
  private router = inject(Router);
  private loginService=inject(LoginService);
  public usuario:any;  
  formLogin = this.formBuild.group({
    username: ['',[Validators.required,Validators.email] ],
    password: ['', Validators.required]
  })

  get email(){
    return this.formLogin.controls.username;
  }
  get password(){
    return this.formLogin.controls.password;
  }

  login(){
    if(this.formLogin.valid){
  
    const {username,password}=this.formLogin.value
    this.loginService.login(username ?? '',password ?? '' ).subscribe(
      {
        next:(response)=>{
             console.log('Respuesta completa:', response); // Agrega esta línea para ver toda la respuesta
             // Aquí obtienes el token
              console.log('Token JWT:', response.token);
             // Guarda el token en sessionStorage o localStorage si es necesario       
            this.loginService.loginUser(response.token)
           
             console.log(this.loginService.getToken())

             this.loginService.getCurrentUser().subscribe((user: any) => {
                this.loginService.setUser(user);
                console.log(user);
                this.usuario=user; 
                const roles = this.usuario.authorities.map((auth: any) => auth.authority); // Accede a los roles    const roles = this.usuario.authorities.map(auth => auth.authority); // Accede a los roles
                console.log(roles);
              
               if(roles == "cliente"){
                this.loginService.setUserRole("cliente");
                this.router.navigate(['/']);
                this.loginService.loginStatusSubject.next(true);
              }
              else if(roles == "administrador"){
                this.loginService.setUserRole("administrador");
                this.router.navigate(['/']);
                this.loginService.loginStatusSubject.next(true);
              }
              else{
              this.loginService.logout();
              }
            })
             
        },
        error:(error)=>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Contraseña Incorrecta",
           
          });
          //console.error('Error durante el login', error);
        }
      }
    )
   }
  }


  registrarse(){
    this.router.navigate(['registro']);
  }
  cambiarContrasena(){
    const email = this.formLogin.get('username')?.value;
    this.router.navigate(['nuevaContrasena', { email }]); 
  }
}
