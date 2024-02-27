export type Product = {
  description: string;
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  itemInCart: number;
  loading: boolean;
};

export type Cart = {
  items: Product[];
  totalPrice: number;
  totalItems: number;
};

export type ProductCardProps = {
  product: Product;
  addItem: (product: Product) => void;
  removeItem: (product: Product) => void;
};

export type CardFooterProps = {
  details: Product;
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
};
