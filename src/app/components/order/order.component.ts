import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/app/environments/environment';
import { OrderDTO } from '../../dtos/order/order.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
  orderForm: FormGroup; // Object FormGroup to manage data in form
  cartItems: {product: Product, quantity: number }[] = [];
  couponCode: string = ''; // Discount code
  totalAmount: number = 0; // Total price
  orderData: OrderDTO = {
    user_id: 5, 
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
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
    // Create FormGroup and corresponding FormControl
    this.orderForm = this.fb.group({
      fullname: ['Phạm Hiền Nhân', Validators.required], // Fullname is required FormControl
      email: ['hiennhanlonggiang@gmail.com', Validators.email], // Use email validator for email FormControl
      phone_number: ['0399073831', [Validators.required, Validators.minLength(6)]], // Phone number is required and min length is 6
      address: ['203 Str.03', [Validators.required, Validators.minLength(5)]], // Address is required and min length is 5
      note: ['Hang de be'], // Note is optional
      shipping_method: ['express'],
      payment_method: ['cod']
    }); 
  }

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
    debugger
    if(this.orderForm.valid) {
      // Method 1: Assign each value from Form into orderData
      // this.orderData.fullname = this.orderForm.get('fullname')!.value;
      // this.orderData.email = this.orderForm.get('email')!.value;
      // this.orderData.phone_number = this.orderForm.get('phone_number')!.value;
      // this.orderData.address = this.orderForm.get('address')!.value;
      // this.orderData.note = this.orderForm.get('note')!.value;
      // this.orderData.shipping_method = this.orderForm.get('shipping_method')!.value;
      // this.orderData.payment_method = this.orderForm.get('payment_method')!.value;

      // Method 2: 
      // Use spread (...) operator to copy all properties of orderData to orderForm.value
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value
      };
    }

    this.orderData.cart_items = this.cartItems.map((cartItem) => ({
      product_id: cartItem.product.id,
      quantity: cartItem.quantity
    }));

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
