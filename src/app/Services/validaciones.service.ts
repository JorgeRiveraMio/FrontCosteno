import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }
    tarjeta(mensaje: string,tipo:boolean) {

    if (tipo) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500
      });
    }else{

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: mensaje,
       
      });
    }
  
}
}
