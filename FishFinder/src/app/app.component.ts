import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {FishViewComponent} from "./fish-view/fish-view.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, FishViewComponent],
})
export class AppComponent {
  constructor() {}
}
