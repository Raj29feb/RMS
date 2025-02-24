import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable, tap } from 'rxjs';

import { enviroment } from 'src/enviroments/enviroment';
import { SnackbarService } from 'src/app/sdk/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private http: HttpClient, private snackbar: SnackbarService) {}

  createDishes$(data: Array<object>): Observable<Object> {
    if (data)
      return this.http
        .post(`${enviroment.base_url}/add-dishes`, data.reverse())
        .pipe(
          tap((response: any) => {
            this.snackbar.openSnackBar(false, response.message);
          }),
          map(() => {
            return this.getDishes$('all');
          })
        );
    return new Observable((observer) => {
      observer.next({ message: "Address can't be empty", data: [] });
      observer.next();
    });
  }

  getDishes$(restaurantId: string): Observable<any> {
    return this.http
      .get(`${enviroment.base_url}/dishes?data=${restaurantId}`)
      .pipe(map((response: any) => response.data.reverse()));
  }

  getDish$(id: string): Observable<any> {
    return this.http.get(`${enviroment.base_url}/dish/${id}`);
  }
}
