import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reviews-count',
  imports: [],
  templateUrl: './reviews-count.component.html',
  styleUrl: './reviews-count.component.css'
})
export class ReviewsCountComponent {
  @Input({ required: true }) avgRate!: string;
  @Input({ required: true }) reviewsCount!: number;
}
