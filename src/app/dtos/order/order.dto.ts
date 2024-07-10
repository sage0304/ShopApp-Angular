import { 
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber, 
    IsNumber 
} from 'class-validator';
import { CartItemDTO } from './cart.item.dto';

export class OrderDTO {
  user_id: number;

  fullname: string;

  email: string;

  phone_number: string;

  address: string;

  status: string;

  note: string;

  total_money?: number;

  shipping_method: string;

  shipping_address: string;

  shipping_date?: Date;

  tracking_number: string;  

  order_date?: Date;

  payment_method: string;

  coupon_code: string;

  cart_items: { product_id: number, quantity: number }[]; // Add cart_items property to save cart information


  constructor(data: any) {
    this.user_id = data.user_id;
    this.fullname = data.fullname;
    this.email = data.email;
    this.status = data.status;
    this.phone_number = data.phone_number;
    this.address = data.address;
    this.note = data.note;
    this.order_date = data.order_date;
    this.total_money = data.total_money;
    this.tracking_number = data.tracking_number;
    this.shipping_method = data.shipping_method;
    this.shipping_address = data.shipping_address;
    this.shipping_date = data.shipping_date;
    this.payment_method = data.payment_method;
    this.coupon_code = data.coupon_code;
    this.cart_items = data.cart_items;
  }
}
