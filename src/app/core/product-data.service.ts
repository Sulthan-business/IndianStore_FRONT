import { Injectable } from '@angular/core';

import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private mockProducts: Product[] = [
    {
      id: 1,
      name: 'Rainbow Block Set',
      category: 'Toy',
      price: 24.99,
      description: 'Bright wooden blocks for creative building.',
      imageUrl: 'rainbow.jpg'
    },
    {
      id: 2,
      name: 'Dinosaur T-Shirt',
      category: 'Clothing',
      price: 15.50,
      description: 'Soft cotton tee with a fun T-Rex graphic.',
      imageUrl: 'dino.jpg'
    },
    {
      id: 3,
      name: 'Adventure Story Book',
      category: 'Book',
      price: 9.99,
      description: 'A beautifully illustrated tale of space exploration.',
      imageUrl: 'book.jpg'
    }
  ];

  getProducts(): Product[] {
    return this.mockProducts;   // FIXED
  }

  getProductById(id: number): Product | undefined {
    return this.mockProducts.find(p => p.id === id);
  }
}
