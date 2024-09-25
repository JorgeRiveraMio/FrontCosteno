import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { error } from 'console';
import { LoginService } from '../../Services/login.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent {
 
  nombreUsuario: string | null = null;
  loginService= inject(LoginService);
  router =inject(Router);
  isLogged: boolean = false;
  constructor(){
    this.isLogged =this.loginService.isLoggedIn()
    //Obtener los datos del usuario

    const data = this.loginService.getUser();
    if (data != null) {
    // Aquí puedes realizar alguna acción con los datos del usuario
      this.nombreUsuario =this.getFirstName( data.nombres); 
    }
  }
  
  private getFirstName(fullName: string): string {
      return fullName.split(' ')[0]; // Dividir por espacio y tomar el primer elemento
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);  
  }
  
}
