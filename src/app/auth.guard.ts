import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state
) => {
  // Inject AuthService and Router using Angular's DI
  const authService = inject(AuthService);
  const router = inject(Router);

  const loginStatus = authService.checkLogin();

  // If the user is logged in and trying to access the login page
  if (loginStatus && route.routeConfig?.path === 'login') {
    // Redirect to the user lobby or home page
    router.navigate(['/restaurants']); // Or any other route you prefer
    return false; // Prevent navigation
  }

  // If the user is not logged in and trying to access a protected route
  if (!loginStatus && route.routeConfig?.path !== 'login') {
    // Redirect to the login page
    router.navigate(['/login']);
    return false; // Prevent navigation
  }

  return true; // Allow navigation
};
