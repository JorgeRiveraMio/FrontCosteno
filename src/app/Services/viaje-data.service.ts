// viaje-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Viaje } from '../Interfaces/Viaje';

@Injectable({
  providedIn: 'root'
})
export class ViajeDataService {
  private viajesSource = new BehaviorSubject<Viaje[]>([]);
  currentViajes = this.viajesSource.asObservable();

  constructor() {}

  updateViajes(viajes: Viaje[]) {
    this.viajesSource.next(viajes);
  }
}