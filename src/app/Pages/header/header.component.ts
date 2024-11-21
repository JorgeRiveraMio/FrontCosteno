import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  isAdmin: boolean = false; // Nueva propiedad para determinar si es admin
  loginService = inject(LoginService);
  router = inject(Router);
  isLogged: boolean = false;


  constructor() {
    this.isLogged = this.loginService.isLoggedIn();

    const data = this.loginService.getUser();
    if (data != null) {
      this.nombreUsuario = this.getFirstName(data.nombres);
      this.isAdmin = (this.loginService.getUserRole() === 'administrador') ? true : false;


      console.log(data.rol + ' ' + this.loginService.getUserRole());
    }
  }

  private getFirstName(fullName: string): string {
    return fullName.split(' ')[0]; // Dividir por espacio y tomar el primer elemento
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
  // Emitir el evento de cambio de vista al componente padre (MenusComponent)
  @Output() viewChange: EventEmitter<string> = new EventEmitter<string>();

  // Método para cambiar la vista y emitir el evento
  cambiarVista(view: string): void {
    this.viewChange.emit(view); // Emitir el nombre de la vista seleccionada
    //console.log(view);
  }
  misViajes() {
    this.router.navigate(['/login']);
  }
  
}
