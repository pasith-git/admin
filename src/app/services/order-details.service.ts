import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderDetail } from '../models/order-detail.model';
import { Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getData(bchId: number, startDate?: string, endDate?: string) {
    return this.http.get<OrderDetail[]>(Util.Api + `order-details/sale/report/${this.authService.getRestaurantId()}/${bchId}${startDate && `?startDate=${startDate}`}${endDate && `&endDate=${endDate}`}`);
  }
}
