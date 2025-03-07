import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _HttpClient: HttpClient) { }
  token = JSON.parse(localStorage.getItem('token') ?? '');

  getUserCart(): Observable<any> {
    return this._HttpClient.get(baseUrl + '/cart', {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    })
  }

  addToCart(productId: string, quantity: number = 1, selectedColor: string, selectedSize: string): Observable<any> {
    return this._HttpClient.post(baseUrl + '/cart', { productId, quantity, selectedColor, selectedSize }, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    })
  }

  updateUserCart(productId: string, quantity: number = 1): Observable<any> {
    return this._HttpClient.put(baseUrl + '/cart',
      { productId, quantity },
      {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      })
  }

  deleteProductFromCart(productId: string): Observable<any> {
    return this._HttpClient.delete(`${baseUrl}/cart/${productId}`, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    });
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${baseUrl}/cart`, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    });
  }

}
