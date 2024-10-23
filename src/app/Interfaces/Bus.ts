import { EstadoBus } from "./EstadoBus";
export interface Bus{
    idBus: number;
    nombre: string;
    placa: string;
    modelo: string;
    capacidadPiso1: number;
    capacidadPiso2: number;
    estadoBus: EstadoBus;
}