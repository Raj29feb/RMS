import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { enviroment } from 'src/enviroments/enviroment';
import { UsernameResponse } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsername$(): Observable<UsernameResponse> {
    const token = localStorage.getItem('token');
    if (token) {
      return this.http.get<UsernameResponse>(`${enviroment.base_url}/username`);
    }

    return new Observable((observer) => {
      observer.next({ data: '' });
      observer.next();
    });
  }
}
