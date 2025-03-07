import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NewsletterComponent } from "../../newsletter/newsletter.component";
import { ProductsService } from '../../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { IProduct } from '../../../core/interfaces/iproduct';
import { StockStatusComponent } from "../stock-status/stock-status.component";
import { ReviewsCountComponent } from "../../reviews/reviews-count/reviews-count.component";
import { ReviewsService } from '../../../core/services/reviews.service';
import { IReview } from '../../../core/interfaces/ireview';
import { CurrencyPipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-product-details',
  imports: [
    NewsletterComponent, BreadcrumbsComponent, StockStatusComponent,
    ReviewsCountComponent, CurrencyPipe, Toast
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  providers: [MessageService]
})
export class ProductDetailsComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _ReviewsService = inject(ReviewsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _MessageService = inject(MessageService);

  productId: WritableSignal<string> = signal('');
  productData = signal<IProduct>(null as unknown as IProduct);
  reviewData = signal<IReview>(null as unknown as IReview);

  getProductById() {
    this._ProductsService.getProductById(this.productId()).subscribe({
      next: (res) => {
        console.log(res);
        this.productData.set(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getProductReviewById() {
    this._ReviewsService.getProductsReviewById(this.productId()).subscribe({
      next: (res) => {
        this.reviewData.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  copyProductLink() {
    const id = this.productId();
    const productUrl = `${window.location.origin}/product/${id}`;

    navigator.clipboard.writeText(productUrl).then(() => {
      this._MessageService.add({ severity: 'success', summary: 'Success', detail: "Product link copied to clipboard!" });
    }).catch(err => {
      this._MessageService.add({ severity: 'error', summary: 'Error', detail: 'Something happened!', life: 5000 });
    });
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        const id = res.get('id') ?? '';
        this.productId.set(id);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.getProductById();
    this.getProductReviewById();
  }
}
