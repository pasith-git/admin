"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MananagementNavCardComponent = void 0;
var core_1 = require("@angular/core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var index_util_1 = require("src/app/utilConstant/index.util");
var MananagementNavCardComponent = /** @class */ (function () {
    function MananagementNavCardComponent(routeService, ngxPermissionsService, permissionsService, pMessage) {
        this.routeService = routeService;
        this.ngxPermissionsService = ngxPermissionsService;
        this.permissionsService = permissionsService;
        this.pMessage = pMessage;
    }
    MananagementNavCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.items = [{
                iconName: free_solid_svg_icons_1.faPrint,
                label: 'ໃບບິນ',
                menuList: [
                    {
                        label: 'ເລືອກ',
                        items: [
                            [
                                __assign({}, (this.ngxPermissionsService.getPermissions()['RESTAURANTADMIN'] ||
                                    this.ngxPermissionsService.getPermissions()['BRANCHMANAGER'] ||
                                    this.ngxPermissionsService.getPermissions()['CASHIER']
                                    ?
                                        {
                                            items: [
                                                { label: index_util_1.laWords.billManangement, routerLink: "checkout/" + this.bid },
                                            ]
                                        }
                                    :
                                        {
                                            items: [
                                                { label: index_util_1.laWords.billManangement, command: function () { _this.pMessage.permissionFailed(); } },
                                            ]
                                        })),
                            ],
                        ]
                    },
                ]
            }, {
                iconName: free_solid_svg_icons_1.faStickyNote,
                label: 'ລາຍງານ',
                menuList: [
                    {
                        label: 'ເລືອກ',
                        items: [
                            [
                                __assign({}, (this.ngxPermissionsService.getPermissions()['RESTAURANTADMIN'] ||
                                    this.ngxPermissionsService.getPermissions()['BRANCHMANAGER'] ||
                                    this.ngxPermissionsService.getPermissions()['CASHIER'] ||
                                    this.ngxPermissionsService.getPermissions()['BRANCHACCOUNTANT']
                                    ?
                                        {
                                            items: [
                                                { label: index_util_1.laWords.orderReport, routerLink: "ordersreport/" + this.bid },
                                                { label: index_util_1.laWords.orderDetailReport, routerLink: "orderdetailsreport/" + this.bid },
                                                { label: index_util_1.laWords.stockMainReport, routerLink: "stocksreport/" + this.bid },
                                            ]
                                        }
                                    :
                                        {
                                            items: [
                                                { label: index_util_1.laWords.orderReport, command: function () { _this.pMessage.permissionFailed(); } },
                                                { label: index_util_1.laWords.orderDetailReport, command: function () { _this.pMessage.permissionFailed(); } },
                                                { label: index_util_1.laWords.stockMainReport, command: function () { _this.pMessage.permissionFailed(); } },
                                            ]
                                        })),
                            ],
                        ]
                    },
                ]
            },
            {
                iconName: free_solid_svg_icons_1.faTasks,
                label: 'ຈັດການຂໍ້ມູນ',
                menuList: [
                    {
                        label: 'ເລືອກ',
                        items: [
                            [
                                {
                                    items: [
                                        { label: index_util_1.laWords.crud.crudUser, routerLink: "manage/" + this.bid + "/user" },
                                        { label: index_util_1.laWords.crud.crudMenu, routerLink: "manage/" + this.bid + "/menu" },
                                        { label: index_util_1.laWords.crud.crudProduct, routerLink: "manage/" + this.bid + "/product" },
                                        { label: index_util_1.laWords.crud.crudProductType, routerLink: "manage/" + this.bid + "/product-type" },
                                        { label: index_util_1.laWords.crud.crudStock, routerLink: "manage/" + this.bid + "/stock" },
                                        { label: index_util_1.laWords.crud.crudUnit, routerLink: "manage/" + this.bid + "/unit" },
                                        { label: index_util_1.laWords.crud.crudStockUnit, routerLink: "manage/" + this.bid + "/stock-unit" },
                                        { label: index_util_1.laWords.crud.crudCategory, routerLink: "manage/" + this.bid + "/category" },
                                        { label: index_util_1.laWords.crud.crudPrinter, routerLink: "manage/" + this.bid + "/printer" },
                                        { label: index_util_1.laWords.crud.crudCoupon, routerLink: "manage/" + this.bid + "/coupon" },
                                        { label: index_util_1.laWords.crud.crudStockIn, routerLink: "manage/" + this.bid + "/stock-in" },
                                        { label: index_util_1.laWords.crud.crudStockOut, routerLink: "manage/" + this.bid + "/stock-out" },
                                    ]
                                },
                            ],
                        ]
                    },
                ]
            },
        ];
    };
    __decorate([
        core_1.Input()
    ], MananagementNavCardComponent.prototype, "bid");
    MananagementNavCardComponent = __decorate([
        core_1.Component({
            selector: 'mananagement-nav-card',
            templateUrl: './mananagement-nav-card.component.html',
            styleUrls: ['./mananagement-nav-card.component.css']
        })
    ], MananagementNavCardComponent);
    return MananagementNavCardComponent;
}());
exports.MananagementNavCardComponent = MananagementNavCardComponent;
