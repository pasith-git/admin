import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StockUnitDto } from '../dto/stock-unit.dto';
import { StockUnit } from '../models/stock-unit.model';
import { ApiPath, Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StockUnitService {
  public dataSub$ = new Subject<StockUnit[]>();
  readonly dataObs$ = this.dataSub$.asObservable();
  constructor(private http: HttpClient, private authService: AuthService,
  ) {
  }

  findAll(brchId: number) {
    return this.http.get<StockUnit[]>(Util.Api + `${ApiPath.stockUnit}/${this.authService.getRestaurantId()}/${brchId}`);
  }

  create(data: StockUnitDto) {
    return this.http.post<StockUnit>(Util.Api + `${ApiPath.stockUnit}`, data);
  }
  update(data: StockUnitDto) {
    return this.http.put<StockUnit>(Util.Api + `${ApiPath.stockUnit}/update`, data);
  }
  delete(data: StockUnitDto) {
    return this.http.put<StockUnit>(Util.Api + `${ApiPath.stockUnit}/delete`, data);
  }

}
