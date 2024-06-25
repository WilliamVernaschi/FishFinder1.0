import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {FishViewComponent} from "../fish-view/fish-view.component";
import {NgIf} from "@angular/common";
import {NoDeviceDetectedPage} from "../no-device-detected/no-device-detected.page";
import { StateService } from '../state.service'; // Adjust the import path as necessary

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, FishViewComponent, NgIf, NoDeviceDetectedPage],
})
export class Tab1Page {
  isSimulationModeEnabled: boolean = false;
  constructor(private stateService: StateService) {}
  ngOnInit() {
    this.stateService.simulationMode$.subscribe((enabled: any) => {
      this.isSimulationModeEnabled = enabled;
    });
  }
}
