"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var index_util_1 = require("../utilConstant/index.util");
var authToken_1 = require("./authToken");
var moment = require("moment");
var AuthService = /** @class */ (function () {
    function AuthService(http, cookieService, router) {
        this.http = http;
        this.cookieService = cookieService;
        this.router = router;
        this.isAuth = false;
        this.httpHeaders = new http_1.HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    }
    Object.defineProperty(AuthService.prototype, "token", {
        get: function () {
            return this._token = this.getLsAuthKey();
        },
        enumerable: false,
        configurable: true
    });
    AuthService.prototype.getExpiredDate = function () {
        return moment().add(1, 'd');
    };
    AuthService.prototype.getTokenToLocalStorage = function (token, tokenKey) {
        if (tokenKey === void 0) { tokenKey = authToken_1.authToken.tokenKey; }
        localStorage.setItem(tokenKey, token);
    };
    AuthService.prototype.setRestaurantId = function (token, tokenKey) {
        if (tokenKey === void 0) { tokenKey = authToken_1.authToken.restaurantId; }
        localStorage.setItem(tokenKey, token);
    };
    AuthService.prototype.getRestaurantId = function () {
        return localStorage.getItem(authToken_1.authToken.restaurantId);
    };
    AuthService.prototype.getTokenRoles = function (token, tokenKey) {
        if (tokenKey === void 0) { tokenKey = authToken_1.authToken.tokenKey; }
        localStorage.setItem(tokenKey, token);
    };
    AuthService.prototype.checkLocalStorage = function () {
        if (localStorage.getItem(authToken_1.authToken.tokenKey)) {
            this.isAuth = true;
        }
    };
    AuthService.prototype.checkToken = function () {
        if (localStorage.getItem(authToken_1.authToken.tokenKey)) {
            return true;
        }
        return false;
    };
    AuthService.prototype.setLSAuth = function (token) {
        localStorage.setItem(authToken_1.authToken.tokenKey, token);
    };
    AuthService.prototype.setLSexpiredDate = function (expiredDate) {
        var date = new Date();
        date.setSeconds(expiredDate);
        localStorage.setItem(authToken_1.authToken.expiredDate, moment(date).toISOString());
    };
    AuthService.prototype.getLSExpiredDate = function () {
        return localStorage.getItem(authToken_1.authToken.expiredDate);
    };
    AuthService.prototype.autoLogOut = function () {
        var now = moment().toDate().getTime();
        var expiredDate = moment(this.getLSExpiredDate()).toDate().getTime();
        var result = expiredDate - now;
        return result;
    };
    AuthService.prototype.setRoles = function (token) {
        localStorage.setItem(authToken_1.authToken.roles, token);
    };
    AuthService.prototype.setFirstname = function (token) {
        localStorage.setItem(authToken_1.authToken.firstname, token);
    };
    AuthService.prototype.getFirstname = function () {
        return localStorage.getItem(authToken_1.authToken.firstname);
    };
    AuthService.prototype.clearAllAndRotate = function () {
        localStorage.clear();
        this.router.navigate(['/login']);
    };
    AuthService.prototype.setTimerToLogout = function () {
    };
    AuthService.prototype.checkRoleLS = function () {
        var roleToken = localStorage.getItem(authToken_1.authToken.roles);
        if (roleToken === null || roleToken === void 0 ? void 0 : roleToken.includes(',')) {
            var roles = roleToken.split(',');
            var findMultiRoles = roles.find(function (data) {
                return data === 'superadmin' || data === 'branchmanager' || data === 'restaurantadmin';
            });
            if (!!findMultiRoles) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (roleToken === 'superadmin' || roleToken === 'branchmanager' || roleToken === 'restaurantadmin,branchmanager') {
                return true;
            }
            else {
                return false;
            }
        }
    };
    AuthService.prototype.checkLs = function () {
        if (localStorage.getItem(authToken_1.authToken.tokenKey)) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthService.prototype.getLsAuthKey = function () {
        var cookieToken = localStorage.getItem(authToken_1.authToken.tokenKey);
        return "Bearer " + cookieToken;
    };
    AuthService.prototype.makeCredentials = function (username, password) {
        return this.http.post(index_util_1.Util.Api + "login/user", { username: username, password: password });
    };
    AuthService.prototype.getRolesName = function () {
        var _a;
        var localRoles = (_a = localStorage.getItem(authToken_1.authToken.roles)) === null || _a === void 0 ? void 0 : _a.split(',')[0];
        var rolesArr = (localRoles === null || localRoles === void 0 ? void 0 : localRoles.charAt(0).toUpperCase()) + (localRoles === null || localRoles === void 0 ? void 0 : localRoles.substring(1));
        return rolesArr;
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
