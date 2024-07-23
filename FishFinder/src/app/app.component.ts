import { Component } from '@angular/core';
import {IonApp, IonTabs} from '@ionic/angular/standalone';
import {FishViewComponent} from "./fish-view/fish-view.component";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, FishViewComponent, IonTabs],
})

export class AppComponent {
  constructor() {}
}
