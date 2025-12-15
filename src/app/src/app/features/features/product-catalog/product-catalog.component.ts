import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// ⚠️ CORRECTED PATH: Only go up one level (../)
import { ProductDataService } from '../../../core/product-data.service';
import { Product } from '../../../core/models/product.model';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule,RouterLink], // Add CommonModule for directives
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.scss'
})
export class ProductCatalogComponent implements OnInit {
  // Inject the service using the modern inject() function
  private productDataService = inject(ProductDataService);
  
  products: Product[] = [];

  ngOnInit() {
    // Get the product list when the component initializes
    this.products = this.productDataService.getProducts();
  }
}