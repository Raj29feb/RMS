import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { enviroment } from 'src/enviroments/enviroment';
import { SnackbarService } from 'src/app/sdk/services/snackbar/snackbar.service';
import { LoginForm, LoginResponse } from '../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  login$(payload: LoginForm): Observable<LoginResponse> {
    return this.http.post(
      `${enviroment.base_url}/login`,
      payload
    ) as Observable<LoginResponse>;
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

  checkLogin(): boolean {
    const user = localStorage.getItem('token');
    if (user) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.clear();
    this.snackbar.openSnackBar(false, 'User logged out successfully');
    this.router.navigate(['/auth/login']);
  }
}
