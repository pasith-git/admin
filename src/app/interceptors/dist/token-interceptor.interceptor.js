"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TokenInterceptorInterceptor = void 0;
var core_1 = require("@angular/core");
var authToken_1 = require("../services/authToken");
var TokenInterceptorInterceptor = /** @class */ (function () {
    function TokenInterceptorInterceptor(auth) {
        this.auth = auth;
    }
    TokenInterceptorInterceptor.prototype.intercept = function (req, next) {
        var token = this.auth.getLsAuthKey();
        var authReq = req.clone({
            headers: req.headers.set(authToken_1.authToken.header, token)
        });
        /*     next.handle(authReq).subscribe(data=>{
              console.log(data)
            }) */
        return next.handle(authReq);
    };
    TokenInterceptorInterceptor = __decorate([
        core_1.Injectable()
    ], TokenInterceptorInterceptor);
    return TokenInterceptorInterceptor;
}());
exports.TokenInterceptorInterceptor = TokenInterceptorInterceptor;
