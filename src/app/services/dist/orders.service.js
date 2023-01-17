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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrdersService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var order_dto_1 = require("../dto/order.dto");
var index_util_1 = require("../utilConstant/index.util");
var OrdersService = /** @class */ (function () {
    function OrdersService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.orderSubject = new rxjs_1.BehaviorSubject([]);
        this.orderObs = this.orderSubject.asObservable();
    }
    OrdersService.prototype.getOrderData = function (bchId) {
        return this.http.get(index_util_1.Util.Api + (index_util_1.ApiPath.order + "/" + this.authService.getRestaurantId() + "/" + bchId));
    };
    OrdersService.prototype.getOrders = function (data) {
        var result = __assign(__assign(__assign(__assign(__assign({ branchId: data.branchId, restaurantId: parseInt(this.authService.getRestaurantId()) }, (data.langcode ? { langcode: data.langcode } : { langcode: null })), (data.status ? { status: data.status } : { status: order_dto_1.status.pending })), (data.limit ? { limit: data.limit } : { limit: null })), (data.startDate ? { startDate: data.startDate } : { startDate: null })), (data.toDate ? { toDate: data.toDate } : { toDate: null }));
        return this.http.post(index_util_1.Util.Api + (index_util_1.ApiPath.order + "/get"), result);
    };
    OrdersService.prototype.getOrderDataStatus = function (status, bchId) {
        return this.http.get(index_util_1.Util.Api + (index_util_1.ApiPath.order + "/" + status + "/" + this.authService.getRestaurantId() + "/" + bchId));
    };
    OrdersService.prototype.getOrderToCancel = function (bchId, orderId) {
        return this.http.get(index_util_1.Util.Api + (index_util_1.ApiPath.orderDetail + "/" + this.authService.getRestaurantId() + "/" + bchId + "/" + orderId));
    };
    OrdersService.prototype.getOrderById = function (bchId, tableId, status) {
        return this.http.get(index_util_1.Util.Api + (index_util_1.ApiPath.orderDetail + "/" + this.authService.getRestaurantId() + "/" + bchId + "/0?tableId=" + tableId + "&status=" + status));
    };
    OrdersService.prototype.orderPayment = function (data) {
        return this.http.put(index_util_1.Util.Api + "orders/payment", data);
    };
    /*   orderDetailPayment(data: any) {
        return this.http.put(Util.Api + `order-details/payment`, data);
      } */
    OrdersService.prototype.cancelOrder = function (data) {
        return this.http.put(index_util_1.Util.Api + "orders/cancel", data);
    };
    OrdersService.prototype.cancelOrderDetail = function (data) {
        return this.http.put(index_util_1.Util.Api + "order-details/cancel", data);
    };
    OrdersService.prototype.getImage = function () {
        return index_util_1.Util.ApiSecond + "images/7b20f07c-418c-48d1-b784-400cf26523e1.png";
    };
    OrdersService.prototype.setLocalMoneyReceive = function (price) {
        localStorage.setItem('mr', price);
    };
    OrdersService.prototype.getLocalMoneyReceive = function () {
        return localStorage.getItem('mr');
    };
    OrdersService.prototype.setLocalMoneyChange = function (price) {
        localStorage.setItem('mc', price);
    };
    OrdersService.prototype.getLocalMoneyChange = function () {
        return localStorage.getItem('mc');
    };
    OrdersService.prototype.clearLsMoney = function () {
        localStorage.removeItem('mr');
        localStorage.removeItem('mc');
    };
    OrdersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OrdersService);
    return OrdersService;
}());
exports.OrdersService = OrdersService;
