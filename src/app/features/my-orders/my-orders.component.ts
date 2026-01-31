import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../core/order.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  orders = signal<any[]>([]);
  isLoading = signal(true);
ngOnInit() {
  this.orderService.getOrders().subscribe({
    next: (response: any) => {
      // റെസ്‌പോൺസിലെ 'results' മാത്രം എടുത്ത് ഓർഡർ സിഗ്നലിലേക്ക് നൽകുന്നു
      const ordersData = response.results ? response.results : response;
      this.orders.set(ordersData);
      this.isLoading.set(false);
    },
    error: (err) => {
      console.error('Error fetching orders:', err);
      this.isLoading.set(false);
    }
  });
}

  // ഓരോ സ്റ്റാറ്റസിനും അനുയോജ്യമായ സ്റ്റൈൽ ക്ലാസ് നൽകാൻ
  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'CREATED': 'Order Received',
      'PLACED': 'Processing',
      'SHIPPED': 'Shipped',
      'FULFILLED': 'Delivered',
      'CANCELLED': 'Cancelled'
    };
    return statusMap[status] || status;
  }
}