import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  checkLogin(): boolean {
    const user = localStorage.getItem('token');
    if (user) {
      return true;
    }
    return false;
  }
}
