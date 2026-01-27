import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductDataService } from '../../core/product-data.service';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/cart.service';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink], 
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.scss',
  // High Speed: Only checks for changes when Signals update
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ProductCatalogComponent implements OnInit {
  protected productService = inject(ProductDataService);
  private cartService = inject(CartService); // <--- Add this!

  allProducts = this.productService.products;
  isLoading = this.productService.loading;

  ngOnInit(): void {
    this.productService.getProducts().subscribe();
  }

  addToCart(product: Product) {
    // We use product.id here based on your Product model
    this.cartService.addToCart(product.id).subscribe({
      next: () => {
        console.log('Product added successfully');
        // You could use a snackbar here instead of a hard alert
      },
      error: (err) => console.error('Error adding to cart:', err)
    });
  }
}