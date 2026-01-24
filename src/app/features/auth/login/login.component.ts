import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss' // Connects your SCSS file
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Define the properties that the HTML is looking for
  loginData = {
    username: '',
    password: ''
  };

  // Signal for loading state (used in [disabled] and {{ }} in HTML)
  loading = signal(false);

  onLogin() {
    this.loading.set(true);
    
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        this.loading.set(false);
        // Change '/dashboard' to '/home' or '/products' for a better shopping flow
        this.router.navigate(['/home']); 
      },
      error: (err) => {
        this.loading.set(false);
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}