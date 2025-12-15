import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  
  // Publicly exposed Observable for components to subscribe to
  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  // 1. Private Getter (Fixes TS2339)
  private get currentCart(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  constructor() { }

  addToCart(product: Product, quantity: number = 1) {
    const currentItems = this.currentCart;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }

    this.cartItemsSubject.next(currentItems);
  }

  // 2. Remove Method (Fixes TS7006 implicit any/TS2339 currentCart)
  removeFromCart(productId: number) {
    const updatedItems = this.currentCart.filter((item: CartItem) => item.product.id !== productId);
    this.cartItemsSubject.next(updatedItems);
  }

  // 3. Update Quantity Method (Fixes TS7006 implicit any/TS2339 currentCart)
  updateQuantity(productId: number, quantity: number) {
    const currentItems = this.currentCart;
    const itemToUpdate = currentItems.find((item: CartItem) => item.product.id === productId);

    if (itemToUpdate) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }
      itemToUpdate.quantity = quantity;
      this.cartItemsSubject.next(currentItems);
    }
  }
  getTotalPrice(): number {
    return this.currentCart.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }
  clearCart() {
    this.cartItemsSubject.next([]);
  }
}