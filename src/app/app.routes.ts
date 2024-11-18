import { Routes } from '@angular/router';
import { PrincipalComponent } from './Pages/principal/principal.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { PerfilComponent } from './Pages/perfil/perfil.component';
import { NuevaContrasenaComponent } from './Pages/nueva-contrasena/nueva-contrasena.component';
import { TerminalComponent } from './Pages/terminal/terminal.component';
import { ChoferComponent } from './Pages/chofer/chofer.component';
import { RutaComponent } from './Pages/ruta/ruta.component';
import { BusComponent } from './Pages/bus/bus.component';
import { ViajeComponent } from './Pages/viaje/viaje.component';
import { MenuRutasComponent } from './Pages/menu-rutas/menu-rutas.component';
import { DetalleViajeComponent } from './Pages/detalle-viaje/detalle-viaje.component';
import { PasajeroComponent } from './Pages/pasajero/pasajero.component';
import { MenuPasajeroComponent } from './Pages/menu-pasajero/menu-pasajero.component';
import { MenuPagoComponent } from './Pages/menu-pago/menu-pago.component';
import { MisViajesComponent } from './Pages/mis-viajes/mis-viajes.component';

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
    {
        path: 'rutas',
        component: MenuRutasComponent
    },
    { path: 'menus/buses', component: BusComponent},
    { path: 'menus/rutas', component: RutaComponent },
    { path: 'menus/viajes', component: ViajeComponent },
    { path: 'menus/choferes', component: ChoferComponent },
    { path: 'menus/terminales', component: TerminalComponent },
    { path: 'detalleViaje',component:DetalleViajeComponent },
    { path: 'pasajero/:cod', component:MenuPasajeroComponent},
    { path: 'menu-pago', component:MenuPagoComponent},
    { path: 'mis-viajes', component:MisViajesComponent},
    { path: 'pasajero/:cod/mis-viajes', component: MisViajesComponent },                                                                                                            
    { path: 'rutas/mis-viajes', component: MisViajesComponent },
];
