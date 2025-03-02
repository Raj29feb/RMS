import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { getCartResponse } from '../../interfaces/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  itemAdded$$ = new Subject();
  constructor(private http: HttpClient) {}
  getCartData$(): Observable<getCartResponse> {
    return this.http.get<getCartResponse>(`${enviroment.base_url}/cart`);
  }
  updateCart$(body: object): Observable<any> {
    return this.http.patch(`${enviroment.base_url}/cart`, body);
  }
  addToCart$(body: object): Observable<any> {
    return this.http.post(`${enviroment.base_url}/add-to-cart`, body);
  }
  removeItem$(itemId: string): Observable<any> {
    return this.http.delete(`${enviroment.base_url}/cart-item/${itemId}`);
  }
}
