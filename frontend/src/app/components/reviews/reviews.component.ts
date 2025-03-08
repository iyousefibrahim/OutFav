import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { ReviewsService } from '../../core/services/reviews.service';
import { ActivatedRoute } from '@angular/router';
import { IReviewData } from '../../core/interfaces/ireview';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reviews',
  imports: [DatePipe],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  private readonly _ReviewsService = inject(ReviewsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  productId: WritableSignal<string> = signal('');
  productReview: WritableSignal<IReviewData[]> = signal(null as unknown as IReviewData[]);

  getProductReviewById() {
    this._ReviewsService.getProductsReviewById(this.productId()).subscribe({
      next: (res) => {
        this.productReview.set(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this._ActivatedRoute.parent?.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.productId.set(id);
          this.getProductReviewById();
        }
      }
    })
  }

}
