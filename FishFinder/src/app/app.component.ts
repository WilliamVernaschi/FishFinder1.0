import { Component } from '@angular/core';
import {IonApp, IonTabs} from '@ionic/angular/standalone';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonTabs],
})

export class AppComponent {
  constructor() {}
}
