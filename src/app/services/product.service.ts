import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../models/product.model';
import { ApiPath, Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public dataSub$ = new Subject<Product[]>();
  readonly dataObs$ = this.dataSub$.asObservable();
  constructor(private http: HttpClient, private authService: AuthService,
  ) {
  }

  findAll(brchId: number) {
    return this.http.get<Product[]>(Util.Api + `${ApiPath.product}/${this.authService.getRestaurantId()}/${brchId}`);
  }

  create(data: ProductDto) {
    return this.http.post<Product>(Util.Api + `${ApiPath.product}`, data);
  }
  update(data: ProductDto) {
    return this.http.put<Product>(Util.Api + `${ApiPath.product}/update`, data);
  }
  delete(data: ProductDto) {
    return this.http.put<Product>(Util.Api + `${ApiPath.product}/delete`, data);
  }

}
