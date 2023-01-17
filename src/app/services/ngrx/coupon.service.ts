import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Coupon, couponSelector } from 'src/app/management/bills/checkout/checkout.reducers';
import { couponAction } from 'src/app/management/bills/checkout/checkout.actions';
@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor(private store: Store<any>) { }

  get couponState(): Coupon{
    let couponState: Coupon = {};
    this.store.select(couponSelector).subscribe(data=>{
      couponState = data;
    })
    return couponState
  }

  update(couponState: Coupon) {
    this.store.dispatch(couponAction(couponState));
  }
}
