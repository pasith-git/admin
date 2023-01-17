import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export interface CheckoutModel {
  total?: number;
  moneyReceive?: number;
  moneyChange?: number;
  moneyCoupon?: number;
  couponPercent?: number;
  couponCode?: string;
  defaultTotal?: number,
  payment?: {
    type?: string,
    vat?: string,
  },
  bank?: {
    name: {
      id: number,
      value: string,
    },
    ref: number,
  },
  tariff?: number,
  validSep?: boolean,
  billType?: string,
}

@Injectable({
  providedIn: 'root'
})

export class CheckoutService {
  public data: CheckoutModel;
  public defaultValue: CheckoutModel = {
    total: 0,
    moneyChange: 0,
    moneyReceive: 0,
    moneyCoupon: 0,
    couponPercent: 0,
    defaultTotal: 0,
    payment: {
      type: "",
      vat: "",
    },
    tariff: 0,
    validSep: false,
    billType: "",
  }
  public dataSubject = new BehaviorSubject<CheckoutModel>({
    total: 0,
    moneyChange: 0,
    moneyReceive: 0,
    moneyCoupon: 0,
    couponPercent: 0,
    payment: {
      type: "",
      vat: "",
    },
    tariff: 0,
    validSep: false,
    billType: "",
  });
  public data$: Observable<CheckoutModel> = this.dataSubject.asObservable();
  constructor() {
    this.dataSubject.subscribe({
      next: (data) => {
        this.data = data;
      }
    })
  }

}