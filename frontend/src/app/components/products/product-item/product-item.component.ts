import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);

  getAllProducts(){
    this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log("res",res);
        
      },
      error:(err)=>{
        console.log("err",err);
      }
    });
  }
  ngOnInit(): void {
    
    this.getAllProducts();
  }
}
