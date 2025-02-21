import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap, Observable, of, tap } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  login$(payload: {
    email: string;
    password: string;
  }): Observable<{ message: string; data: object }> {
    return this.http.post(
      `${enviroment.base_url}/login`,
      payload
    ) as Observable<{ message: string; data: object }>;
  }

  register$(payload: {
    email: string;
    password: string;
  }): Observable<{ message: string; data: object }> {
    return this.http.post(
      `${enviroment.base_url}/register`,
      payload
    ) as Observable<{ message: string; data: object }>;
  }

  logout() {
    localStorage.clear();
    this.snackbar.openSnackBar(false, 'User logged out successfully');
    this.router.navigate(['login']);
  }
  getUsername(): Observable<{ data: string }> {
    const token = localStorage.getItem('token');
    if (token) {
      return this.http.get<{ data: string }>(`${enviroment.base_url}/username`);
    }

    return new Observable((observer) => {
      observer.next({ data: '' });
      observer.next();
    });
  }
  createAddress(data: Array<object>): Observable<Object> {
    if (data)
      return this.http
        .post(`${enviroment.base_url}/add-address`, data.reverse())
        .pipe(
          tap((response: any) => {
            this.snackbar.openSnackBar(false, response.message);
          }),
          map(() => {
            return this.getAddresses();
          })
        );
    return new Observable((observer) => {
      observer.next({ message: "Address can't be empty", data: [] });
      observer.next();
    });
  }
  getAddresses(): Observable<any> {
    return this.http
      .get(`${enviroment.base_url}/get-address`)
      .pipe(map((response: any) => response.data.reverse()));
  }
}
