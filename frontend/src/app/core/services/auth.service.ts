import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environment/baseUrl';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }

  userLogin(data: object): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/auth/login`, data);
  }

  adminLogin(data: object): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/auth/admin/login`, data);
  }

  userRegister(data: object): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/auth/register`, data);
  }

  changePassword(data: object): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/auth/change-password`, data);
  }

  checkAdmin(): Observable<any> {
    const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') as string) : null;
    if (token) {
      return this._HttpClient.get(`${baseUrl}/auth/admin/check-admin`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } else {
      return of(null);
    }
  }
}
