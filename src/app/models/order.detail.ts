import { Product } from './product';
export interface OrderDetail {
  id: number;
  order_id: number;
  price: number;
  numberOfProducts: number;
  totalMoney: number;
  color: string;
  product: Product;
}
