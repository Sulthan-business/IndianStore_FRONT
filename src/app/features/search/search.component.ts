import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductDataService } from '../../core/product-data.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  private productService = inject(ProductDataService);
  
  searchQuery = signal<string>('');
  currentCategory = signal<string>('');

  ngOnInit() {
    // പേജ് ലോഡ് ചെയ്യുമ്പോൾ പ്രോഡക്റ്റുകൾ ഉണ്ടെന്ന് ഉറപ്പാക്കാൻ സർവീസ് കാൾ ചെയ്യുന്നു
    this.productService.getProducts().subscribe();
  }

  // സർവീസിലെ സിഗ്നലിൽ നിന്ന് നേരിട്ട് ഡാറ്റ എടുക്കുന്നു
  filteredProducts = computed(() => {
    const products = this.productService.products();
    const query = this.searchQuery().toLowerCase();
    const category = this.currentCategory();

    if (!products) return [];

    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(query);
      const matchesCategory = category === '' || product.category_name === category;
      return matchesSearch && matchesCategory;
    });
  });

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  filterByCategory(category: string) {
    this.currentCategory.set(category);
  }
}