import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Import RouterLink
import { CommonModule } from '@angular/common'; // Import CommonModule for pipes
import { ProductDataService } from '../../core/product-data.service';
import { Product } from '../../core/models/product.model';

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
}