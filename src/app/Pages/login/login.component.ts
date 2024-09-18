import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
//import { AccesoService } from '../../Services/acceso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../Interfaces/Login';
import { error } from 'console';


import { CommonModule } from '@angular/common';

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
   
  }
  registrarse(){
    this.router.navigate(['registro']);
  }
}
