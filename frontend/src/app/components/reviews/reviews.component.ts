import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { ReviewsService } from '../../core/services/reviews.service';
import { ActivatedRoute } from '@angular/router';
import { IReviewData } from '../../core/interfaces/ireview';
import { DatePipe } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-reviews',
  imports: [
    DatePipe, Dialog, ButtonModule,
    InputTextModule, RatingModule, ReactiveFormsModule,
    Toast
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
  providers: [MessageService]
})
export class ReviewsComponent implements OnInit {
  private readonly _ReviewsService = inject(ReviewsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _MessageService = inject(MessageService);
  productId: WritableSignal<string> = signal('');
  productReview: WritableSignal<IReviewData[]> = signal(null as unknown as IReviewData[]);
  visible: boolean = false;

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

  reviewForm = this._FormBuilder.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    review: ['', [Validators.required, Validators.minLength(10)]],
    rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
  });

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.reviewForm.reset();
  }

  submitReview() {
    if (this.reviewForm.valid) {
      this._ReviewsService.createProductReview(this.productId(), this.reviewForm.value).subscribe({
        next: (res) => {
          this._MessageService.add({ severity: 'success', summary: 'Success', detail: "Review Created Successfully!" });
          this.getProductReviewById();
        },
        error: (err) => {
          this._MessageService.add({ severity: 'error', summary: 'Error', detail: "Something went wrong!", life: 5000 });
        }
      });
      this.closeDialog();
    }
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
