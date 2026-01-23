import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Use the signal to check login status
  if (authService.isLoggedIn()) {
    return true;
  } else {
    // Redirect to login if not authenticated
    return router.parseUrl('/login');
  }
};