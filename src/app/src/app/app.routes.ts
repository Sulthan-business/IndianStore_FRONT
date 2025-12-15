import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  // 1. Default Route: Redirect empty path to 'products' (Home)
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },

  // 2. Shop Routes (Lazy Loaded)
  {
    path: 'products',
    loadComponent: () =>
    import('./features/features/product-catalog/product-catalog.component')
        .then(m => m.ProductCatalogComponent)
  },
  
  {
    path: 'products/:id',
    loadComponent: () =>
     import('./features/features/product-details/product-details.component')
        .then(m => m.ProductDetailsComponent)
  },

  {
    path: 'cart',
    loadComponent: () =>
    import('./features/features/cart/cart.component')
        .then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    canActivate: [authGuard], // Protected route
    loadComponent: () =>
      import('./features/features/checkout/checkout.component')
        .then(m => m.CheckoutComponent)
  },

  // 3. Admin/User Routes (Optional - kept if you still need them)
  { 
    path: 'dashboard', 
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent) 
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./features/profile/profile.component')
      .then(m => m.ProfileComponent) 
  },

  // 4. Wildcard: ALWAYS LAST
  // Redirect unknown paths to 'products' (or 'dashboard' if you prefer)
  {
    path: '**',
    redirectTo: 'products'
  }
];