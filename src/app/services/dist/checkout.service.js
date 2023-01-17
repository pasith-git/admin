"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckoutService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var CheckoutService = /** @class */ (function () {
    function CheckoutService() {
        var _this = this;
        this.defaultValue = {
            total: 0,
            moneyChange: 0,
            moneyReceive: 0,
            moneyCoupon: 0,
            couponPercent: 0
        };
        this.dataSubject = new rxjs_1.BehaviorSubject({
            total: 0,
            moneyChange: 0,
            moneyReceive: 0,
            moneyCoupon: 0,
            couponPercent: 0
        });
        this.data$ = this.dataSubject.asObservable();
        this.dataSubject.subscribe({
            next: function (data) {
                _this.data = data;
            }
        });
    }
    CheckoutService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CheckoutService);
    return CheckoutService;
}());
exports.CheckoutService = CheckoutService;
