import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stockinout } from '../models/stock-in-out.model';
import { Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StockInOutService {
  constructor(private http: HttpClient, private authService: AuthService) {

  }
  getData(bchId: any) {
    return this.http.get<Stockinout[]>(Util.Api + `stocks/stock-in-out/${this.authService.getRestaurantId()}/${bchId}`);
  }
  
  getFilterDateData(bchId: any, startDate: any, endDate: any){
    return this.http.get<Stockinout[]>(Util.Api + `stocks/stock-in-out/${this.authService.getRestaurantId()}/${bchId}?startDate=${startDate}&endDate=${endDate}`)
  }
}