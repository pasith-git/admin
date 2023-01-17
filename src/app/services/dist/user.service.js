"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var index_util_1 = require("../utilConstant/index.util");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.dataSub$ = new rxjs_1.Subject();
        this.dataObs$ = this.dataSub$.asObservable();
    }
    UserService.prototype.getUserData = function () {
        return this.http.get(index_util_1.Util.Api + 'admin/users');
    };
    UserService.prototype.getUserRoles = function () {
        return this.http.get(index_util_1.Util.Api + 'admin/users/roles');
    };
    UserService.prototype.postUserData = function () {
        return this.http.post(index_util_1.Util.Api + 'admin/users', {});
    };
    UserService.prototype.register = function (data) {
        return this.http.post(index_util_1.Util.Api + index_util_1.ApiPath.user + '/register', data);
    };
    UserService.prototype.otp = function (data) {
        return this.http.post(index_util_1.Util.Api + index_util_1.ApiPath.user + '/verify-code', data);
    };
    UserService.prototype.resetPassword = function (data) {
        return this.http.post(index_util_1.Util.Api + index_util_1.ApiPath.user + '/change-password', data);
    };
    UserService.prototype.getDataByBranch = function (brchId) {
        return this.http.get(index_util_1.Util.Api + index_util_1.ApiPath.user + ("/" + brchId));
    };
    UserService.prototype["delete"] = function (data) {
        return this.http.put(index_util_1.Util.Api + index_util_1.ApiPath.user + '/delete', data);
    };
    UserService.prototype.create = function (data) {
        return this.http.post(index_util_1.Util.Api + index_util_1.ApiPath.user, data);
    };
    UserService.prototype.update = function (data) {
        return this.http.put(index_util_1.Util.Api + index_util_1.ApiPath.user + '/update', data);
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
