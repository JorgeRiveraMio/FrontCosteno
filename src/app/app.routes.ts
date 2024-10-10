import { Routes } from '@angular/router';
import { PrincipalComponent } from './Pages/principal/principal.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { PerfilComponent } from './Pages/perfil/perfil.component';
import { MenusComponent } from './Pages/menus/menus.component';
import { NuevaContrasenaComponent } from './Pages/nueva-contrasena/nueva-contrasena.component';
import { TerminalComponent } from './Pages/terminal/terminal.component';

export const routes: Routes = [
    {
        path: '',
        component: PrincipalComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'nuevaContrasena',
        component: NuevaContrasenaComponent
    },
    {
        path: 'registro',
        component: RegistroComponent
    },
    {
        path: 'perfil',
        component: PerfilComponent
    },
    // { path: 'menus/buses', component: MenusComponent },
    // { path: 'menus/rutas', component: MenusComponent },
    // { path: 'menus/viajes', component: MenusComponent },
    // { path: 'menus/choferes', component: MenusComponent },
    { path: 'menus/terminales', component: TerminalComponent },
    // { path: '', redirectTo: '/menus/buses', pathMatch: 'full' }, 
];
