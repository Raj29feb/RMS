import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable, tap } from 'rxjs';

import { enviroment } from 'src/enviroments/enviroment';
import { SnackbarService } from 'src/app/sdk/services/snackbar/snackbar.service';
import {
  checkDishOwner,
  Dish,
  DishData,
} from '../../interfaces/dish.interface';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private http: HttpClient, private snackbar: SnackbarService) {}

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

  updateDish$(dishId: string, data: object): Observable<object> {
    if (data)
      return this.http.put(
        `${enviroment.base_url}/update-dish/${dishId}`,
        data
      );
    return new Observable((observer) => {
      observer.next({ message: "Dish can't be empty", data: [] });
      observer.next();
    });
  }

  getDishes$(restaurantId: string): Observable<Dish[]> {
    return this.http
      .get(`${enviroment.base_url}/dishes?data=${restaurantId}`)
      .pipe(map((response: any) => response.data.reverse()));
  }

  getDish$(id: string): Observable<any> {
    return this.http.get(`${enviroment.base_url}/dish/${id}`);
  }
  checkDish$(dishId: string): Observable<Object> {
    return this.http.get(`${enviroment.base_url}/check-dish-owner/${dishId}`);
  }
}
