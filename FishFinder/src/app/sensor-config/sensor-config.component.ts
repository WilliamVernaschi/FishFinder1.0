import { Component, Input, OnInit, numberAttribute } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { menu } from "ionicons/icons";
import { StateService } from '../state.service';

@Component({
  selector: 'app-sensor-config',
  templateUrl: './sensor-config.component.html',
  styleUrls: ['./sensor-config.component.scss'],
  imports: [IonicModule],
  standalone: true
})
export class SensorConfigComponent implements OnInit {
  segmentValue: string = 'Automático';
  manualDepth: number = 20;  // Default value
  @Input({transform: numberAttribute}) x = 100;
  @Input({transform: numberAttribute}) y = 100;

  constructor(private stateService: StateService) {
    addIcons({ menu });
  }

  ngOnInit() {
    this.stateService.manualDepth$.subscribe(depth => {
      this.manualDepth = depth;
    });

    this.stateService.segmentValue$.subscribe(value => {
      this.segmentValue = value;
    });
  }

  onSegmentChange(event: any) {
    this.segmentValue = event.detail.value;
    this.stateService.setSegmentValue(this.segmentValue);
  }

  onDepthChange(event: any) {
    this.manualDepth = event.detail.value;
    this.stateService.setManualDepth(this.manualDepth);
  }

  get absoluteStyle() {
    return {
      top: `${this.y}px`,
      right: `${this.x}px`,
    };
  }
}
