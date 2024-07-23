import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel,
  IonList, IonModal,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bluetooth, add } from 'ionicons/icons';
import { StateService } from '../state.service';
import {DeviceListItemComponent} from "./device-list-item/device-list-item.component";
import {NoSensorConnectedComponent} from "./no-sensor-connected/no-sensor-connected.component";
import {ConnectSensorModalComponent} from "./connect-sensor-modal/connect-sensor-modal.component";
import {scan, stopScan, setScannedDevicesHandler} from "./connectSensor";
import {BleDevice} from "@capacitor-community/bluetooth-le";

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.page.html',
  styleUrls: ['./devices-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonText, IonButton, IonIcon, IonList, DeviceListItemComponent, IonItem, IonItemGroup, IonItemDivider, IonLabel, NoSensorConnectedComponent, IonModal, ConnectSensorModalComponent]
})
export class DevicesList {
  public connectedSensors : Array<BleDevice> = [];
  public scannedSensors : Array<BleDevice> = [];

  constructor(private stateService: StateService) {
    addIcons({ bluetooth, add })

    setScannedDevicesHandler((device : BleDevice) => {
      this.scannedSensors.push(device)
    })
  }




  async connectNewSensor() {
    console.log("starting connection")
    await scan()
  }

  editSensor(sensor: any) {
    console.log('Edit sensor', sensor);
    // Add your logic to edit the sensor
  }

  async closeConnectionModal(){
    console.log("stopping connection")
    await stopScan()
  }

  deleteSensor(sensor: any) {
    console.log('Delete sensor', sensor);
    // Add your logic to delete the sensor
  }

  addConnectedSensor(sensor : BleDevice) {
    this.connectedSensors.push(sensor)
  }
}
