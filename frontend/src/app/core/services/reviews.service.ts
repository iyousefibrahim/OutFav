import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private _HttpClient: HttpClient) { }
  token = localStorage.getItem('token');

  getAllProductsReviews(): Observable<any> {
    return this._HttpClient.get(baseUrl + '/reviews', {
      headers: {
        'Authorization': 'Bearer' + this.token
      }
    });
  }

  getProductsReviewById(productId: string): Observable<any> {
    return this._HttpClient.get(baseUrl + `/reviews/${productId}`, {
      headers: {
        'Authorization': 'Bearer' + this.token
      }
    });
  }

  createProductReview(productReview: object): Observable<any> {
    return this._HttpClient.post(baseUrl + '/reviews', productReview, {
      headers: {
        'Authorization': 'Bearer' + this.token
      }
    })
  }

  updateProductReview(reviewId: string, productReview: object): Observable<any> {
    return this._HttpClient.put(baseUrl + '/reviews', reviewId, {
      headers: {
        'Authorization': 'Bearer' + this.token
      }
    })
  }

  deleteProductReview(reviewId: string): Observable<any> {
    return this._HttpClient.delete(baseUrl + `/reviews/${reviewId}`, {
      headers: {
        'Authorization': 'Bearer' + this.token
      }
    });
  }
  
}
