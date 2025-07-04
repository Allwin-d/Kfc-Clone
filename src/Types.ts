export type Product = {
  id: number;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  description: string;
  imageUrl: string;
  serves?: number;
  discount?: string;
  available?: boolean;
};

export type Category = {
  id: number;
  category: string;
  key: string;
  products: Product[];
};

export type Menu = Category[];

// ✅ NEW: CartItem type that extends Product with quantity
export type CartItem = Product & {
  quantity: number;
};