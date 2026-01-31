import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // ഇതിനായി CommonModule ചേർക്കുക
import { ActivatedRoute } from '@angular/router'; // URL-ൽ നിന്ന് ID എടുക്കാൻ
import { OrderService } from '../../core/order.service';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule], // ഇവിടെ CommonModule ചേർക്കണം
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss'
})
export class OrderTrackingComponent implements OnInit {
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute); // Route ഇൻജക്ട് ചെയ്യുന്നു

  fulfillmentData = signal<any>(null);
  orderId: string | null = null; // orderId ഇവിടെ ഡിക്ലയർ ചെയ്യുന്നു

  ngOnInit() {
    // URL-ൽ നിന്ന് order id എടുക്കുന്നു (ഉദാഹരണത്തിന്: /track-order/10)
    this.orderId = this.route.snapshot.paramMap.get('id');

    if (this.orderId) {
      // നമ്പറിലേക്ക് മാറ്റി സർവീസിലേക്ക് അയക്കുന്നു
      this.orderService.getFulfillmentStatus(Number(this.orderId)).subscribe({
        next: (data) => {
          this.fulfillmentData.set(data);
        },
        error: (err) => console.error('Fulfillment fetch error:', err)
      });
    }
  }
}