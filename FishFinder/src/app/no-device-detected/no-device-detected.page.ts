import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonIcon, IonText, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bluetooth } from 'ionicons/icons';
// import { BluetoothClassicSerialPortDevice } from "@awesome-cordova-plugins/bluetooth-classic-serial-port";

@Component({
  selector: 'app-no-device-detected',
  templateUrl: './no-device-detected.page.html',
  styleUrls: ['./no-device-detected.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonText, IonButton, IonIcon]
})
export class NoDeviceDetectedPage implements OnInit {


  constructor() {
    addIcons({ bluetooth })
  }


  connectBluetooth() {
    // Your logic to connect to Bluetooth goes here
    //this.bluetoothSerial.connect();
  }

  ngOnInit() {
  }

}
