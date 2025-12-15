import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  // 1. Define the Product object as an Input property
  // The '!' tells TypeScript that this property will definitely be assigned (by the parent component)
  @Input({ required: true }) product!: Product;

  // Since we are only linking to the details page, no other logic is needed here yet.
  // The 'Add to Cart' button will be on the Details page for now.
}