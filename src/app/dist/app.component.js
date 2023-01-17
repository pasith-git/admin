"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var resources_service_1 = require("./services/resources.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(authService, router, subRoutes, resourcesService, np) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.subRoutes = subRoutes;
        this.resourcesService = resourcesService;
        this.np = np;
        this.title = 'admin';
        this.router.events.subscribe(function (e) {
            var _a;
            if (e instanceof router_1.NavigationEnd) {
                _this.resourcesService.getData().subscribe({
                    next: function (data) {
                        var roles = data.roles.map(function (role) {
                            return role.toUpperCase();
                        });
                        var branches = data.branches.id;
                        localStorage.setItem('roles', roles);
                        localStorage.setItem('brch', branches);
                    },
                    error: function () {
                        return;
                    }
                });
                if (localStorage.getItem('roles')) {
                    var localRoles = (_a = localStorage.getItem('roles')) === null || _a === void 0 ? void 0 : _a.split(',');
                    _this.np.loadPermissions(localRoles);
                }
                _this.subRoutes.checkRoleBranches();
                if (_this.authService.getLSExpiredDate()) {
                    setTimeout(function () {
                        _this.authService.clearAllAndRotate();
                    }, _this.authService.autoLogOut());
                }
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        this.resourcesService.getData().subscribe({
            next: function (data) {
                var roles = data.roles.map(function (role) {
                    return role.toUpperCase();
                });
                var branches = data.branches.id;
                localStorage.setItem('roles', roles);
                localStorage.setItem('brch', branches);
            },
            error: function () {
                return;
            }
        });
        if (localStorage.getItem('roles')) {
            var localRoles = (_a = localStorage.getItem('roles')) === null || _a === void 0 ? void 0 : _a.split(',');
            this.np.loadPermissions(localRoles);
        }
        this.subRoutes.checkRoleBranches();
        if (this.authService.getExpiredDate()) {
            setTimeout(function () {
                _this.authService.clearAllAndRotate();
            }, this.authService.autoLogOut());
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            providers: [resources_service_1.ResourcesService]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
