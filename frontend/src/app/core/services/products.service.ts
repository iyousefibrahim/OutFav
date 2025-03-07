import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient: HttpClient) { }

  token = JSON.parse(localStorage.getItem('token') ?? '');

  getAllProducts(): Observable<any> {
    return this._HttpClient.get(`${baseUrl}/products`, {
      headers: {
        'Authorization': 'Bearer' + this.token
      }
    });
  }

  getProductById(productId: string): Observable<any> {
    return this._HttpClient.get(`${baseUrl}/products/${productId}`, {
      headers: {
        'Authorization': 'Bearer' + this.token
      }
    });
  }

  createProduct(data: object): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/products`, data, {
      headers: {
        'Authorization': 'Bearer' + this.token
      },

    });
  }

  updateProduct(productId: string, data: object): Observable<any> {
    return this._HttpClient.put(`${baseUrl}/products/${productId}`, data, {
      headers: {
        'Authorization': 'Bearer' + this.token
      }
    });
  }

  deleteProduct(productId: string): Observable<any> {
    return this._HttpClient.delete(`${baseUrl}/products/${productId}`, {
      headers: {
        'Authorization': 'Bearer' + this.token
      }
    });
  }
  
}
