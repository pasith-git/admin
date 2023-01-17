"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var admin_component_1 = require("./layout/admin/admin.component");
var firstpermission_guard_1 = require("./guards/firstpermission.guard");
var permisson_upside_guard_1 = require("./guards/permisson-upside.guard");
var login_component_1 = require("./login/login.component");
var home_component_1 = require("./home/home.component");
var add_layout_component_1 = require("./layout/addon/add-layout/add-layout.component");
var order_detail_component_1 = require("./management/reports/order-detail/order-detail.component");
var order_component_1 = require("./management/reports/order/order.component");
var stock_component_1 = require("./management/reports/stock/stock.component");
var stock_component_2 = require("./management/crud/stock/stock.component");
var index_util_1 = require("./utilConstant/index.util");
var bills_component_1 = require("./management/bills/bills.component");
var checkout_component_1 = require("./management/bills/checkout/checkout.component");
var table_resolver_service_1 = require("./services/table-resolver.service");
var printer_component_1 = require("./management/crud/printer/printer.component");
var product_type_component_1 = require("./management/crud/product-type/product-type.component");
var unit_component_1 = require("./management/crud/unit/unit.component");
var category_component_1 = require("./management/crud/category/category.component");
var stock_unit_component_1 = require("./management/crud/stock-unit/stock-unit.component");
var product_component_1 = require("./management/crud/product/product.component");
var stock_in_component_1 = require("./management/crud/stock-in/stock-in.component");
var stock_out_component_1 = require("./management/crud/stock-out/stock-out.component");
var notfound_component_1 = require("./notfound/notfound.component");
var menu_component_1 = require("./management/crud/menu/menu.component");
var ngx_permissions_1 = require("ngx-permissions");
var user_component_1 = require("./user/user.component");
var user_component_2 = require("./management/crud/user/user.component");
var coupon_component_1 = require("./management/crud/coupon/coupon.component");
var routes = [
    {
        path: '', canActivateChild: [firstpermission_guard_1.FirstpermissionGuard], component: admin_component_1.AdminComponent, children: [
            { path: '', component: home_component_1.HomeComponent },
            {
                path: 'user', component: user_component_1.UserComponent
            },
        ]
    },
    {
        path: '', canActivateChild: [firstpermission_guard_1.FirstpermissionGuard], pathMatch: 'prefix', component: add_layout_component_1.AddLayoutComponent,
        children: [
            {
                path: '', pathMatch: 'prefix', canActivateChild: [ngx_permissions_1.NgxPermissionsGuard], children: [
                    { path: 'ordersreport/:id', component: order_component_1.OrderComponent, data: { breadcrumb: index_util_1.laWords.headerReport.orderReport } },
                    { path: 'orderdetailsreport/:id', component: order_detail_component_1.OrderDetailComponent, data: { breadcrumb: index_util_1.laWords.headerReport.orderDetailReport } },
                    { path: 'stocksreport/:id', component: stock_component_1.StockComponent, data: { breadcrumb: index_util_1.laWords.headerReport.stockMainReport } },
                ], data: {
                    path: 'reports', permissions: {
                        only: ['RESTAURANTADMIN', 'BRANCHMANAGER', 'CASHIER', 'BRANCHACCOUNTANT'],
                        redirecTo: ''
                    }
                }
            },
            {
                path: 'checkout/:id', component: bills_component_1.BillsComponent, data: {
                    path: 'checkout',
                    breadcrumb: index_util_1.laWords.billManangement, permissions: {
                        only: ['RESTAURANTADMIN', 'BRANCHMANAGER', 'CASHIER'],
                        redirecTo: ''
                    }
                }, canActivate: [ngx_permissions_1.NgxPermissionsGuard]
            },
            {
                path: 'checkout/:id', component: checkout_component_1.CheckoutComponent, data: { breadcrumb: index_util_1.laWords.billManangement, path: 'checkout' },
                children: [
                    {
                        path: ':tid', component: checkout_component_1.CheckoutComponent, canActivate: [ngx_permissions_1.NgxPermissionsGuard],
                        data: {
                            breadcrumb: function (data) {
                                return data.tableId;
                            },
                            permissions: {
                                only: ['RESTAURANTADMIN', 'BRANCHMANAGER', 'CASHIER', 'WAITER'],
                                redirecTo: ''
                            }
                        },
                        resolve: { tableId: table_resolver_service_1.TableResolverService }
                    }
                ]
            },
            {
                path: 'manage', pathMatch: 'prefix', children: [
                    { path: ':id/printer', component: printer_component_1.PrinterComponent, data: { breadcrumb: index_util_1.laWords.headerCrud.crudPrinter } },
                    { path: ':id/product', component: product_component_1.ProductComponent, data: { breadcrumb: index_util_1.laWords.headerCrud.crudProduct } },
                    { path: ':id/product-type', component: product_type_component_1.ProductTypeComponent, data: { breadcrumb: index_util_1.laWords.headerCrud.crudProductType } },
                    { path: ':id/stock', component: stock_component_2.StockComponent, data: { breadcrumb: index_util_1.laWords.headerCrud.crudStock } },
                    { path: ':id/unit', component: unit_component_1.UnitComponent, data: { breadcrumb: index_util_1.laWords.headerCrud.crudUnit } },
                    { path: ':id/category', component: category_component_1.CategoryComponent, data: { breadcrumb: index_util_1.laWords.headerCrud.crudCategory } },
                    { path: ':id/stock-unit', component: stock_unit_component_1.StockUnitComponent, data: { breadcrumb: index_util_1.laWords.headerCrud.crudStockUnit } },
                    { path: ':id/stock-in', component: stock_in_component_1.StockInComponent, data: { breadcrumb: index_util_1.laWords.headerCrud.crudStockIn } },
                    { path: ':id/stock-out', component: stock_out_component_1.StockOutComponent, data: { breadcrumb: index_util_1.laWords.headerCrud.crudStockOut } },
                    { path: ':id/menu', component: menu_component_1.MenuComponent, data: { breadcrumb: index_util_1.laWords.headerCrud.crudMenu } },
                    { path: ':id/user', component: user_component_2.UserComponent, data: { breadcrumb: index_util_1.laWords.headerCrud.crudUser } },
                    { path: ':id/coupon', component: coupon_component_1.CouponComponent, data: { breadcrumb: index_util_1.laWords.headerCrud.crudCoupon } },
                ], data: { path: 'crud' }
            },
        ]
    },
    {
        path: 'login', component: login_component_1.LoginComponent, canActivate: [permisson_upside_guard_1.PermissonUpsideGuard]
    },
    {
        path: '**', component: notfound_component_1.NotfoundComponent
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, {})],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
