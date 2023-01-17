import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductTypeDto } from '../dto/product-type.dto';
import { ProductType } from '../models/product-type.model';
import { ApiPath, Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  public dataSub$ = new Subject<ProductType[]>();
  readonly dataObs$ = this.dataSub$.asObservable();
  constructor(private http: HttpClient, private authService: AuthService,
  ) {
  }

  findAll(brchId: number) {
    return this.http.get<ProductType[]>(Util.Api + `${ApiPath.productType}/${this.authService.getRestaurantId()}/${brchId}`);
  }

  create(data: ProductTypeDto) {
    return this.http.post<ProductType>(Util.Api + `${ApiPath.productType}`, data);
  }
  update(data: ProductTypeDto) {
    return this.http.put<ProductType>(Util.Api + `${ApiPath.productType}/update`, data);
  }
  delete(data: ProductTypeDto) {
    return this.http.put<ProductType>(Util.Api + `${ApiPath.productType}/delete`, data);
  }


}
