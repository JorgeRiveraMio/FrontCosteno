import { Asiento } from "./Asiento";
import { Bus } from "./Bus";
import { Cliente } from "./Cliente";
import { EstadoBoleto } from "./EstadoBoleto";
import { Viaje } from "./Viaje";

export interface Boleto {
    idBoleto: number;
    precio: number;
    fechaEmision: Date;
    horaEmision: string; // Usa un string para almacenar el tiempo, o puedes ajustarlo a un tipo específico como 'Time' en JavaScript si es necesario.
    cliente: Cliente; // Asume que la interfaz Cliente está definida en otro archivo
    viaje: Viaje; // Asume que la interfaz Viaje está definida en otro archivo
    asiento: Asiento; // Asume que la interfaz Asiento está definida en otro archivo
    bus: Bus; // Asume que la interfaz Bus está definida en otro archivo
    estadoBoleto: EstadoBoleto; // Asume que la interfaz EstadoBoleto está definida en otro archivo
  }
  export interface BoletoDTO {
    idBoleto: number;
    precio: number;
    fechaEmision: Date;
    horaEmision: string; // Usa string para la representación del tiempo, o ajusta según sea necesario
    idCliente: number; // Solo el ID del cliente
    idViaje: number; // Solo el ID del viaje
    idAsiento: number; // Solo el ID del asiento
    idBus: number; // Solo el ID del bus
    idEstadoBoleto: number; // Solo el ID del estado del boleto
  }