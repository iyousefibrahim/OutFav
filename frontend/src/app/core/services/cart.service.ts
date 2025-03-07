import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private readonly _HttpClient: HttpClient) { }
  token = localStorage.getItem('token');

  getUserCart(): Observable<any> {
    console.log(this.token);
    
    return this._HttpClient.get(baseUrl + '/cart', {
      headers: {
        'Authorization': 'Bearer' + this.token
      }
    })
  }

  AddToCart(productId: string, quantity: number = 1): Observable<any> {
    return this._HttpClient.post(baseUrl + '/cart',
      { productId, quantity },
      {
        headers: {
          'Authorization': 'Bearer' + this.token
        }
      }
    );
  }

  UpdateUserCart(productId: string, quantity: number = 1): Observable<any> {
    return this._HttpClient.put(baseUrl + '/cart',
      { productId, quantity },
      {
        headers: {
          'Authorization': 'Bearer' + this.token
        }
      })
  }

  deleteProductFromCart(productId: string): Observable<any> {
    return this._HttpClient.delete(`${baseUrl}/cart/${productId}`);
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${baseUrl}/cart`);
  }
}
