import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/cart`; 

  // Master Signal for high-speed state management
  private cartItemsSignal = signal<any[]>([]);
  
  // Publicly exposed signals for components
  items = this.cartItemsSignal.asReadonly();
  // Ensure these exist in your CartService class
addToCart(productId: number, quantity: number = 1): Observable<any> {
  const payload = { product: productId, quantity };
  return this.http.post<any>(`${this.apiUrl}/`, payload).pipe(
    tap(() => this.getCartItems()) // Update signals after adding
  );
}
  // Computed Signals: Recalculate instantly on the frontend
  totalItems = computed(() => this.cartItemsSignal().reduce((acc, item) => acc + item.quantity, 0));
  totalPrice = computed(() => this.cartItemsSignal().reduce((acc, item) => acc + (item.price * item.quantity), 0));

  // 1. Get Items: Handles DRF pagination results
  getCartItems() {
    this.http.get<any>(`${this.apiUrl}/`).subscribe({
      next: (response) => {
        this.cartItemsSignal.set(response.results || []);
      },
      error: (err) => console.error('Failed to load cart items', err)
    });
  }

  // 2. Optimistic Update: Change UI instantly, then sync with Django
  updateQuantity(cartItemId: number, newQuantity: number): Observable<any> {
    const previousItems = this.cartItemsSignal();

    // Instant UI update logic
    this.cartItemsSignal.update(items => 
      items.map(item => item.id === cartItemId ? { ...item, quantity: newQuantity } : item)
    );

    return this.http.patch<any>(`${this.apiUrl}/${cartItemId}/`, { quantity: newQuantity }).pipe(
      tap({
        error: () => this.cartItemsSignal.set(previousItems) // Rollback if API fails
      })
    );
  }

  // 3. Instant Removal
  removeItem(cartItemId: number): Observable<any> {
    const previousItems = this.cartItemsSignal();

    // Remove from UI immediately
    this.cartItemsSignal.update(items => items.filter(item => item.id !== cartItemId));

    return this.http.delete<any>(`${this.apiUrl}/${cartItemId}/`).pipe(
      tap({
        error: () => this.cartItemsSignal.set(previousItems) // Rollback if API fails
      })
    );
  }
}