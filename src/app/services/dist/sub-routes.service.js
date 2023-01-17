"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubRoutesService = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var SubRoutesService = /** @class */ (function () {
    function SubRoutesService(router, route, rs, permissionService, pMessage, branchService) {
        this.router = router;
        this.route = route;
        this.rs = rs;
        this.permissionService = permissionService;
        this.pMessage = pMessage;
        this.branchService = branchService;
        this.subscribeToRouterParams();
    }
    SubRoutesService.prototype.subscribeToRouterParams = function () {
        var _this = this;
        this.router.events.pipe(rxjs_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }))
            .subscribe(function () {
            var active = _this.route;
            while (active.firstChild) {
                active = active.firstChild;
            }
            ;
            active.params.subscribe(function (params) {
                _this.paramId = parseInt(params['id']);
            });
        });
    };
    SubRoutesService.prototype.checkRoleBranches = function () {
        var _this = this;
        if (this.paramId) {
            rxjs_1.firstValueFrom(this.branchService.getData()).then(function (branches) {
                if (branches.filter(function (data) { return data.id === _this.paramId; }).length > 0) {
                    if (parseInt(localStorage.getItem('brch')) !== _this.paramId && (_this.permissionService.getPermissions()['CASHIER']
                        || _this.permissionService.getPermissions()['WAITER'])) {
                        _this.pMessage.permissionFailed();
                        _this.router.navigate(['']);
                    }
                }
                else {
                    _this.pMessage.branchNotFound();
                    _this.router.navigate(['']);
                }
            });
        }
    };
    SubRoutesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SubRoutesService);
    return SubRoutesService;
}());
exports.SubRoutesService = SubRoutesService;
