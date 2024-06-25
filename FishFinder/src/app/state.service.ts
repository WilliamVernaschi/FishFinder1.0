import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private simulationModeSubject = new BehaviorSubject<boolean>(false);
  simulationMode$ = this.simulationModeSubject.asObservable();

  constructor() {}

  setSimulationMode(enabled: boolean) {
    this.simulationModeSubject.next(enabled);
  }

  getSimulationMode(): boolean {
    return this.simulationModeSubject.value;
  }
}
