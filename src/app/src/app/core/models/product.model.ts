export interface Product {
}
export interface Product {
  id: number;
  name: string;
  category: 'Toy' | 'Clothing' | 'Book';
  price: number;
  description: string;
  imageUrl: string; // URL for the product image
}
export interface CartItem {
  product: Product;
  quantity: number;
}