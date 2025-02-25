import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const loginStatus = authService.checkLogin();

  if (loginStatus && route.routeConfig?.path === 'auth') {
    router.navigate(['/restaurants']);
    return false;
  }

  if (!loginStatus && route.routeConfig?.path !== 'auth') {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
