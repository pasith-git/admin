import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { StockInDto } from '../dto/stock-in.dto';
import { StockIn } from '../models/stock-in.model';
import { ApiPath, Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StockInService {
  public dataSub$ = new Subject<StockIn[]>();
  readonly dataObs$ = this.dataSub$.asObservable();
  constructor(private http: HttpClient, private authService: AuthService) {

  }
  getData(bchId: any) {
    return this.http.get<StockIn[]>(Util.Api + `stock-ins/${this.authService.getRestaurantId()}/${bchId}`);
  }
  findAll(brchId: number) {
    return this.http.get<StockIn[]>(Util.Api + `${ApiPath.stockIn}/${this.authService.getRestaurantId()}/${brchId}`);
  }

  create(data: StockInDto) {
    return this.http.post<StockIn>(Util.Api + `${ApiPath.stockIn}`, data);
  }
  update(data: StockInDto) {
    return this.http.put<StockIn>(Util.Api + `${ApiPath.stockIn}/update`, data);
  }
  delete(data: StockInDto) {
    return this.http.put<StockIn>(Util.Api + `${ApiPath.stockIn}/delete`, data);
  }
}
