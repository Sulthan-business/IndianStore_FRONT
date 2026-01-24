export interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  cod_allowed: boolean;
  image: string;
  description: string; // Now required for the details page
}
export interface ProductResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}