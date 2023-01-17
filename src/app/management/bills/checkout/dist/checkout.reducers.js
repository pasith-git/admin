"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.couponReducer = exports.couponInitState = exports.couponSelector = exports.couponState = exports.spBillCheckoutReducer = exports.getSpBill = exports.selectSpBill = exports.initTailSpBill = void 0;
var store_1 = require("@ngrx/store");
var checkout_actions_1 = require("./checkout.actions");
exports.initTailSpBill = {
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
    sepMoneyChange: 0
};
exports.selectSpBill = function (state) { return state.spBill; };
exports.getSpBill = store_1.createSelector(exports.selectSpBill, function (data) { return data; });
exports.spBillCheckoutReducer = store_1.createReducer(exports.initTailSpBill, store_1.on(checkout_actions_1.spCheckout, function (state, data) { return (__assign(__assign({}, state), { billName: data.billName, tableName: data.tableName, orderCount: data.orderCount || 0, total: data.total || 0, tariff: data.tariff || 0, vat: data.vat || 0, totalVat: data.totalVat || 0, sepMoney: data.sepMoney || 0, paidMoney: data.paidMoney || 0, discount: data.discount || 0, needPay: data.needPay || 0, bath: data.bath || 0, usd: data.usd || 0, received: data.received || 0, change: data.change || 0, excBath: data.excBath, excUSD: data.excUSD, sepMoneyChange: data.sepMoneyChange || 0 })); }));
exports.couponState = function (state) { return state.coupon; };
exports.couponSelector = store_1.createSelector(exports.couponState, function (data) { return data; });
exports.couponInitState = {
    couponType: '',
    couponCode: '',
    couponMoney: 0,
    couponPercent: 0
};
exports.couponReducer = store_1.createReducer(exports.couponInitState, store_1.on(checkout_actions_1.couponAction, function (state, _a) {
    var couponPercent = _a.couponPercent, couponMoney = _a.couponMoney, couponCode = _a.couponCode, couponType = _a.couponType;
    return __assign(__assign(__assign(__assign(__assign({}, state), (couponType && { couponType: couponType })), (couponCode && { couponCode: couponCode })), (couponPercent && { couponPercent: couponPercent })), (couponMoney && { couponMoney: couponMoney }));
}));
