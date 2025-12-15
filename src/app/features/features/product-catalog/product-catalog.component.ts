import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// ⚠️ CORRECTED PATH: Only go up one level (../)
import { ProductDataService } from '../../../core/product-data.service';
import { Product } from '../../../core/models/product.model';

import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../../shared/shared/ui/product-card/product-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
 imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.scss'
})
export class ProductCatalogComponent implements OnInit {
  private productDataService = inject(ProductDataService);
  
  // All products fetched from the service
  allProducts: Product[] = []; 
  // Products currently displayed (after filtering)
  filteredProducts: Product[] = []; 

  // Variables bound to the filter inputs
  searchTerm: string = '';
  selectedCategory: string = 'All';

  // Available categories for the dropdown (including the 'All' option)
  categories = ['All', 'Toy', 'Clothing', 'Book'];

  ngOnInit() {
    // 💡 FIX 1: Ensure allProducts is loaded first
    this.allProducts = this.productDataService.getProducts();
    
    // 💡 FIX 2: Call filterProducts immediately on initialization
    this.filterProducts(); 
  }

  // Logic: Applies all active filters
  filterProducts() {
    let results = this.allProducts;

    // 1. Filter by Category
    if (this.selectedCategory !== 'All') {
      results = results.filter(product => product.category === this.selectedCategory);
    }

    // 2. Filter by Search Term (Name)
    if (this.searchTerm) {
      const lowerCaseTerm = this.searchTerm.toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(lowerCaseTerm)
      );
    }

    // 💡 FIX 3: Update the display list
    this.filteredProducts = results;
  }
}