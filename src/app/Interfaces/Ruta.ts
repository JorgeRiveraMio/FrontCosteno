import { Administrador } from "./Administrador";
import { Terminal } from "./Terminal";

export interface Ruta {
    idRuta: number;          
    distancia: number;      
    duracion: string;       
    estadoRuta: string;     
    terminalOrigen: Terminal; 
    terminalDestino: Terminal; 
    administrador: Administrador; 
}
export interface RutaDTO {
    idRuta: number;          
    distancia: number;      
    duracion: string;      
    estadoRuta: string;     
    idTerminalOrigen: number; 
    idTerminalDestino: number; 
    idAdministrador: number; 
}