"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BranchesService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var index_util_1 = require("../utilConstant/index.util");
var BranchesService = /** @class */ (function () {
    function BranchesService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.branchesSubject = new rxjs_1.BehaviorSubject([]);
        this.branchesObs = this.branchesSubject.asObservable();
    }
    BranchesService.prototype.ngOnInit = function () {
    };
    BranchesService.prototype.getBranchData = function (restaurantId) {
        var _this = this;
        return this.http.get(index_util_1.Util.Api + ("restaurants/" + restaurantId)).subscribe(function (data) {
            _this.branchesSubject.next(data.branches);
        });
    };
    BranchesService.prototype.getBranchObs = function (resId) {
        return this.http.get(index_util_1.Util.Api + ("branches/" + resId));
    };
    BranchesService.prototype.getData = function () {
        return this.http.get(index_util_1.Util.Api + ("branches/" + this.authService.getRestaurantId()));
    };
    BranchesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BranchesService);
    return BranchesService;
}());
exports.BranchesService = BranchesService;
