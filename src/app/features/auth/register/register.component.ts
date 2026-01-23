import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service'; // Using your core service

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss' // Scoped SCSS
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Data structure matching your Django API requirements
  registerData = {
    username: '', // Field for the hash string
    email: '',
    password: ''
  };

  loading = signal(false); // Signal for fast UI updates

  onRegister() {
    this.loading.set(true);
    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.loading.set(false);
        alert('Registration Successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading.set(false);
        alert('Registration failed. Check your connection or data.');
        console.error(err);
      }
    });
  }
}