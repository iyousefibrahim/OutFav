import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule,SearchPipe],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  private readonly _ProductService = inject(ProductsService);
  private readonly _Router = inject(Router);

  searchValue: string = '';
  productList: WritableSignal<IProduct[]> = signal([]);

  productSearch() {
    console.log(this.searchValue);

  }

  getAllProducts() {
    this._ProductService.getAllProducts().subscribe(
      (res) => {
        this.productList.set(res.data);
        console.log(res);

      },
      (err) => {
        console.log(err);
      }
    )
  }

  navigateToProduct(productId: string) {
    this.searchValue = ''; 
    this._Router.navigate(['/product', productId]); 
  }

  ngOnInit() {
    this.getAllProducts();
  }
}
