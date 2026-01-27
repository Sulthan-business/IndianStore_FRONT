import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('access'); // Key used in your AuthService

  // Clone request with the current token if it exists
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  // Handle the request and listen for errors
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Check for 'token_not_valid' which matches your Django error
      if (error.status === 401 && error.error.code === 'token_not_valid') {
        
        // Attempt to refresh the token using your AuthService logic
        return authService.refreshToken().pipe(
          switchMap((res: any) => {
            // Retry the original request with the NEW access token
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${res.access}` }
            });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            // If the refresh token is also expired, log the user out
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};