export interface Product {
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stockStatus: 'In Stock' | 'Out of Stock';
  shippingDays: number;      // Essential for Dropshipping
  supplierLocation: string;  // e.g., 'Warehouse A' or 'International'
}
export interface CartItem {
  product: Product;
  quantity: number;
}