import { EstadoAsiento } from "./EstadoAsiento";
export interface Asiento {
    idAsiento: number;
    tipoAsiento: string;
    numPiso: number;
    numAsiento: number;
    estadoAsiento: EstadoAsiento;
    idBus: number;
}