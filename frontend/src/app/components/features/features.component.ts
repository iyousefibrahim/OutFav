import { Component } from '@angular/core';
import { FeatureItemComponent } from "./feature-item/feature-item.component";

@Component({
  selector: 'app-features',
  imports: [FeatureItemComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {

}
