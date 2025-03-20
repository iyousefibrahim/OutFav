import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  token: string | null = null;

  constructor(private _HttpClient: HttpClient) {
    const storedToken = localStorage.getItem('token');
    try {
      this.token = storedToken ? JSON.parse(storedToken) : null;
    } catch (error) {
      console.error("Invalid JSON in localStorage token:", error);
      this.token = null;
    }
  }
  productDescription: WritableSignal<string> = signal('');

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

  getProductDescription() {
    return this.productDescription();
  }

  setProductDescription(desc: string) {
    this.productDescription.set(desc);
  }

}
