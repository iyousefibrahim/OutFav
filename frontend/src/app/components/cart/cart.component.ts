import { ICart } from './../../core/interfaces/icart';
import { Component, inject, OnInit, WritableSignal, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ButtonComponent } from '../button/button.component';
import { BreadcrumbsComponent } from "../breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-cart',
  imports: [ButtonComponent, BreadcrumbsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  cartItems = signal<ICart>(null as unknown as ICart);

  getUserCart() {
    return this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartItems.set(res.data.cart);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit() {
    this.getUserCart();
  }
}

