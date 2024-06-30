import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/app/environments/environment';
import { OrderDTO } from '../../dtos/order/order.dto';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent{
  cartItems: {product: Product, quantity: number }[] = [];
  couponCode: string = ''; // Discount code
  totalAmount: number = 0; // Total price
  orderData: OrderDTO = {
    user_id: 1, 
    fullname: '', 
    email: '',
    phone_number: '', 
    address: '', 
    note: '', 
    total_money: 0, // Update after calculate total (coupon or not)
    payment_method: 'cod', // Default (COD)
    shipping_method: 'express', // Default (Express)
    coupon_code: '',
    cart_items: []
  };

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    // Get products in cart
    debugger
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys()); // Transfer ID list from Map cart
    // Call service to get product detail based on ID list
    debugger
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        debugger
        // Get product detail and quantity in cart
        this.cartItems = productIds.map((productId) => {
          debugger
          const product = products.find((p) => p.id === productId);
          if(product) {
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
          return {
            product: product!,
            quantity: cart.get(productId)!
          };
        });
        console.log("HASASAS")
      },
      complete: () => {
        debugger
        this.calculateTotal();
      },
      error: (error: any) => {
        debugger
        console.error('Error fetching cart items:', error);
      }
    });
  }

  placeOrder() {
    this.orderService.placeOrder(this.orderData).subscribe({
      next: (response) => {            
        debugger                
        console.log('Đặt hàng thành công');
      },
      complete: () => {
        debugger;
        this.calculateTotal()
      },
      error: (error: any) => {
        debugger;
        console.error('Lỗi khi đặt hàng:', error);
      }
    });       
  }  

  // Function to calculate total price
  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 
      0
    );
  }
 
  // Function to apply discount code (coupon)
  applyCoupon(): void {
    // Write code here
    // Update totalAmount
  }
}
