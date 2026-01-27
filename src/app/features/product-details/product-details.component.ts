import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink ,} from '@angular/router'; // Import RouterLink
import { CommonModule } from '@angular/common'; // Import CommonModule for pipes
import { ProductDataService } from '../../core/product-data.service';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/cart.service';
import { Router } from '@angular/router'; // 1. Router import cheyyanam
@Component({
  selector: 'app-product-details',
  standalone: true,
  // Add CommonModule and RouterLink here
  imports: [CommonModule, RouterLink], 
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductDataService);
  private router = inject(Router); // 2. Router ivide inject cheyyam
  private cartService = inject(CartService); // 1. Inject CartService
  // Use a Signal to track the product for maximum speed
  product = signal<Product | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Fetch the specific product from your Django backend
      this.productService.getProductById(id).subscribe({
        next: (data) => this.product.set(data),
        error: (err) => console.error('Error loading details:', err)
      });
    }
  }
  handleAddToCart() {
    const currentProduct = this.product();
    if (currentProduct) {
      this.cartService.addToCart(currentProduct.id).subscribe({
        next: () => {
          // Navigate to the cart page immediately after success
          this.router.navigate(['/cart']); 
        },
        error: (err) => console.error('Error adding to cart:', err)
      });
    }
  }
  
  buyNow() {
  const currentProduct = this.product();
  if (currentProduct) {
    this.cartService.addToCart(currentProduct.id).subscribe({
      next: () => this.router.navigate(['/checkout']),
      error: (err) => console.error('Error in Buy Now:', err)
    });
  }
}}