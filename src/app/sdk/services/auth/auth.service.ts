import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { enviroment } from 'src/enviroments/enviroment';
import { SnackbarService } from 'src/app/sdk/services/snackbar/snackbar.service';
import {
  LoginForm,
  LoginResponse,
  RegisterResponse,
} from '../../interfaces/auth.interface';

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
    return this.http.post<LoginResponse>(
      `${enviroment.base_url}/login`,
      payload
    );
  }

  register$(payload: {
    email: string;
    password: string;
  }): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${enviroment.base_url}/register`,
      payload
    );
  }

  checkLogin(): boolean {
    const user = localStorage.getItem('token');
    if (user) {
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.clear();
    this.snackbar.openSnackBar(false, 'User logged out successfully');
    this.router.navigate(['/auth/login']);
  }
}
