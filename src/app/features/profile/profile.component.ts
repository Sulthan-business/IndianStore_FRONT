import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
private authService = inject(AuthService);
  private router = inject(Router);

  // Expose the current login status to the template
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Method to log the user out
  logout() {
    this.authService.logout();
    alert('You have been logged out.');
    this.router.navigate(['/products']);
  }
}