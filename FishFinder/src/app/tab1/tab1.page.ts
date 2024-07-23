import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {FishViewComponent} from "../fish-view/fish-view.component";
import {NgIf} from "@angular/common";
import {DevicesList} from "../devices-list/devices-list.page";
import { StateService } from '../state.service';
import {SensorConfigComponent} from "../sensor-config/sensor-config.component"; // Adjust the import path as necessary


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, FishViewComponent, NgIf, SensorConfigComponent, DevicesList],
})
export class Tab1Page {
  isSimulationModeEnabled: boolean = false;
  isBluetoothEnabled: boolean = false;
  constructor(private stateService: StateService) {}
  ngOnInit() {
    this.stateService.simulationMode$.subscribe((enabled: boolean) => {

      this.isSimulationModeEnabled = enabled;
      this.isBluetoothEnabled = false;
    });
    this.stateService.bluetooth$.subscribe((enabled: boolean) => {
      this.isBluetoothEnabled = enabled;
    });

  }

  enableBluetooth(event : CustomEvent){
  }
}
