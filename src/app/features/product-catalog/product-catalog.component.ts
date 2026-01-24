import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductDataService } from '../../core/product-data.service';

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
  // Use protected so the template can see it, but other components cannot
  protected productService = inject(ProductDataService);

  // Directly link to signals for O(1) change detection speed
  allProducts = this.productService.products;
  isLoading = this.productService.loading;

  ngOnInit(): void {
    // Single-shot execution to hydrate the signal
    this.productService.getProducts().subscribe();
  }
}