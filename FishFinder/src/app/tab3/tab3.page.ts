import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem, IonLabel,
  IonList, IonModal, IonSelect, IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar
} from "@ionic/angular/standalone";

import { StateService } from '../state.service'; // Adjust the import path as necessary
import { addIcons } from 'ionicons';
import { fishOutline, phonePortraitOutline, hammerOutline, chevronForwardSharp, caretForwardSharp, chevronForwardCircleSharp } from 'ionicons/icons';
import { KeepAwake } from '@capacitor-community/keep-awake';

const keepAwake = async () => {
  await KeepAwake.keepAwake();
};

const allowSleep = async () => {
  await KeepAwake.allowSleep();
};


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonToggle, IonContent, IonTitle, IonToolbar, IonHeader, IonList, IonItem, IonIcon, IonLabel, IonModal, IonSelect, IonSelectOption],
})
export class Tab3Page {
  isSimulationModeEnabled: boolean = false;
  distanceUnit: string = "Quilômetros";
  temperatureUnit: string = "Celsius";
  depthUnit: string = "Metros";
  isScreenAlwaysAwake: boolean = false;





  constructor(private stateService: StateService) {
    addIcons({fishOutline, phonePortraitOutline, hammerOutline, chevronForwardSharp})
  }

  onDepthUnitChange(event : CustomEvent) {
    const value = event.detail.value;
    this.depthUnit = value;
    this.stateService.setDepthUnit(value);
    console.log(`Novo tipo de profundidade: ${value}`)
  }

  toggleScreenAlwaysAwake(event: CustomEvent) {
    this.isScreenAlwaysAwake = event.detail.checked;
    console.log('Tela sempre ligada:', this.isScreenAlwaysAwake);

    this.isScreenAlwaysAwake ? keepAwake() : allowSleep()
  }

  onTemperatureUnitChange(event : CustomEvent) {
    const value = event.detail.value;
    this.temperatureUnit = value;
    this.stateService.setTemperatureUnit(value);
    console.log(`Novo tipo de temperatura: ${value}`)


  }

  onDistanceUnitChange(event : CustomEvent) {
    const value = event.detail.checked;
    this.distanceUnit = value;
    this.stateService.setDistanceUnit(value);
    console.log(`Novo tipo de distância: ${value}`)


  }

  ngOnInit() {
    this.stateService.simulationMode$.subscribe((enabled: boolean) => {
      this.isSimulationModeEnabled = enabled;
    });

  }

  simulationModeEnabled() : boolean{
    return this.isSimulationModeEnabled;
  }

  toggleSimulationMode(event: CustomEvent) {
    this.stateService.setSimulationMode(event.detail.checked);
    console.log('Simulation Mode:', this.stateService.getSimulationMode());
  }
}
