import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ellipsisVertical, play, create } from 'ionicons/icons';

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
  @Input() sensor: any;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  constructor() {
    addIcons({play, ellipsisVertical, create})
  }
  editSensor(sensor: any) {
    this.edit.emit(sensor);
  }

  deleteSensor(sensor: any) {
    this.delete.emit(sensor);
  }
}
