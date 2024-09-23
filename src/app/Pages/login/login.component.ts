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

  login(){
   if(this.formLogin.valid){
    const {username,password}=this.formLogin.value
    this.loginService.login(username ?? '',password ?? '' ).subscribe(
      {
        next:(response)=>{
             // Aquí obtienes el token
             console.log('Token JWT:', response.token);
             // Guarda el token en sessionStorage o localStorage si es necesario
             sessionStorage.setItem('token', response.token);
             // Redirigir a otra página si es necesario
             this.router.navigate(['/']);
        },
        error:(error)=>{
          console.error('Error durante el login', error);
        }
      }
    )
   }
  }
  registrarse(){
    this.router.navigate(['registro']);
  }
}
