import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";

import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { StateService } from '../state.service'; // Adjust the import path as necessary
import { addIcons } from 'ionicons';
import { fishOutline, phonePortraitOutline, hammerOutline, chevronForwardSharp, caretForwardSharp, chevronForwardCircleSharp } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class Tab3Page {
  isSimulationModeEnabled: boolean = false;

  constructor(private stateService: StateService) {
    addIcons({fishOutline, phonePortraitOutline, hammerOutline, chevronForwardSharp})
  }

  ngOnInit() {
    this.stateService.simulationMode$.subscribe((enabled: boolean) => {
      this.isSimulationModeEnabled = enabled;
    });
  }

  simulationModeEnabled() : boolean{
    return this.isSimulationModeEnabled;
  }

  toggleSimulationMode(event: CustomEvent) {
    this.stateService.setSimulationMode(event.detail.checked);
    console.log('Simulation Mode:', this.stateService.getSimulationMode());
  }
}
