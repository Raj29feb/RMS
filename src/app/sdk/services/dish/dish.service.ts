import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { enviroment } from 'src/enviroments/enviroment';
import {
  checkDishOwner,
  DeleteDish,
  Dish,
  updateDishResponse,
} from '../../interfaces/dish.interface';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private http: HttpClient) {}

  createDishes$(data: Array<object>): Observable<Object> {
    if (data)
      return this.http.post(
        `${enviroment.base_url}/add-dishes`,
        data.reverse()
      );
    return new Observable((observer) => {
      observer.next({ message: "Dishes can't be empty", data: [] });
      observer.next();
    });
  }

  updateDish$(dishId: string, data: object): Observable<updateDishResponse> {
    return this.http.put<updateDishResponse>(
      `${enviroment.base_url}/update-dish/${dishId}`,
      data
    );
  }

  getDishes$(restaurantId: string): Observable<Dish[]> {
    return this.http
      .get<Dish[]>(`${enviroment.base_url}/dishes?data=${restaurantId}`)
      .pipe(map((response: any) => response.data.reverse()));
  }

  getDish$(id: string): Observable<{ data: Dish }> {
    return this.http.get<{ data: Dish }>(`${enviroment.base_url}/dish/${id}`);
  }
  deleteDish$(id: string): Observable<DeleteDish> {
    return this.http.delete<DeleteDish>(`${enviroment.base_url}/dish/${id}`);
  }
  checkDish$(dishId: string): Observable<checkDishOwner> {
    return this.http.get<checkDishOwner>(
      `${enviroment.base_url}/check-dish-owner/${dishId}`
    );
  }
  getDishName$(dishId: string): Observable<any> {
    return this.http.get(`${enviroment.base_url}/dishName/${dishId}`);
  }
}
