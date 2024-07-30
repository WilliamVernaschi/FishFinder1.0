import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { BleDevice } from '@capacitor-community/bluetooth-le';
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash, play, create } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-list-item',
  templateUrl: './device-list-item.component.html',
  styleUrls: ['./device-list-item.component.scss'],
  imports: [
    IonItem,
    IonIcon,
    IonLabel,
    IonButtons,
    IonButton
  ],

  standalone: true
})
export class DeviceListItemComponent {
  @Input() sensor!: BleDevice;
  @Output() edit = new EventEmitter<BleDevice>();
  @Output() delete = new EventEmitter<BleDevice>();

  constructor(private router: Router) {
    addIcons({play, trash, create})
  }
  editSensor(sensor: BleDevice) {
    this.edit.emit(sensor);
  }

  deleteSensor(sensor: BleDevice) {
    this.delete.emit(sensor);
  }
  viewSensorData(sensor : BleDevice) {
    console.log("connecting!!")
    this.router.navigate(['/fish-view'], {
      queryParams: {
        sensor: JSON.stringify(sensor)
      }
    });
  }
}
