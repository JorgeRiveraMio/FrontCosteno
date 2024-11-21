import { Boleto } from "./Boleto";

export interface Pasajero {
    idPasajero: number;
    numDocumento: string;
    nombres: string;
    apellidos: string;
    fecNacimiento: Date;
}