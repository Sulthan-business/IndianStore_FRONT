import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/orders`; // നിങ്ങളുടെ Django orders API URL
  private dropshipUrl = `${environment.apiUrl}/dropship`; // Dropship app URL

  // 1. കസ്റ്റമറുടെ ഓർഡർ ലിസ്റ്റ് എടുക്കാൻ
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }

  // 2. ഓർഡറിന്റെ ട്രാക്കിംഗ് വിവരങ്ങൾ (Fulfillment) എടുക്കാൻ
  // സപ്ലയർ വെബ്ഹുക്ക് വഴി അപ്‌ഡേറ്റ് ചെയ്ത വിവരങ്ങൾ ഇവിടെ ലഭിക്കും
  getFulfillmentStatus(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.dropshipUrl}/fulfillment/?order_id=${orderId}`);
  }

  // 3. ഓർഡർ പ്ലേസ് ചെയ്യാൻ (Checkout-ൽ ഉപയോഗിക്കുന്നത്)
  placeOrder(orderData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, orderData);
  }
}