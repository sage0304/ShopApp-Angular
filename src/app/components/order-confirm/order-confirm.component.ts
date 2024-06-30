import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit{
  cartItems: {product: Product, quantity: number }[] = [];
  couponCode: string = ''; // Discount code
  totalAmount: number = 0; // Total price

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) { }

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
