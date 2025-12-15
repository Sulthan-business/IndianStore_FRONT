import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/cart.service';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
private cartService = inject(CartService);

  // Expose the cart items and total price to the template
  cartItems$ = this.cartService.cartItems$;
  
  get totalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  // Final Action: Process the order and clear the cart
  confirmOrder() {
    alert(`Order placed successfully! Total amount: $${this.totalPrice.toFixed(2)}. Thank you for shopping with Kids' Shop!`);
    this.cartService.clearCart();
  }
}
