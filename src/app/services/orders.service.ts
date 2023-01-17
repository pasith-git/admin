import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getOrdersDto, status } from '../dto/order.dto';
import { MenuOrder, Order, OrderDetail } from '../models/order.model';
import { ApiPath, Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public orderSubject: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  public orderObs = this.orderSubject.asObservable();
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getOrderData(bchId: string) {
    return this.http.get<Order[]>(Util.Api + `${ApiPath.order}/${this.authService.getRestaurantId()}/${bchId}`);
  }

  getOrders(data: getOrdersDto) {
    const result: getOrdersDto = {
      branchId: data.branchId,
      restaurantId: parseInt(this.authService.getRestaurantId() as string),
      ...(data.langcode ? { langcode: data.langcode } : { langcode: null }),
      ...(data.status ? { status: data.status } : { status: status.pending }),
      ...(data.limit ? { limit: data.limit } : { limit: null }),
      ...(data.startDate ? { startDate: data.startDate } : { startDate: null }),
      ...(data.toDate ? { toDate: data.toDate } : { toDate: null }),

    }
    return this.http.post<Order[]>(Util.Api + `${ApiPath.order}/get`, result);
  }

  getOrderDataStatus(status: string, bchId: string) {
    return this.http.get<Order[]>(Util.Api + `${ApiPath.order}/${status}/${this.authService.getRestaurantId()}/${bchId}`);
  }

  getOrderToCancel(bchId: string, orderId: number) {
    return this.http.get<MenuOrder[]>(Util.Api + `${ApiPath.orderDetail}/${this.authService.getRestaurantId()}/${bchId}/${orderId}`);
  }

  getOrderById(bchId: string, tableId: number, status: string) {
    return this.http.get<Order>(Util.Api + `${ApiPath.orderDetail}/${this.authService.getRestaurantId()}/${bchId}/0?tableId=${tableId}&status=${status}`);
  }

  orderPayment(data: any) {
    return this.http.put(Util.Api + `orders/payment`, data);
  }

  /*   orderDetailPayment(data: any) {
      return this.http.put(Util.Api + `order-details/payment`, data);
    } */

  cancelOrder(data: any[]) {
    return this.http.put(Util.Api + `orders/cancel`, data);
  }

  cancelOrderDetail(data: any) {
    return this.http.put(Util.Api + `order-details/cancel`,
      data
    )
  }

  getImage() {
    return Util.ApiSecond + `images/7b20f07c-418c-48d1-b784-400cf26523e1.png`;
  }
  setLocalMoneyReceive(price: string) {
    localStorage.setItem('mr', price);
  }

  getLocalMoneyReceive() {
    return localStorage.getItem('mr');
  }

  setLocalMoneyChange(price: string) {
    localStorage.setItem('mc', price);
  }

  getLocalMoneyChange() {
    return localStorage.getItem('mc');
  }

  clearLsMoney() {
    localStorage.removeItem('mr')
    localStorage.removeItem('mc')
  }
}
