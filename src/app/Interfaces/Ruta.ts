import { Administrador } from "./Administrador";
import { Terminal } from "./Terminal";

export interface Ruta {
    idRuta: number;          // Identificador único de la ruta
    distancia: number;      // Distancia de la ruta en kilómetros (o la unidad que elijas)
    duracion: string;       // Duración de la ruta (puedes usar un string como 'HH:mm:ss' o un tipo de dato adecuado)
    estadoRuta: string;     // Estado de la ruta (ej. 'activo', 'inactivo')
    terminalOrigen: Terminal; // Objeto Terminal que representa la terminal de origen
    terminalDestino: Terminal; // Objeto Terminal que representa la terminal de destino
    administrador: Administrador; // Objeto Administrador relacionado con la ruta
}