import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CouponDto } from '../dto/coupon.dto';
import { Coupon } from '../models/coupon.model';
import { ApiPath, Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  public dataSub$ = new Subject<Coupon[]>();
  readonly dataObs$ = this.dataSub$.asObservable();
  constructor(private http: HttpClient, private authService: AuthService) {

  }

  findCoupon(brchId: string, couponCode: string) {
    return this.http.get<Coupon>(Util.Api + ApiPath.coupon + `/coupon/${brchId}/${couponCode}`);
  }

  findAll(brchId: number) {
    return this.http.get<Coupon[]>(Util.Api + ApiPath.coupon + `/${this.authService.getRestaurantId()}/${brchId}`);
  }

  create(data: CouponDto) {
    return this.http.post(Util.Api + ApiPath.coupon, data);
  }

  updateCoupon(data: any) {
    return this.http.put(Util.Api + ApiPath.coupon + `/update`, data);
  }

  deleteCoupon(data: any) {
    return this.http.delete(Util.Api + ApiPath.coupon + `/delete`, {
      body: data
    });
  }
  generateCode(resName: string, amount: number) {
    return this.http.get(Util.Api + ApiPath.coupon + `/generateCode/${resName}/${amount}`);
  }

  generateCodeByPhone(phone: string) {
    return this.http.get(Util.Api + ApiPath.member + `/member/${this.authService.getRestaurantId()}/${phone}`);
  }

}
