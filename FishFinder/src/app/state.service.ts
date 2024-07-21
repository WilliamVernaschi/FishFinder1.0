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

  private depthUnit = new BehaviorSubject<string>("Metros");
  depthUnit$ = this.depthUnit.asObservable();

  private temperatureUnit = new BehaviorSubject<string>("Celsius");
  temperatureUnit$ = this.temperatureUnit.asObservable();

  private distanceUnit = new BehaviorSubject<string>("Quilômetros");
  distanceUnit$ = this.distanceUnit.asObservable();

  private manualDepth = new BehaviorSubject<number>(20);  // Default value
  manualDepth$ = this.manualDepth.asObservable();

  private segmentValue = new BehaviorSubject<string>('Automático');  // Default value
  segmentValue$ = this.segmentValue.asObservable();

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

  setTemperatureUnit(unit: string) {
    this.temperatureUnit.next(unit);
  }

  setDistanceUnit(unit: string) {
    this.distanceUnit.next(unit);
  }

  setDepthUnit(unit: string) {
    this.depthUnit.next(unit);
  }

  getTemperatureUnit(): string {
    return this.temperatureUnit.value;
  }

  getDepthUnit(): string {
    return this.depthUnit.value;
  }

  getDistanceUnit(): string {
    return this.distanceUnit.value;
  }

  setManualDepth(depth: number) {
    this.manualDepth.next(depth);
  }

  getManualDepth(): number {
    return this.manualDepth.value;
  }

  setSegmentValue(value: string) {
    this.segmentValue.next(value);
  }

  getSegmentValue(): string {
    return this.segmentValue.value;
  }
}
