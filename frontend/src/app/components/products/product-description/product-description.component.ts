import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-product-description',
  imports: [],
  templateUrl: './product-description.component.html',
  styleUrl: './product-description.component.css'
})
export class ProductDescriptionComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  productDescription: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.productDescription.set(this._ProductsService.getProductDescription() || 'No description available');
  }
}
