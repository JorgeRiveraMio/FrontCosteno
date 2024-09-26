import { Routes } from '@angular/router';
import { PrincipalComponent } from './Pages/principal/principal.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { PerfilComponent } from './Pages/perfil/perfil.component';
import { BusesComponent } from './Pages/buses/buses.component';
import { RutasComponent } from './Pages/rutas/rutas.component';

export const routes: Routes = [
    {
        path:"",
        component:PrincipalComponent
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"registro",
        component:RegistroComponent
    },
    {
        path:"perfil",
        component: PerfilComponent
    },
    
    {
        path:"buses",
        component: BusesComponent
    },

    {
        path:"rutas",
        component: RutasComponent
    }

];
