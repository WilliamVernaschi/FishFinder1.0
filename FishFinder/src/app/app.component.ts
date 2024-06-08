import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {FishViewComponent} from "./fish-view/fish-view.component";
import { SimulatorComponent } from './simulator/simulator.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, FishViewComponent, SimulatorComponent],
})
export class AppComponent {
  constructor() {}
}
