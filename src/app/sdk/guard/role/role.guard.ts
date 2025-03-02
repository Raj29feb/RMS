import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { map, of } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  return userService.checkRole$().pipe(
    map((res) => {
      if (res.role !== 'user') {
        router.navigate(['/restaurants']);
        return false;
      }
      return true;
    })
  );
};
