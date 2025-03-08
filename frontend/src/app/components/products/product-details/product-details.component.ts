import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NewsletterComponent } from "../../newsletter/newsletter.component";
import { ProductsService } from '../../../core/services/products.service';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { IProduct } from '../../../core/interfaces/iproduct';
import { StockStatusComponent } from "../stock-status/stock-status.component";
import { ReviewsCountComponent } from "../../reviews/reviews-count/reviews-count.component";
import { ReviewsService } from '../../../core/services/reviews.service';
import { IReview } from '../../../core/interfaces/ireview';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonComponent } from "../../button/button.component";
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  imports: [
    NewsletterComponent, BreadcrumbsComponent, StockStatusComponent,
    ReviewsCountComponent, CurrencyPipe, Toast,
    ButtonComponent, FormsModule, NgStyle,
    RouterLink, RouterOutlet, RouterLinkActive
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
  private readonly _CartService = inject(CartService);
  private readonly _TitleService = inject(Title);

  productData = signal<IProduct>(null as unknown as IProduct);
  reviewData = signal<IReview>(null as unknown as IReview);

  productId: WritableSignal<string> = signal('');
  selectedColor: WritableSignal<string> = signal('');
  selectedSize: WritableSignal<string> = signal('');

  quantity: WritableSignal<number> = signal(1);
  min: WritableSignal<number> = signal(1);
  max: WritableSignal<number> = signal(99);
  quantityChange: WritableSignal<number> = signal(0);

  getProductById() {
    this._ProductsService.getProductById(this.productId()).subscribe({
      next: (res) => {
        this.productData.set(res.data);
        this.max.set(res.data.availableQuantity);
        this._ProductsService.setProductDescription(this.productData().description);
        this._TitleService.setTitle(`${this.productData().title}`);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getProductReviewById() {
    this._ReviewsService.getProductsReviewById(this.productId()).subscribe({
      next:(res)=>{
        console.log(res,"details");
        this.reviewData.set(res);
      }
    })
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

  addToCart(productId: string) {
    if (this.selectedColor && this.selectedSize) {
      this._CartService.addToCart(productId, this.quantity(), this.selectedColor(), this.selectedSize()).subscribe({
        next: (res) => {
          console.log("added to cart", res);
        },
        error: (err) => {
          console.log(err);

        }
      });
    }
  }

  increase() {
    if (this.quantity() < this.max()) {
      this.quantity.update(q => q + 1);
      this.quantityChange.set(this.quantity());
    }
  }

  decrease() {
    if (this.quantity() > this.min()) {
      this.quantity.update(q => q - 1);
      this.quantityChange.set(this.quantity());
    }
  }

  onInputChange(event: any) {
    let value = event.target.value;
    if (value < this.min()) value = this.min();
    if (value > this.max()) value = this.max();
    this.quantity = value;
    this.quantityChange.set(this.quantity());
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
