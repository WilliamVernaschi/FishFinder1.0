import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { BleDevice} from "@capacitor-community/bluetooth-le";
import {
  IonButton,
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-connect-sensor-modal-item',
  templateUrl: './connect-sensor-modal-item.component.html',
  styleUrls: ['./connect-sensor-modal-item.component.scss'],
  standalone: true,
  imports : [
    IonButton
  ]
})
export class ConnectSensorModalItemComponent  implements OnInit {
  @Input() bleDevice: any;
  @Output() onConnect = new EventEmitter<BleDevice>()

  constructor() { }

  ngOnInit() {}

  connect(){
    this.onConnect.emit(this.bleDevice);
  }

}
