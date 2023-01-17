"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RbSelectorComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var menu_list_component_1 = require("../menu-list/menu-list.component");
var RbSelectorComponent = /** @class */ (function () {
    function RbSelectorComponent(resService, authToken, brachService, route, ngxSpinnerService, np, resourcesService, pMessageService) {
        this.resService = resService;
        this.authToken = authToken;
        this.brachService = brachService;
        this.route = route;
        this.ngxSpinnerService = ngxSpinnerService;
        this.np = np;
        this.resourcesService = resourcesService;
        this.pMessageService = pMessageService;
        this.data = [];
    }
    RbSelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngxSpinnerService.show();
        var resObs = this.resService.getRestaurantsData(this.authToken.getRestaurantId());
        var branchObs = this.brachService.getBranchObs(this.authToken.getRestaurantId());
        rxjs_1.zip(resObs, branchObs).subscribe({
            next: function (data) {
                _this.resName = data[0].name;
                _this.data = data[1];
            },
            complete: function () {
                _this.ngxSpinnerService.hide();
            }
        });
    };
    RbSelectorComponent.prototype.modalEvent = function (rbid) {
        if (this.np.getPermissions()['CASHIER'] || this.np.getPermissions()['WAITER']) {
            if (this.resourcesService.data.branches.id === rbid) {
                this.menuLists.map(function (menuList) {
                    if (rbid === menuList.rbid) {
                        menuList.modalDisplay = true;
                    }
                });
            }
            else {
                this.pMessageService.permissionFailed();
            }
        }
        else {
            this.menuLists.map(function (menuList) {
                if (rbid === menuList.rbid) {
                    menuList.modalDisplay = true;
                }
            });
        }
    };
    __decorate([
        core_1.ViewChildren(menu_list_component_1.MenuListComponent)
    ], RbSelectorComponent.prototype, "menuLists");
    RbSelectorComponent = __decorate([
        core_1.Component({
            selector: 'rb-selector',
            templateUrl: './rb-selector.component.html',
            styleUrls: ['./rb-selector.component.css']
        })
    ], RbSelectorComponent);
    return RbSelectorComponent;
}());
exports.RbSelectorComponent = RbSelectorComponent;
