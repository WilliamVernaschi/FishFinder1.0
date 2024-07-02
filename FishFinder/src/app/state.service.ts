import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private simulationModeSubject = new BehaviorSubject<boolean>(false);
  simulationMode$ = this.simulationModeSubject.asObservable();
  private bluetoothSubject = new BehaviorSubject<boolean>(false);
  bluetooth$ = this.bluetoothSubject.asObservable();

  constructor() {}

  setSimulationMode(enabled: boolean) {
    this.simulationModeSubject.next(enabled);
  }

  getSimulationMode(): boolean {
    return this.simulationModeSubject.value;
  }

  setBluetooth(enabled: boolean) {
    this.bluetoothSubject.next(enabled);
  }

  getBluetooth(): boolean {
    return this.bluetoothSubject.value;
  }
}
