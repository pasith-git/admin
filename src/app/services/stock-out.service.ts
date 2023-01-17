import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StockOutDto } from '../dto/stock-out.dto';
import { StockOut } from '../models/stock-out.model';
import { ApiPath, Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StockOutService {
  public dataSub$ = new Subject<StockOut[]>();
  readonly dataObs$ = this.dataSub$.asObservable();
  constructor(private http: HttpClient, private authService: AuthService) {

  }
  getData(bchId: any) {
    return this.http.get<StockOut[]>(Util.Api + `stock-outs/${this.authService.getRestaurantId()}/${bchId}`);
  }
  findAll(brchId: number) {
    return this.http.get<StockOut[]>(Util.Api + `${ApiPath.stockOut}/${this.authService.getRestaurantId()}/${brchId}`);
  }

  create(data: StockOutDto) {
    return this.http.post<StockOut>(Util.Api + `${ApiPath.stockOut}`, data);
  }
  update(data: StockOutDto) {
    return this.http.put<StockOut>(Util.Api + `${ApiPath.stockOut}/update`, data);
  }
  delete(data: StockOutDto) {
    return this.http.put<StockOut>(Util.Api + `${ApiPath.stockOut}/delete`, data);
  }
}
