import {Component, Input, numberAttribute, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonSelect} from "@ionic/angular";
import {addIcons} from "ionicons";
import {menu} from "ionicons/icons";

@Component({
  selector: 'app-sensor-config',
  templateUrl: './sensor-config.component.html',
  styleUrls: ['./sensor-config.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class SensorConfigComponent {
  //@ViewChild('customSelect', { static: false }) selectRef!: IonSelect;
  segmentValue: string = 'Automático';
  @Input({transform: numberAttribute}) x = 100;
  @Input({transform: numberAttribute}) y = 100;


  constructor() {
    addIcons({menu});
  }
  onSegmentChange(event: any) {
    this.segmentValue = event.detail.value;
  }

  get absoluteStyle() {
    return {
      top: `${this.y}px`,
      right: `${this.x}px`,
    };
  }



}
