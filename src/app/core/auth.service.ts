import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private loggedIn = false; 

  // Public method to retrieve the current state
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login() {
    this.loggedIn = true;
    console.log('User logged in!');
  }

  // 👈 FIX: The missing public logout method
  logout() {
    this.loggedIn = false;
    console.log('User logged out!');
  }
}
