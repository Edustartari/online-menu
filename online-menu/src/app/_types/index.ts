export interface IProduct {
  title: string;
  category: string;
  price: number;
  code: number;
  description: string;
  image: string;
  is_highlight: boolean;
  is_available: boolean;
}

export interface ICheckoutItem {
  code: number;
  amount: number;
  product_info: IProduct;
}