import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { wifi, locate, batteryCharging } from 'ionicons/icons';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-sensor-info-row',
  templateUrl: './sensor-info-row.component.html',
  styleUrls: ['./sensor-info-row.component.scss'],
  standalone: true,
  imports: [
    IonIcon
  ]
})
export class SensorInfoRowComponent  implements OnInit {

  constructor() {
    addIcons({wifi, locate, batteryCharging})
   }

  ngOnInit() {}

}
