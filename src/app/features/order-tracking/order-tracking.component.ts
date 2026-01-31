import { CommonModule } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router'; 
import { OrderService } from '../../core/order.service';
import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { timer, Subscription, switchMap } from 'rxjs'; // 👈 ഇവ ചേർക്കുക
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss'
})
export class OrderTrackingComponent implements OnInit {
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);

  fulfillmentData = signal<any>(null);
  orderId: string | null = null;
  private subscription?: Subscription;

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');

    if (this.orderId) {
      // ഓരോ 60 സെക്കന്റിലും ഓട്ടോമാറ്റിക്കായി ചെക്ക് ചെയ്യുന്നു
      this.subscription = timer(0, 60000).pipe(
        switchMap(() => this.orderService.getFulfillmentStatus(Number(this.orderId)))
      ).subscribe({
        next: (response: any) => {
          const dataArray = response.results ? response.results : response;
          
          if (Array.isArray(dataArray) && dataArray.length > 0) {
            // ഏറ്റവും പുതിയ സ്റ്റാറ്റസ് (ലിസ്റ്റിലെ അവസാനത്തെ ഐറ്റം) എടുക്കുന്നു
            const latestData = dataArray[dataArray.length - 1];

            // ആഘോഷം: പഴയ സ്റ്റാറ്റസ് DELIVERED അല്ലായിരുന്നുവെങ്കിൽ മാത്രം പൂത്തിരി കത്തിക്കുക
            if (this.fulfillmentData()?.status !== 'DELIVERED' && latestData.status === 'DELIVERED') {
              this.celebrate();
            }

            this.fulfillmentData.set(latestData);

            // സാധനം കിട്ടിക്കഴിഞ്ഞാൽ പിന്നെ ചെക്ക് ചെയ്യുന്നത് നിർത്താം
            if (latestData.status === 'DELIVERED') {
              this.subscription?.unsubscribe();
            }
          }
        },
        error: (err) => console.error('Polling error:', err)
      });
    }
  }

  // പൂത്തിരി അനിമേഷൻ ഫംഗ്‌ഷൻ
  celebrate() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff9a8b', '#ff6b6b', '#2ecc71']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff9a8b', '#ff6b6b', '#2ecc71']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}