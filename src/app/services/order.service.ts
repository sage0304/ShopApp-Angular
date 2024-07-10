import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { OrderDTO } from '../dtos/order/order.dto';
import { OrderResponse } from '../responses/order/order.response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/orders`;
  private apiGetAllOrders = `${environment.apiBaseUrl}/orders/get-orders-by-keyword`;

  constructor(private http: HttpClient) {}

  placeOrder(orderData: OrderDTO): Observable<any> {    
    // Send POST request to ORDER products
    return this.http.post(this.apiUrl, orderData);
  }

  getOrderById(orderId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${orderId}`);
  }

  getAllOrders(keyword:string, 
    page:number, limit:number
  ): Observable<OrderResponse[]> {
    const params = new HttpParams()
    .set('keyword', keyword)
    .set('page', page.toString())
    .set('limit', limit.toString());
    return this.http.get<any>(this.apiGetAllOrders, {params});
  }

  updateOrder(orderId: number, orderData: OrderDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orderId}`, orderData);
  }

  deleteOrder(orderId: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${orderId}`, {responseType: 'text'});
  } 
}
