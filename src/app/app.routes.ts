import { Routes } from '@angular/router';
import { PrincipalComponent } from './Pages/principal/principal.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { PerfilComponent } from './Pages/perfil/perfil.component';
import { NuevaContrasenaComponent } from './Pages/nueva-contrasena/nueva-contrasena.component';
import { TerminalComponent } from './Pages/terminal/terminal.component';
import { ChoferComponent } from './Pages/chofer/chofer.component';
import { RutaComponent } from './Pages/ruta/ruta.component';

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
    { path: 'menus/rutas', component: RutaComponent },
    // { path: 'menus/viajes', component: MenusComponent },
 
    { path: 'menus/choferes', component: ChoferComponent },
    { path: 'menus/terminales', component: TerminalComponent }
    // { path: '', redirectTo: '/menus/buses', pathMatch: 'full' }, 
];
