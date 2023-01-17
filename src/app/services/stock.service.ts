import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StockDto } from '../dto/stock.dto';
import { Stockinout } from '../models/stock-in-out.model';
import { StockIn } from '../models/stock-in.model';
import { StockOut } from '../models/stock-out.model';
import { Stock } from '../models/stock.model';
import { ApiPath, Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  public dataSub$ = new Subject<Stock[]>();
  readonly dataObs$ = this.dataSub$.asObservable();
  constructor(private http: HttpClient, private authService: AuthService) { }


  getAllStockIn(bid: number){
    return this.http.get<StockIn[]>(Util.Api + `stock-ins/${this.authService.getRestaurantId()}/${bid}`);
  }
  getAllStockOut(bid: number){
    return this.http.get<StockOut[]>(Util.Api + `stock-outs/${this.authService.getRestaurantId()}/${bid}`);
  }
  getAllStockInOut(bid: number){
    return this.http.get<Stockinout[]>(Util.Api + `stocks/stock-in-out/${this.authService.getRestaurantId()}/${bid}`);
  }

  findAll(brchId: number) {
    return this.http.get<Stock[]>(Util.Api + `${ApiPath.stock}/${this.authService.getRestaurantId()}/${brchId}`);
  }

  create(data: StockDto) {
    return this.http.post<Stock>(Util.Api + `${ApiPath.stock}`, data);
  }
  update(data: StockDto) {
    return this.http.put<Stock>(Util.Api + `${ApiPath.stock}/update`, data);
  }
  delete(data: StockDto) {
    return this.http.put<Stock>(Util.Api + `${ApiPath.stock}/delete`, data);
  }
}
