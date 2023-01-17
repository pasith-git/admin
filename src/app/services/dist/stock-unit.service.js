"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StockUnitService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var index_util_1 = require("../utilConstant/index.util");
var StockUnitService = /** @class */ (function () {
    function StockUnitService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.dataSub$ = new rxjs_1.Subject();
        this.dataObs$ = this.dataSub$.asObservable();
    }
    StockUnitService.prototype.findAll = function (brchId) {
        return this.http.get(index_util_1.Util.Api + (index_util_1.ApiPath.stockUnit + "/" + this.authService.getRestaurantId() + "/" + brchId));
    };
    StockUnitService.prototype.create = function (data) {
        return this.http.post(index_util_1.Util.Api + ("" + index_util_1.ApiPath.stockUnit), data);
    };
    StockUnitService.prototype.update = function (data) {
        return this.http.put(index_util_1.Util.Api + (index_util_1.ApiPath.stockUnit + "/update"), data);
    };
    StockUnitService.prototype["delete"] = function (data) {
        return this.http.put(index_util_1.Util.Api + (index_util_1.ApiPath.stockUnit + "/delete"), data);
    };
    StockUnitService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StockUnitService);
    return StockUnitService;
}());
exports.StockUnitService = StockUnitService;
