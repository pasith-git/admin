"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenudetailsService = void 0;
var core_1 = require("@angular/core");
var index_util_1 = require("../utilConstant/index.util");
var MenudetailsService = /** @class */ (function () {
    /* public dataSub$ = new Subject<Menu[]>(); */
    /* readonly dataObs$ = this.dataSub$.asObservable(); */
    function MenudetailsService(http) {
        this.http = http;
    }
    MenudetailsService.prototype.create = function (data) {
        return this.http.post(index_util_1.Util.Api + ("" + index_util_1.ApiPath.menuDetail), data);
    };
    MenudetailsService.prototype.update = function (data) {
        return this.http.put(index_util_1.Util.Api + (index_util_1.ApiPath.menuDetail + "/update"), data);
    };
    MenudetailsService.prototype["delete"] = function (data) {
        return this.http["delete"](index_util_1.Util.Api + (index_util_1.ApiPath.menuDetail + "/delete"), { body: data });
    };
    MenudetailsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MenudetailsService);
    return MenudetailsService;
}());
exports.MenudetailsService = MenudetailsService;
