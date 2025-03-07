import { Component, effect, inject, Input, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { IProduct } from '../../../core/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { StockStatusComponent } from "../stock-status/stock-status.component";

@Component({
  selector: 'app-product-item',
  imports: [CurrencyPipe, RouterLink, StockStatusComponent],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private subscription!: Subscription;
  productsList = signal<IProduct[]>([]);
  
  @Input() getSomeProducts: boolean = false;
  @Input() productsCount: number = 4;

  getAllProducts() {
    this.subscription = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        const count = this.getSomeProducts ? this.productsCount : Infinity;
        this.productsList.set(res.data.slice(0, count));
      }
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
