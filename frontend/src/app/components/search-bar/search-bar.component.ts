import { Component, inject, OnInit, OnDestroy, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, SearchPipe],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private readonly _ProductService = inject(ProductsService);
  private readonly _Router = inject(Router);
  private subscription: Subscription = new Subscription();

  searchValue: string = '';
  productList: WritableSignal<IProduct[]> = signal([]);

  productSearch() {
    console.log(this.searchValue);
  }

  getAllProducts() {
    const sub = this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        this.productList.set(res.data);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscription.add(sub);
  }

  navigateToProduct(productId: string) {
    this.searchValue = '';
    this._Router.navigate(['/product', productId]);
  }

  ngOnInit() {
    this.getAllProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
