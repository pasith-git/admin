"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var admin_component_1 = require("./layout/admin/admin.component");
var footer_component_1 = require("./layout/admin/footer/footer.component");
var header_component_1 = require("./layout/admin/header/header.component");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_toastr_1 = require("ngx-toastr");
var login_component_1 = require("./login/login.component");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var home_component_1 = require("./home/home.component");
var menu_list_component_1 = require("./utilComponents/menu-list/menu-list.component");
var prevent_click_directive_1 = require("./directs/prevent-click.directive");
var multiInterceptorProvider_1 = require("./providers/multiInterceptorProvider");
var breadcrumb_component_1 = require("./utilComponents/breadcrumb/breadcrumb.component");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var ani_directive_1 = require("./directs/ani.directive");
var breadcrumb_1 = require("primeng/breadcrumb");
var styleclass_1 = require("primeng/styleclass");
var add_layout_component_1 = require("./layout/addon/add-layout/add-layout.component");
var table_1 = require("primeng/table");
var dialog_1 = require("primeng/dialog");
var inputtext_1 = require("primeng/inputtext");
var card_1 = require("primeng/card");
var button_1 = require("primeng/button");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var nav_event_directive_1 = require("./directs/nav-event.directive");
var restaurant_selectors_component_1 = require("./management/reports/restaurant-selectors/restaurant-selectors.component");
var paginator_1 = require("primeng/paginator");
var toast_1 = require("primeng/toast");
var api_1 = require("primeng/api");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var order_detail_component_1 = require("./management/reports/order-detail/order-detail.component");
var stock_in_out_component_1 = require("./management/reports/stock-in-out/stock-in-out.component");
var boards_component_1 = require("./utilComponents/boards/temBoards/boards.component");
var displayboards_component_1 = require("./utilComponents/boards/displayboards/displayboards.component");
var each_board_component_1 = require("./utilComponents/boards/each-board/each-board.component");
var rb_selector_component_1 = require("./utilComponents/rb-selector/rb-selector.component");
var order_component_1 = require("./management/reports/order/order.component");
var modal_1 = require("ngx-bootstrap/modal");
var panelmenu_1 = require("primeng/panelmenu");
var menu_report_header_component_1 = require("./utilComponents/menu-report-header/menu-report-header.component");
var stock_component_1 = require("./management/reports/stock/stock.component");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var dropdown_2 = require("primeng/dropdown");
var ngx_spinner_1 = require("ngx-spinner");
var mananagement_nav_card_component_1 = require("./utilComponents/mananagement-nav-card/mananagement-nav-card.component");
var megamenu_1 = require("primeng/megamenu");
var confirmdialog_1 = require("primeng/confirmdialog");
var splitbutton_1 = require("primeng/splitbutton");
var bills_component_1 = require("./management/bills/bills.component");
var test_component_1 = require("./management/bills/test/test.component");
var table_box_component_1 = require("./management/bills/table-box/table-box.component");
var checkout_component_1 = require("./management/bills/checkout/checkout.component");
var pmodal_component_1 = require("./utilComponents/pmodal/pmodal.component");
var empty_component_1 = require("./utilComponents/empty/empty.component");
var dynamic_crud_component_1 = require("./utilComponents/dynamic-crud/dynamic-crud.component");
var printer_component_1 = require("./management/crud/printer/printer.component");
var pmodal_crud_component_1 = require("./utilComponents/pmodal-crud/pmodal-crud.component");
var inputnumber_1 = require("primeng/inputnumber");
var bill_component_1 = require("./utilComponents/bill/bill.component");
var ngx_print_1 = require("ngx-print");
var multiselect_1 = require("primeng/multiselect");
var ng_thermal_print_1 = require("ng-thermal-print");
var state_input_component_1 = require("./utilComponents/state-input/state-input.component");
var dp_button_component_1 = require("./utilComponents/dp-button/dp-button.component");
var unit_component_1 = require("./management/crud/unit/unit.component");
var product_type_component_1 = require("./management/crud/product-type/product-type.component");
var category_component_1 = require("./management/crud/category/category.component");
var stock_unit_component_1 = require("./management/crud/stock-unit/stock-unit.component");
var stock_component_2 = require("./management/crud/stock/stock.component");
var product_component_1 = require("./management/crud/product/product.component");
var stock_in_component_1 = require("./management/crud/stock-in/stock-in.component");
var stock_out_component_1 = require("./management/crud/stock-out/stock-out.component");
var pdropdown_component_1 = require("./utilComponents/pdropdown/pdropdown.component");
var checkbox_1 = require("primeng/checkbox");
var psepmodal_component_1 = require("./utilComponents/psepmodal/psepmodal.component");
var notfound_component_1 = require("./notfound/notfound.component");
var rec_directive_1 = require("./directs/rec.directive");
var store_1 = require("@ngrx/store");
var checkout_reducers_1 = require("./management/bills/checkout/checkout.reducers");
var with_loading_pipe_1 = require("./pipes/with-loading.pipe");
var calculator_component_1 = require("./utilComponents/calculator/calculator.component");
var test_service_1 = require("./services/test.service");
var ngx_permissions_1 = require("ngx-permissions");
var menu_component_1 = require("./management/crud/menu/menu.component");
var permission_directive_1 = require("./directs/permission.directive");
var permission_service_1 = require("./services/permission.service");
var resources_service_1 = require("./services/resources.service");
var user_resolver_resolver_1 = require("./resolvers/user-resolver.resolver");
var out_click_directive_1 = require("./directs/out-click.directive");
var resize_image_component_1 = require("./utilComponents/resize-image/resize-image.component");
var user_component_1 = require("./user/user.component");
var user_component_2 = require("./management/crud/user/user.component");
var branch_board_component_1 = require("./utilComponents/branch-board/branch-board.component");
var coupon_component_1 = require("./management/crud/coupon/coupon.component");
var radiobutton_1 = require("primeng/radiobutton");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                admin_component_1.AdminComponent,
                footer_component_1.FooterComponent,
                header_component_1.HeaderComponent,
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                menu_list_component_1.MenuListComponent,
                prevent_click_directive_1.PreventClickDirective,
                breadcrumb_component_1.BreadcrumbComponent,
                ani_directive_1.AniDirective,
                add_layout_component_1.AddLayoutComponent,
                nav_event_directive_1.NavEventDirective,
                restaurant_selectors_component_1.RestaurantSelectorsComponent,
                order_detail_component_1.OrderDetailComponent,
                stock_in_out_component_1.StockInOutComponent,
                displayboards_component_1.DisplayboardsComponent,
                boards_component_1.BoardsComponent,
                each_board_component_1.EachBoardComponent,
                rb_selector_component_1.RbSelectorComponent,
                order_component_1.OrderComponent,
                menu_report_header_component_1.MenuReportHeaderComponent,
                stock_component_1.StockComponent,
                mananagement_nav_card_component_1.MananagementNavCardComponent,
                bills_component_1.BillsComponent,
                test_component_1.TestComponent,
                table_box_component_1.TableBoxComponent,
                checkout_component_1.CheckoutComponent,
                pmodal_component_1.PmodalComponent,
                empty_component_1.EmptyComponent,
                dynamic_crud_component_1.DynamicCrudComponent,
                printer_component_1.PrinterComponent,
                pmodal_crud_component_1.PmodalCrudComponent,
                bill_component_1.BillComponent,
                state_input_component_1.StateInputComponent,
                dp_button_component_1.DpButtonComponent,
                unit_component_1.UnitComponent,
                product_type_component_1.ProductTypeComponent,
                category_component_1.CategoryComponent,
                stock_unit_component_1.StockUnitComponent,
                stock_component_2.StockComponent,
                product_component_1.ProductComponent,
                stock_in_component_1.StockInComponent,
                stock_out_component_1.StockOutComponent,
                pdropdown_component_1.PdropdownComponent,
                psepmodal_component_1.PsepmodalComponent,
                notfound_component_1.NotfoundComponent,
                rec_directive_1.RecDirective,
                with_loading_pipe_1.WithLoadingPipe,
                calculator_component_1.CalculatorComponent,
                menu_component_1.MenuComponent,
                permission_directive_1.PermissionDirective,
                out_click_directive_1.OutClickDirective,
                resize_image_component_1.ResizeImageComponent,
                user_component_1.UserComponent,
                user_component_2.UserComponent,
                branch_board_component_1.BranchBoardComponent,
                coupon_component_1.CouponComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                ngx_toastr_1.ToastrModule.forRoot({
                    positionClass: 'toast-top-right'
                }),
                app_routing_module_1.AppRoutingModule,
                forms_1.ReactiveFormsModule,
                angular_fontawesome_1.FontAwesomeModule,
                forms_1.FormsModule,
                breadcrumb_1.BreadcrumbModule,
                styleclass_1.StyleClassModule,
                table_1.TableModule,
                dialog_1.DialogModule,
                inputtext_1.InputTextModule,
                card_1.CardModule,
                button_1.ButtonModule,
                paginator_1.PaginatorModule,
                toast_1.ToastModule,
                modal_1.ModalModule,
                panelmenu_1.PanelMenuModule,
                tooltip_1.TooltipModule,
                inputnumber_1.InputNumberModule,
                dropdown_1.BsDropdownModule,
                dropdown_2.DropdownModule,
                ngx_spinner_1.NgxSpinnerModule,
                megamenu_1.MegaMenuModule,
                confirmdialog_1.ConfirmDialogModule,
                splitbutton_1.SplitButtonModule,
                ngx_print_1.NgxPrintModule,
                multiselect_1.MultiSelectModule,
                ng_thermal_print_1.ThermalPrintModule,
                checkbox_1.CheckboxModule,
                radiobutton_1.RadioButtonModule,
                datepicker_1.BsDatepickerModule.forRoot(),
                store_1.StoreModule.forRoot({ spBill: checkout_reducers_1.spBillCheckoutReducer, coupon: checkout_reducers_1.couponReducer }),
                ngx_permissions_1.NgxPermissionsModule.forRoot(),
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            providers: [multiInterceptorProvider_1.tokenInterceptorProvider, ngx_cookie_service_1.CookieService, api_1.MessageService,
                api_1.ConfirmationService, test_service_1.TestService, permission_service_1.PermissionService, resources_service_1.ResourcesService, user_resolver_resolver_1.UserResolverResolver],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
