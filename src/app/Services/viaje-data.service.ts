import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Viaje } from '../Interfaces/Viaje';

@Injectable({
  providedIn: 'root'
})
export class ViajeDataService {
  private viajesSource = new BehaviorSubject<Viaje[]>([]);
  currentViajes = this.viajesSource.asObservable();

  constructor() {
    // Verificar si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedViajes = localStorage.getItem('viajes');
      if (storedViajes) {
        this.viajesSource.next(JSON.parse(storedViajes));
      }
    }
  }

  updateViajes(viajes: Viaje[]) {
    // Verificar si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      this.viajesSource.next(viajes);
      localStorage.setItem('viajes', JSON.stringify(viajes));
    }
  }
}
