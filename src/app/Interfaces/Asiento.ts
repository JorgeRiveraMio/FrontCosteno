import { EstadoAsiento } from "./EstadoAsiento";
export interface Asiento {
    idAsiento: number;
    tipoAsiento: string;
    numeroPiso: number;
    numAsiento: number;
    estadoAsiento: EstadoAsiento;
    idBus: number;
}