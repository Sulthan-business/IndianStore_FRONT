import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
private authService = inject(AuthService);
  private router = inject(Router);

  loginData = { email: '', password: '' };

  // 💡 FIX 1: Convert isLoggedIn check into a method call
  // We use a getter to ensure this value is re-evaluated every time the template checks it.
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      this.authService.login();
      // isLoggedIn getter handles the status update
      alert("Login successful! You can now access Checkout.");
      this.router.navigate(['/checkout']);
    } else {
      alert("Please enter both email and password.");
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/products']);
  }
}
