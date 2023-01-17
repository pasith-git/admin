import { createAction, props } from '@ngrx/store';
import { Coupon, SpBillOp } from './checkout.reducers';

export const spCheckout = createAction('[bill] checkout', props<SpBillOp>());
export const couponAction = createAction('[bill] coupon', props<Coupon>());
