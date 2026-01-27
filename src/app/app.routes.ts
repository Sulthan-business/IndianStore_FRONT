import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) 
  },
  
  // Update: Using 'products' to match your Header routerLink
  { 
    path: 'products', 
    loadComponent: () => import('./features/product-catalog/product-catalog.component').then(m => m.ProductCatalogComponent)
  },
  // REMOVE canActivate here so anyone can see details
  { 
    path: 'products/:id', 
    loadComponent: () => import('./features/product-details/product-details.component').then(m => m.ProductDetailsComponent)
  },
  // Protected Routes
  { 
    path: 'checkout', 
    canActivate: [authGuard], 
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent) 
  },
  { 
   path: 'dashboard', 
    canActivate: [authGuard], 
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  { 
    path: 'profile', 
    canActivate: [authGuard], 
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent) 
  },

  // Authentication
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) 
  },
  { 
    path: 'cart', 
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) 
  },
];