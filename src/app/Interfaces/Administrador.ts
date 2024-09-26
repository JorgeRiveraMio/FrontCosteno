import { EstadoAdministrador } from "./EstadoAdministrador";
import { Persona } from "./Persona";

export interface Administrador extends Persona{
    correo:string;
    password:string;
    estadoAdministrador:EstadoAdministrador;
}