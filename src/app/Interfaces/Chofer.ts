import { Empleado } from "./Empleado";
export interface Chofer extends Empleado{
    fechaLicencia:Date;
    licenciaConducir:string;
    estado:boolean;
}