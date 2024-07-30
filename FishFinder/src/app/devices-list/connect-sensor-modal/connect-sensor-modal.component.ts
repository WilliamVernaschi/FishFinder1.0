import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSpinner,
  IonTitle
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import {ConnectSensorModalItemComponent} from "./connect-sensor-modal-item/connect-sensor-modal-item.component";
import {BleDevice} from "@capacitor-community/bluetooth-le";
import {NgForOf, NgIf} from "@angular/common";
import {connect} from '../connectSensor'
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-connect-sensor-modal',
  templateUrl: './connect-sensor-modal.component.html',
  styleUrls: ['./connect-sensor-modal.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonIcon,
    IonItem,
    IonModal,
    IonList,
    IonSpinner,
    IonTitle,
    IonButtons,
    IonButton,
    ConnectSensorModalItemComponent,
    NgForOf,
    NgIf
  ]
})
export class ConnectSensorModalComponent{
  public bleSensorDevice : Set<BleDevice> = new Set()
  @Output() onClose = new EventEmitter<any>()
  @Output() onNewSensor = new EventEmitter<any>()
  @Input() sensors!: Set<BleDevice>;
  @ViewChild('modal') modal! : ModalController;

  constructor() {
    addIcons({ personCircle })
  }

  cancelConnection(){
    this.onClose.emit()
  }


  async connectSensor(sensor: BleDevice) {
    await connect(sensor);
    this.onNewSensor.emit(sensor)
    this.modal.dismiss()
    
  }
}
