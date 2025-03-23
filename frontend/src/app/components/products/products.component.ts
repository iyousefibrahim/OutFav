import { Component } from '@angular/core';
import { ProductItemComponent } from "./product-item/product-item.component";
import { BreadcrumbsComponent } from "../breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-products',
  imports: [ProductItemComponent, BreadcrumbsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
