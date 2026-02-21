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
  imports: [CommonModule], 
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
  selectedImage = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          this.product.set(data);
          // Set initial large image to the main thumbnail
          this.selectedImage.set(data.image);
        },
        error: (err) => console.error('Error loading details:', err)
      });
    }
  }
  setPreviewImage(imgUrl: string) {
    this.selectedImage.set(imgUrl);
  }
  isDescriptionExpanded = signal<boolean>(false);

toggleDescription() {
  this.isDescriptionExpanded.update(val => !val);
}
isDescOpen = signal<boolean>(false);

toggleDesc() {
  this.isDescOpen.update(v => !v);
}
  // product-details.component.ts
nextImage() {
  const images = [this.product()?.image, ...(this.product()?.images?.map(i => i.image) || [])];
  const idx = images.indexOf(this.selectedImage()!);
  const next = (idx + 1) % images.length;
  this.selectedImage.set(images[next] || null);
}
handleAddToCart() {
  const currentProduct = this.product();
  if (currentProduct) {
    this.cartService.addToCart(currentProduct.id).subscribe({
      next: () => {
        // Option 1: Navigate to cart (Your current setup)
        // this.router.navigate(['/cart']); 

        // Option 2: Stay on page but show success (Better UX)
        // alert(`${currentProduct.name} added to cart!`);
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        alert('Could not add to cart. Please try again.');
      }
    });
  }
}
  buyNow() {
  const p = this.product();
  if (p) {
    // Send data via 'state' - no database hit yet!
    this.router.navigate(['/checkout'], { 
      state: { 
        directBuyItem: { 
          product_id: p.id, 
          product_name: p.name, 
          price: p.price, 
          quantity: 1 
        } 
      } 
    });
  }


}}