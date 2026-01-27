import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush // Extra speed boost
})
export class CartComponent implements OnInit {
  protected cartService = inject(CartService);
  
  // Direct Signal references
  items = this.cartService.items;
  totalPrice = this.cartService.totalPrice;

  ngOnInit(): void {
    this.cartService.getCartItems();
  }

  changeQty(id: number, current: number, delta: number) {
    const newQty = current + delta;
    if (newQty > 0) {
      this.cartService.updateQuantity(id, newQty).subscribe();
    }
  }
}