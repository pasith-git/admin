"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CouponService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var index_util_1 = require("../utilConstant/index.util");
var CouponService = /** @class */ (function () {
    function CouponService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.dataSub$ = new rxjs_1.Subject();
        this.dataObs$ = this.dataSub$.asObservable();
    }
    CouponService.prototype.findCoupon = function (brchId, couponCode) {
        return this.http.get(index_util_1.Util.Api + index_util_1.ApiPath.coupon + ("/coupon/" + brchId + "/" + couponCode));
    };
    CouponService.prototype.findAll = function (brchId) {
        return this.http.get(index_util_1.Util.Api + index_util_1.ApiPath.coupon + ("/" + this.authService.getRestaurantId() + "/" + brchId));
    };
    CouponService.prototype.create = function (data) {
        return this.http.post(index_util_1.Util.Api + index_util_1.ApiPath.coupon, data);
    };
    CouponService.prototype.updateCoupon = function (data) {
        return this.http.put(index_util_1.Util.Api + index_util_1.ApiPath.coupon + "/update", data);
    };
    CouponService.prototype.deleteCoupon = function (data) {
        return this.http["delete"](index_util_1.Util.Api + index_util_1.ApiPath.coupon + "/delete", {
            body: data
        });
    };
    CouponService.prototype.generateCode = function (resName, amount) {
        return this.http.get(index_util_1.Util.Api + index_util_1.ApiPath.coupon + ("/generateCode/" + resName + "/" + amount));
    };
    CouponService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CouponService);
    return CouponService;
}());
exports.CouponService = CouponService;
