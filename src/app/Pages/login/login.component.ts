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
import { response } from 'express';

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

  // login(){
  //  if(this.formLogin.valid){
  //   const {username,password}=this.formLogin.value
  //   this.loginService.login(username ?? '',password ?? '' ).subscribe(
  //     {
  //       next:(response)=>{
  //            console.log('Respuesta completa:', response); // Agrega esta línea para ver toda la respuesta
  //            // Aquí obtienes el token
  //             console.log('Token JWT:', response.token);
  //            // Guarda el token en sessionStorage o localStorage si es necesario
  //           // sessionStorage.setItem('token',response.token);
  //           this.loginService.loginUser(response.token)
  //             // Verifica que el token se haya almacenado correctamente
  //             //console.log('Token almacenado en sessionStorage:', sessionStorage.getItem('token'));
  //            // Redirigir a otra página si es necesario
  //            console.log(this.loginService.getToken())
  //            this.router.navigate(['/']);
  //       },
  //       error:(error)=>{
  //         console.error('Error durante el login', error);
  //       }
  //     }
  //   )
  //  }
  // }

  //opcion 2
  login() {
    if (this.formLogin.valid) {
      const { username, password } = this.formLogin.value;
      this.loginService.login(username ?? '', password ?? '').subscribe({
        next: (response) => {
          console.log('Respuesta completa:', response); // Ver toda la respuesta
  
          // Asegúrate de que el token esté presente en la respuesta
          if (response.token) {
            console.log('Token JWT:', response.token);
            this.loginService.loginUser(response.token); // Llama al método para almacenar el token
          } else {
            console.error('Token no encontrado en la respuesta');
          }
  
          // Redirigir a otra página si es necesario
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error durante el login', error);
        },
      });
    }
  }
  registrarse(){
    this.router.navigate(['registro']);
  }
}
