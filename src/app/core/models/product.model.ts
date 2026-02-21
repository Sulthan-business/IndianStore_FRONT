export interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  cod_allowed: boolean;
  image: string;      // Main image
  images: ProductImage[]; // Multi-image array
  description: string;
  is_trending: boolean;
  is_common_dropship: boolean;
  category?: number;      // Category ID
  category_name?: string;
}
export interface ProductImage {
  id: number;
  image: string;
}
export interface ProductResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}