import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Product, ProductResponse } from './models/product.model';
import { tap } from 'rxjs';
// src/app/core/product-data.service.ts
@Injectable({ providedIn: 'root' })
export class ProductDataService {
  private http = inject(HttpClient);
  private readonly BASE_URL = `${environment.apiUrl}/products`;

  products = signal<Product[]>([]);
  loading = signal<boolean>(false);

  // Added 'params' to handle Category, Trending, or Dropship filters
  getProducts(filterParams?: { category?: string; trending?: boolean; dropship?: boolean }) {
    if (this.products().length === 0) {
      this.loading.set(true);
    }

    let queryParams: any = {};
    if (filterParams?.category) queryParams.category = filterParams.category;
    if (filterParams?.trending) queryParams.trending = 'true';
    if (filterParams?.dropship) queryParams.dropship = 'true';

    return this.http.get<ProductResponse>(`${this.BASE_URL}/`, { params: queryParams }).pipe(
      tap(res => {
        this.products.set(res.results);
        this.loading.set(false);
      })
    );
  }

  getProductById(id: string | number) {
    return this.http.get<Product>(`${this.BASE_URL}/${id}/`);
  }
}