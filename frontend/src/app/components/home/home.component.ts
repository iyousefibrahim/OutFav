import { Component } from '@angular/core';
import { MainHeroComponent } from "../main-hero/main-hero.component";
import { FeaturesComponent } from "../features/features.component";

@Component({
  selector: 'app-home',
  imports: [MainHeroComponent, FeaturesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
