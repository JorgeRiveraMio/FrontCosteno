export interface Ruta {
    distanciaKm: number;
    duracionAproximada: string;
    estadoRuta: string;
}
export interface Bus {
    placa: string;
    modelo: string;
    asientosPiso1: number;
    asientosPiso2: number;
    tipoAsiento: string;
    estadoBus: string;
}
export interface Viaje {
    fechaHoraSalida: string;
    fechaHoraLlegada: string;
    estadoViaje: string;
}
export interface Chofer {
    liceConducir: string;
    fechaLincencia: string;
    estadoChofer: string;
}
export interface Terminal {
    nombre: string;
    direccion: string;
    departamento: string;
    provincia: string;
    distrito: string;
    geolocalizacionLatitud: number;
    geolocalizacionLongitud: number;
}
