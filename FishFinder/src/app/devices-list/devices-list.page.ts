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
  public connectedSensors : Set<BleDevice> = new Set();
  public scannedSensors : Set<BleDevice> = new Set();

  constructor(private stateService: StateService) {
    addIcons({ bluetooth, add })

    setScannedDevicesHandler((device : BleDevice) => {
      if(!this.connectedSensors.has(device)){
        this.scannedSensors.add(device)
      }
    })

    const dummy: BleDevice = {
      deviceId: '123',
      name: 'Dummy 1',
      uuids: ['uuid1', 'uuid2']
    };
    const dummy2: BleDevice = {
      deviceId: '1234',
      name: 'Dummy 2',
      uuids: ['uuid1', 'uuid2']
    };

    this.scannedSensors.add(dummy)
    this.scannedSensors.add(dummy2)

  }




  async connectNewSensor() {
    console.log("starting connection")
    await scan()
  }

  editSensor(sensor: any) {
    console.log('Edit sensor', sensor);
  }

  async closeConnectionModal(){
    console.log("stopping connection")
    await stopScan()
  }

  deleteSensor(sensor: BleDevice) {
    this.connectedSensors.delete(sensor)
    console.log('Delete sensor', sensor);
  }

  addConnectedSensor(sensor : BleDevice) {
    this.connectedSensors.add(sensor)
    this.scannedSensors.delete(sensor)
  }
}
