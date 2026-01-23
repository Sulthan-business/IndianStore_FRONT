import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment'; 
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  
  // This uses your Global Link from the environment file
  private readonly BASE_URL = `${environment.apiUrl}/users`;

  // Track authentication state with Signals for Angular 19 speed
  isLoggedIn = signal<boolean>(!!localStorage.getItem('access'));

  // POST /api/users/login/
  login(credentials: {username: string, password: string}) {
    return this.http.post(`${this.BASE_URL}/login/`, credentials).pipe(
      tap((res: any) => this.setSession(res))
    );
  }

  // POST /api/users/register/
  register(data: {username: string, email: string, password: string}) {
    return this.http.post(`${this.BASE_URL}/register/`, data);
  }

  // POST /api/users/refresh/
  refreshToken() {
    const refresh = localStorage.getItem('refresh');
    return this.http.post(`${this.BASE_URL}/refresh/`, { refresh }).pipe(
      tap((res: any) => localStorage.setItem('access', res.access))
    );
  }

  private setSession(res: any) {
    localStorage.setItem('access', res.access);
    localStorage.setItem('refresh', res.refresh);
    this.isLoggedIn.set(true);
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn.set(false);
  }
}