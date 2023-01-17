"use strict";
exports.__esModule = true;
exports.roleInterceptorProvider = exports.loadingInterceptorProvider = exports.tokenInterceptorProvider = void 0;
var http_1 = require("@angular/common/http");
var loading_interceptor_1 = require("../interceptors/loading.interceptor");
var role_interceptor_interceptor_1 = require("../interceptors/role-interceptor.interceptor");
var token_interceptor_interceptor_1 = require("../interceptors/token-interceptor.interceptor");
exports.tokenInterceptorProvider = {
    provide: http_1.HTTP_INTERCEPTORS, useClass: token_interceptor_interceptor_1.TokenInterceptorInterceptor, multi: true
};
exports.loadingInterceptorProvider = {
    provide: http_1.HTTP_INTERCEPTORS, useClass: loading_interceptor_1.LoadingInterceptor, multi: true
};
exports.roleInterceptorProvider = {
    provide: http_1.HTTP_INTERCEPTORS, useClass: role_interceptor_interceptor_1.RoleInterceptorInterceptor, multi: true
};
