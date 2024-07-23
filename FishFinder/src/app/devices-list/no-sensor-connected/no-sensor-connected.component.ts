import { Component, OnInit } from '@angular/core';
import {addIcons} from "ionicons";
import {informationCircleOutline} from "ionicons/icons";
import {IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'app-no-sensor-connected',
  templateUrl: './no-sensor-connected.component.html',
  styleUrls: ['./no-sensor-connected.component.scss'],
  imports: [
    IonIcon
  ],
  standalone: true
})
export class NoSensorConnectedComponent  implements OnInit {

  constructor() {
    addIcons({informationCircleOutline})
  }

  ngOnInit() {}

}
