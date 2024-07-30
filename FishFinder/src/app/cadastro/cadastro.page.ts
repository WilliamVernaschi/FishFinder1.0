import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon, IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {logoFacebook, logoGoogle, logoApple} from "ionicons/icons";
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, IonItem, IonLabel, IonInput]
})
export class CadastroPage implements OnInit {

  constructor(private router: Router) {
    addIcons({logoFacebook, logoGoogle, logoApple});
  }

  ngOnInit() {
    this.router.navigate(['/cadastro'])
  }

}
