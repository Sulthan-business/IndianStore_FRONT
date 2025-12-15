import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductDataService } from '../../../core/product-data.service';

import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/cart.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
 imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productDataService = inject(ProductDataService);
  private cartService = inject(CartService); // 👈 CRITICAL: CartService Injection
  
  product: Product | undefined;
  quantity: number = 1; // Default quantity

  ngOnInit() {
    // 1. Get the 'id' from the URL and fetch the corresponding product
    this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        const productId = idParam ? +idParam : 0; // Convert string to number
        
        // Find the product
        const foundProduct = this.productDataService.getProductById(productId);
        
        // Use 'of' to return the product wrapped in an Observable
        return of(foundProduct);
      })
    ).subscribe(product => {
      this.product = product;
    });
  }

  // 2. The function the "Add to Cart" button calls
  addToCart() {
    if (this.product && this.quantity > 0) {
      // 👈 CRITICAL: Call the service method
      this.cartService.addToCart(this.product, this.quantity);
      
      // Optional: Give visual feedback
      alert(`${this.quantity} x ${this.product.name} added to cart!`);
    }
  }

  // 3. Simple input change handler
  onQuantityChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.quantity = Math.max(1, Number(input.value)); // Ensure quantity is at least 1
  }
}