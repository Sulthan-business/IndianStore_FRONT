import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/cart.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-cart-summary',
 standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <button routerLink="/cart" class="cart-summary-btn">
      🛒 Cart (<span class="item-count">{{ totalItems$ | async }}</span>)
    </button>
  `,
})
export class CartSummaryComponent {
  private cartService = inject(CartService);

  // Observable to hold the total number of items in the cart (not unique products)
  totalItems$: Observable<number> = this.cartService.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + item.quantity, 0))
  );
}
