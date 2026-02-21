import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductDataService } from '../../core/product-data.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductDataService);

  // ഓരോ സെക്ഷനുമായി പ്രത്യേകം സിഗ്നലുകൾ
  trendingProducts = signal<Product[]>([]);
  mommyProducts = signal<Product[]>([]);

  ngOnInit() {
    // Trending ഉൽപ്പന്നങ്ങൾ മാത്രം എടുക്കുന്നു
    this.productService.getProducts({ trending: true }).subscribe(res => {
      this.trendingProducts.set(res.results.slice(0, 4)); 
    });

    // 'Mommy' കാറ്റഗറിയിലുള്ള ഉൽപ്പന്നങ്ങൾ മാത്രം എടുക്കുന്നു
    this.productService.getProducts({ category: 'Mommy' }).subscribe(res => {
      this.mommyProducts.set(res.results.slice(0, 4));
    });
  }
}