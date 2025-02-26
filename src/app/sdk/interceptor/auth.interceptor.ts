import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, Observable, take, tap, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private snackbar: SnackbarService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(clonedRequest).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 403) {
            this.router.navigate(['/auth/login']);
            localStorage.clear();
          }
          throw err;
        })
      );
    }

    return next.handle(req);
  }
}
