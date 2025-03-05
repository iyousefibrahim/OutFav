import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-item',
  imports: [],
  templateUrl: './feature-item.component.html',
  styleUrl: './feature-item.component.css'
})
export class FeatureItemComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) iconSrc!: string;
}
