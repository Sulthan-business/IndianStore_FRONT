import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './core/auth.service'; // Adjust path if needed
import { CartService } from './core/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Inject the service to access the login signal
  authService = inject(AuthService);
  ngOnInit() {
  this.cartService.getCartItems();
}
  // You can also link a cart signal here later for the count
  cartCount = 0; 
protected cartService = inject(CartService);
  logout() {
    this.authService.logout();
  }
}