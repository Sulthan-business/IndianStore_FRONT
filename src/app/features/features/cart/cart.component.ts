import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/cart.service';
import { CartItem } from '../../../core/models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink], // RouterLink added for navigation buttons
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private cartService = inject(CartService);
  
  cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;

  // 👈 ADD THIS FUNCTION TO FIX THE NG9 ERROR
  trackByFn(index: number, item: CartItem): number {
    return item.product.id;
  }
  // Method to expose service logic to the template
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  // Method to handle quantity change from the input field
  onQuantityChange(productId: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantity = Number(input.value);
    this.cartService.updateQuantity(productId, quantity);
  }

  // ... existing trackByFn() ...

}