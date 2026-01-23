import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'products', 
    loadComponent: () => import('./features/product-catalog/product-catalog.component').then(m => m.ProductCatalogComponent) 
  },
  { 
    path: 'product/:id', 
    loadComponent: () => import('./features/product-details/product-details.component').then(m => m.ProductDetailsComponent) 
  },
  { 
    path: 'cart', 
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) 
  },
  { 
    path: 'checkout', 
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent) 
  },
  { 
    path: 'search', 
    loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent) 
  }
];