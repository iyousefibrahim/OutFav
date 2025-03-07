import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NewsletterComponent } from "../../newsletter/newsletter.component";
import { ProductsService } from '../../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [NewsletterComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  productId: WritableSignal<string> = signal('');

  getProductById(){
    this._ProductsService.getProductById(this.productId()).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
        
      }
    });
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.productId.set(res.get('id') ?? '');
      },
      error:(err)=>{
        console.log(err);
      }
    });

    this.getProductById();
    
  }
}
