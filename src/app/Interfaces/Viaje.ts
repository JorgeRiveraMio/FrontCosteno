
import { Administrador } from "./Administrador";
import { Ruta } from "./Ruta";
import { Bus } from "./Bus";
import { Chofer } from "./Chofer";

export interface Viaje {
    idViaje: number;
    fechaSalida: Date;
    fechaLlegada: Date;
    horaSalida: string;
    horaLlegada: string;
    precio:number;
    estadoViaje: string;
    ruta: Ruta;
    administrador: Administrador;
    bus: Bus;
    chofer1: Chofer;
    chofer2: Chofer;
}
export interface ViajeDTO {
    idViaje: number;
    fechaSalida: Date;
    fechaLlegada: Date;
    horaSalida: string;
    horaLlegada: string;
    precio:number;
    estadoViaje: string;
    idRuta: number;
    idAdministrador: number;
    idBus: number;
    idChofer1: number;
    idChofer2: number;
}