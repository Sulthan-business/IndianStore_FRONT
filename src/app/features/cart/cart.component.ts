import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/cart.service';
import { Router } from '@angular/router';
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
  private router = inject(Router);
  // Direct Signal references
  items = this.cartService.items;
  totalPrice = this.cartService.totalPrice;

  ngOnInit(): void {
    this.cartService.getCartItems();
  }

  changeQty(item: any, delta: number) {
    const newQty = item.quantity + delta;
    if (newQty > 0) {
      // സ്റ്റോക്ക് ചെക്ക് ലോജിക് ഇവിടെ ചേർക്കാം
      this.cartService.updateQuantity(item.id, newQty).subscribe({
        error: (err) => alert('Stock not available!')
      });
    }
  }

  buyThisItem(item: any) {
    // Single item checkout - passes the ID to filter in CheckoutComponent
    this.router.navigate(['/checkout'], { 
      state: { selectedItemId: item.id } 
    });
  }
  goToCheckout() {
    // Full cart checkout - no specific state passed, so CheckoutComponent loads all
    if (this.items().length > 0) {
      this.router.navigate(['/checkout']);
    } else {
      alert("Your cart is empty!");
    }
  }
}