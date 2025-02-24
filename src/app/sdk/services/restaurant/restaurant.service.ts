import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { SnackbarService } from 'src/app/sdk/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient, private snackbar: SnackbarService) {}

  createRestaurant$(data: Array<object>): Observable<Object> {
    if (data)
      return this.http
        .post(`${enviroment.base_url}/add-restaurant`, data.reverse())
        .pipe(
          tap((response: any) => {
            this.snackbar.openSnackBar(false, response.message);
          }),
          map(() => {
            return this.getRestaurants$('all');
          })
        );
    return new Observable((observer) => {
      observer.next({ message: "Address can't be empty", data: [] });
      observer.next();
    });
  }

  getRestaurants$(owner: string): Observable<any> {
    return this.http
      .get(`${enviroment.base_url}/restaurants?owner=${owner}`)
      .pipe(map((response: any) => response.data.reverse()));
  }

  getRestaurant$(id: String): Observable<any> {
    return this.http
      .get(`${enviroment.base_url}/restaurant/${id}`)
      .pipe(map((response: any) => response.data));
  }

  getRestaurantsNames$(filter: string): Observable<any> {
    return this.http.get(
      `${enviroment.base_url}/restaurant-names?filter=${filter}`
    );
  }
}
