import { Component, inject, OnInit, signal ,computed} from '@angular/core'; // signal ഇവിടെ ഇംപോർട്ട് ചെയ്തിരിക്കണം
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { OrderService } from '../../core/order.service';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})

export class CheckoutComponent implements OnInit {
  protected cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  checkoutItems = signal<any[]>([]);

  shippingDetails = {
    full_name: '',
    address: '',
    phone: '',
    city: ''
  };

  paymentMethod: string = 'COD';

  ngOnInit() {
    const state = window.history.state;

    if (state?.directBuyItem) {
      this.checkoutItems.set([state.directBuyItem]);
    } else if (state?.selectedItemId) {
      const item = this.cartService.items().find(i => i.id === state.selectedItemId);
      this.checkoutItems.set(item ? [item] : []);
    } else {
      // For full cart, ensure we have the latest items
      this.cartService.getCartItems();
      this.checkoutItems.set(this.cartService.items());
    }
  }

  totalAmount = computed(() => {
    return this.checkoutItems().reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  });

placeOrder() {
  const state = window.history.state;
  
  const orderData: any = {
    payment_method: this.paymentMethod,
    full_name: this.shippingDetails.full_name,
    address: this.shippingDetails.address,
    city: this.shippingDetails.city,
    phone: this.shippingDetails.phone,
    items: [] 
  };

  if (state?.directBuyItem) {
    // Direct Buy Path
    orderData.items.push({
      product: state.directBuyItem.product_id, // Add product ID here
      quantity: state.directBuyItem.quantity,
      unit_price: state.directBuyItem.price,
      total_price: state.directBuyItem.price * state.directBuyItem.quantity
    });
  } else {
    // Full Cart Path
    orderData.items = this.checkoutItems().map(item => ({
      product: item.product.id || item.product,// <--- THIS WAS MISSING
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity
    }));
    
    // Pass cart item IDs so backend can delete them after purchase
    orderData.selected_items = this.checkoutItems().map(item => item.id);
  }

  this.orderService.placeOrder(orderData).subscribe({
    next: (res) => {
      alert('Order Placed Successfully!');
      if (!state?.directBuyItem) {
        this.cartService.clearLocalCart();
      }
      this.router.navigate(['/']);
    },
    error: (err) => {
      console.error('Checkout error:', err.error);
      alert('Checkout failed: ' + JSON.stringify(err.error));
    }
  });
}
}