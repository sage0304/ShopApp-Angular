import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/app/environments/environment';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/order.detail';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit{
  orderResponse: OrderResponse = {
    id: 0,
    user_id: 0,
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0,
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    tracking_number: '',
    payment_method: '',
    order_details: []
  };

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    debugger
    const orderId = 6;
    this.orderService.getOrderById(orderId).subscribe({
      next: (response : any) => {
        debugger
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address;
        this.orderResponse.note = response.note;
        this.orderResponse.order_date = new Date(
          response.order_date[0],
          response.order_date[1] - 1,
          response.order_date[2]
        );
        debugger
        this.orderResponse.order_details = response.order_detail
        .map((order_detail: OrderDetail) => {
          order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
          return order_detail;
        });
        this.orderResponse.payment_method = response.payment_method;
        this.orderResponse.shipping_method = response.shipping_method;
        this.orderResponse.tracking_number = response.tracking_number;
        this.orderResponse.status = response.status;
        this.orderResponse.total_money = response.total_money;
        this.orderResponse.shipping_date = new Date(
          response.shipping_date[0],
          response.shipping_date[1] - 1,
          response.shipping_date[2]
        );
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        debugger
        console.error('Error fetching cart items:', error);
      }
    });
  }
}
