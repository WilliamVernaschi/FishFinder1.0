import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonToggle,
  IonItem,
  IonList,
  IonLabel
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { StateService } from '../state.service'; // Adjust the import path as necessary

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonToggle, IonItem, IonList, IonLabel],
})
export class Tab3Page {
  isSimulationModeEnabled: boolean = false;

  constructor(private stateService: StateService) {}

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
