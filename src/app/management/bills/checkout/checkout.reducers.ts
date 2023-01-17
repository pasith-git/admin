import { createReducer, createSelector, on } from '@ngrx/store';
import { couponAction, spCheckout } from './checkout.actions';

type SpBill = {
    billName: string,
    tableName: string,
    orderCount: number,
    total: number,
    tariff: number,
    vat: number,
    totalVat: number,
    sepMoney: number,
    paidMoney: number,
    discount: number,
    needPay: number,
    bath: number,
    usd: number,
    received: number,
    change: number,
    excBath: number,
    excUSD: number,
    sepMoneyChange: number,
}

export type SpBillOp = Partial<SpBill>;

export const initTailSpBill: SpBillOp = {
    billName: '',
    tableName: '',
    orderCount: 0,
    tariff: 0,
    total: 0,
    vat: 0,
    totalVat: 0,
    sepMoney: 0,
    paidMoney: 0,
    discount: 0,
    needPay: 0,
    bath: 0,
    usd: 0,
    received: 0,
    change: 0,
    excBath: 0,
    excUSD: 0,
    sepMoneyChange: 0,
}

export interface AppState {
    spBill: SpBillOp
}

export const selectSpBill = (state: AppState) => state.spBill;

export const getSpBill = createSelector(selectSpBill, (data) => data);

export const spBillCheckoutReducer = createReducer(initTailSpBill,
    on(spCheckout, (state, data) => ({
        ...state,
        billName: data.billName,
        tableName: data.tableName,
        orderCount: data.orderCount || 0,
        total: data.total || 0,
        tariff: data.tariff || 0,
        vat: data.vat || 0,
        totalVat: data.totalVat || 0,
        sepMoney: data.sepMoney || 0,
        paidMoney: data.paidMoney || 0,
        discount: data.discount || 0,
        needPay: data.needPay || 0,
        bath: data.bath || 0,
        usd: data.usd || 0,
        received: data.received || 0,
        change: data.change || 0,
        excBath: data.excBath,
        excUSD: data.excUSD,
        sepMoneyChange: data.sepMoneyChange || 0,
    })),

)

/* coupon */

export type Coupon = {
    couponType?: string,
    couponCode?: string,
    couponPercent?: number,
    couponMoney?: number,
}


export const couponState = (state: { coupon: Coupon }) => state.coupon;

export const couponSelector = createSelector(couponState, (data) => data);

export const couponInitState: Coupon = {
    couponType: '',
    couponCode: '',
    couponMoney: 0,
    couponPercent: 0,
}

export const couponReducer = createReducer(couponInitState, on(couponAction, (state, { couponPercent, couponMoney, couponCode, couponType }) => {
    return {
        ...state,
        ...(couponType && { couponType }),
        ...(couponCode && { couponCode }),
        ...(couponPercent && { couponPercent }),
        ...(couponMoney && { couponMoney }),
    }
}));
