export interface Product {
  id: string;
  name: string;
  price: number;
  parcelamento: Array<number>;
  color: string;
  image: string;
  size: Array<string>;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Filters {
  size: string;
  color: string[];
  price: string[];
}

export type OrderFunctions = {
  'menor preço': (a: Product, b: Product) => number;
  'maior preço': (a: Product, b: Product) => number;
  'mais recentes': (a: Product, b: Product) => number;
};

export type RenderOptionsType = {
  start: number,
  end: number,
  filters?: Filters,
  sortOrder?: (a: Product, b: Product) => number
}