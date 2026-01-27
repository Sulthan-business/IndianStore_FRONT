import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  // Inject the service as protected so the template can see it
  protected cartService = inject(CartService);

  shippingDetails = {
    full_name: '',
    address: '',
    phone: '',
    city: ''
  };

  ngOnInit() {
    // Ensure the signals are hydrated with the latest data
    this.cartService.getCartItems();
  }

  placeOrder() {
    // Access signal values using ()
    const total = this.cartService.totalPrice();
    console.log('Order placed for amount:', total, this.shippingDetails);
    // Logic for POST /api/orders/ goes here
  }
}