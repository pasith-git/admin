"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddLayoutComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_util_1 = require("src/app/utilConstant/index.util");
var AddLayoutComponent = /** @class */ (function () {
    function AddLayoutComponent(el, route, router, permissionService, rs, cbr) {
        var _this = this;
        this.el = el;
        this.route = route;
        this.router = router;
        this.permissionService = permissionService;
        this.rs = rs;
        this.cbr = cbr;
        this.reportMenuList = [];
        this.crudMenuList = [];
        this.modalP = this.permissionService.modalP.asObservable();
        this.router.events.subscribe(function (e) {
            if (e instanceof router_1.NavigationEnd) {
                _this.rs.getResources();
            }
        });
    }
    AddLayoutComponent.prototype.onWindowScroll = function (e) {
        var _a;
        var offSetTable = (_a = this.el.nativeElement.getElementsByClassName('p-datatable')[0]) === null || _a === void 0 ? void 0 : _a.offsetTop;
        var headerTable = this.el.nativeElement.getElementsByClassName('p-datatable-header')[0];
        var theadTable = this.el.nativeElement.getElementsByClassName('p-datatable-thead')[0];
        var windowScroll = e.target.scrollingElement.scrollTop;
        if (headerTable) {
            if (windowScroll > offSetTable) {
                headerTable.style.cssText = "\n          position: sticky;\n          width: 96vw;\n          z-index: 1011;\n          top: 0;\n        ";
                theadTable.style.top = '75px';
            }
        }
    };
    AddLayoutComponent.prototype.ngOnInit = function () {
        var dataReport = this.route.children[0].snapshot.data['path'];
        var bchId = this.router.url.split('/')[2];
        if (dataReport === 'reports') {
            this.showMenu = 'reports';
        }
        else if (dataReport === 'crud') {
            this.showMenu = 'crud';
        }
        else if (dataReport === 'checkout') {
            this.showMenu = 'checkout';
        }
        this.reportMenuList = [
            { name: index_util_1.laWords.orderReport, link: "/ordersreport/" + bchId, active: false },
            { name: index_util_1.laWords.orderDetailReport, link: "/orderdetailsreport/" + bchId, active: false },
            { name: index_util_1.laWords.stockMainReport, link: "/stocksreport/" + bchId, active: false },
        ];
        this.crudMenuList = [
            { name: index_util_1.laWords.crud.crudUser, active: false, link: "manage/" + bchId + "/user" },
            { name: index_util_1.laWords.crud.crudMenu, active: false, link: "manage/" + bchId + "/menu" },
            { name: index_util_1.laWords.crud.crudProduct, active: false, link: "manage/" + bchId + "/product" },
            { name: index_util_1.laWords.crud.crudProductType, active: false, link: "manage/" + bchId + "/product-type" },
            { name: index_util_1.laWords.crud.crudUnit, active: false, link: "manage/" + bchId + "/unit" },
            { name: index_util_1.laWords.crud.crudStock, active: false, link: "manage/" + bchId + "/stock" },
            { name: index_util_1.laWords.crud.crudStockUnit, active: false, link: "manage/" + bchId + "/stock-unit" },
            { name: index_util_1.laWords.crud.crudCategory, active: false, link: "manage/" + bchId + "/category" },
            { name: index_util_1.laWords.crud.crudPrinter, active: false, link: "manage/" + bchId + "/printer" },
            { name: index_util_1.laWords.crud.crudCoupon, active: false, link: "manage/" + bchId + "/coupon" },
            { name: index_util_1.laWords.crud.crudStockIn, active: false, link: "manage/" + bchId + "/stock-in" },
            { name: index_util_1.laWords.crud.crudStockOut, active: false, link: "manage/" + bchId + "/stock-out" },
        ];
    };
    AddLayoutComponent.prototype.modalPChange = function () {
        if (this.permissionService.modalP.getValue()) {
            this.permissionService.modalP.next(!this.permissionService.modalP.getValue());
        }
    };
    AddLayoutComponent.prototype.modalPHide = function () {
        this.permissionService.hideModal();
    };
    __decorate([
        core_1.HostListener("window:scroll", ['$event'])
    ], AddLayoutComponent.prototype, "onWindowScroll");
    AddLayoutComponent = __decorate([
        core_1.Component({
            selector: 'app-add-layout',
            templateUrl: './add-layout.component.html',
            styleUrls: ['./add-layout.component.css']
        })
    ], AddLayoutComponent);
    return AddLayoutComponent;
}());
exports.AddLayoutComponent = AddLayoutComponent;
