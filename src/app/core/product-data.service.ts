import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Product, ProductResponse } from './models/product.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductDataService {
  private http = inject(HttpClient);
  private readonly BASE_URL = `${environment.apiUrl}/products`;

  products = signal<Product[]>([]);
  loading = signal<boolean>(false);

  getProducts() {
    // Performance Optimization: Don't show loading if we already have data
    if (this.products().length === 0) {
      this.loading.set(true);
    }

    return this.http.get<ProductResponse>(`${this.BASE_URL}/`).pipe(
      tap(res => {
        this.products.set(res.results);
        this.loading.set(false);
      })
    );
  }

  // GET /api/products/{id}/
  getProductById(id: string | number) {
    return this.http.get<Product>(`${this.BASE_URL}/${id}/`);
  }
}