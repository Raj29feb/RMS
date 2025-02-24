import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsername$(): Observable<{ data: string }> {
    const token = localStorage.getItem('token');
    if (token) {
      return this.http.get<{ data: string }>(`${enviroment.base_url}/username`);
    }

    return new Observable((observer) => {
      observer.next({ data: '' });
      observer.next();
    });
  }
}
