import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductDataService } from '../../../core/product-data.service';

import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productDataService = inject(ProductDataService);
  
  product: Product | undefined;

  ngOnInit() {
    // 1. Subscribe to changes in the URL parameters
    this.route.paramMap.subscribe(params => {
      // 2. Extract the 'id' from the URL (which we named 'id' in app.routes.ts)
      const productId = Number(params.get('id')); 

      // 3. Fetch the product using the core service
      this.product = this.productDataService.getProductById(productId);
    });
  }
}