import { EstadoCliente } from "./EstadoCliente";
import { Persona } from "./Persona";

export interface Cliente extends Persona{
    correo:string;
    password:string;
    estadoCliente:EstadoCliente;
}