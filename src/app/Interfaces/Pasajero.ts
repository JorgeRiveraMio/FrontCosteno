import { Boleto } from "./Boleto";

export interface Pasajero {
    idPasajero: number;
    numDocumento: string;
    nombres: string;
    apellidos: string;
    fecNacimiento: Date;
    Boleto: Boleto;
}
export interface PasajeroDTO {
    idPasajero: number;
    numDocumento: string;
    nombres: string;
    apellidos: string;
    fecNacimiento: Date;
    idBoleto: number;
}