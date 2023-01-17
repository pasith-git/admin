import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { FooterComponent } from './layout/admin/footer/footer.component';
import { HeaderComponent } from './layout/admin/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MenuListComponent } from './utilComponents/menu-list/menu-list.component';
import { PreventClickDirective } from './directs/prevent-click.directive';
import { loadingInterceptorProvider, roleInterceptorProvider, tokenInterceptorProvider } from './providers/multiInterceptorProvider';
import { BreadcrumbComponent } from './utilComponents/breadcrumb/breadcrumb.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AniDirective } from './directs/ani.directive';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { StyleClassModule } from 'primeng/styleclass';
import { AddLayoutComponent } from './layout/addon/add-layout/add-layout.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CookieService } from 'ngx-cookie-service';
import { NavEventDirective } from './directs/nav-event.directive';
import { RestaurantSelectorsComponent } from './management/reports/restaurant-selectors/restaurant-selectors.component';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OrderDetailComponent } from './management/reports/order-detail/order-detail.component';
import { StockInOutComponent } from './management/reports/stock-in-out/stock-in-out.component';
import { BoardsComponent } from './utilComponents/boards/temBoards/boards.component';
import { DisplayboardsComponent } from './utilComponents/boards/displayboards/displayboards.component';
import { EachBoardComponent } from './utilComponents/boards/each-board/each-board.component';
import { RbSelectorComponent } from './utilComponents/rb-selector/rb-selector.component';
import { OrderComponent } from './management/reports/order/order.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuReportHeaderComponent } from './utilComponents/menu-report-header/menu-report-header.component';
import { StockComponent } from './management/reports/stock/stock.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DropdownModule } from 'primeng/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MananagementNavCardComponent } from './utilComponents/mananagement-nav-card/mananagement-nav-card.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BillsComponent } from './management/bills/bills.component';
import { TestComponent } from './management/bills/test/test.component';
import { TableBoxComponent } from './management/bills/table-box/table-box.component';
import { CheckoutComponent } from './management/bills/checkout/checkout.component';
import { PmodalComponent } from './utilComponents/pmodal/pmodal.component';
import { EmptyComponent } from './utilComponents/empty/empty.component';
import { DynamicCrudComponent } from './utilComponents/dynamic-crud/dynamic-crud.component';
import { PrinterComponent } from './management/crud/printer/printer.component';
import { PmodalCrudComponent } from './utilComponents/pmodal-crud/pmodal-crud.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { BillComponent } from './utilComponents/bill/bill.component';
import { NgxPrintModule } from 'ngx-print';
import { MultiSelectModule } from 'primeng/multiselect';
import { ThermalPrintModule } from 'ng-thermal-print';
import { StateInputComponent } from './utilComponents/state-input/state-input.component';
import { DpButtonComponent } from './utilComponents/dp-button/dp-button.component';
import { UnitComponent } from './management/crud/unit/unit.component';
import { ProductTypeComponent } from './management/crud/product-type/product-type.component';
import { CategoryComponent } from './management/crud/category/category.component';
import { StockUnitComponent } from './management/crud/stock-unit/stock-unit.component';
import { StockComponent as CrudStockComponent } from './management/crud/stock/stock.component';
import { ProductComponent } from './management/crud/product/product.component';
import { StockInComponent } from './management/crud/stock-in/stock-in.component';
import { StockOutComponent } from './management/crud/stock-out/stock-out.component';
import { PdropdownComponent } from './utilComponents/pdropdown/pdropdown.component';
import { CheckboxModule } from 'primeng/checkbox';
import { PsepmodalComponent } from './utilComponents/psepmodal/psepmodal.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RecDirective } from './directs/rec.directive';
import { StoreModule } from '@ngrx/store';
import { couponReducer, spBillCheckoutReducer } from './management/bills/checkout/checkout.reducers';
import { WithLoadingPipe } from './pipes/with-loading.pipe';
import { CalculatorComponent } from './utilComponents/calculator/calculator.component';
import { TestService } from './services/test.service';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { MenuComponent } from './management/crud/menu/menu.component';
import { PermissionDirective } from './directs/permission.directive';
import { PermissionService } from './services/permission.service';
import { ResourcesService } from './services/resources.service';
import { UserResolverResolver } from './resolvers/user-resolver.resolver';
import { OutClickDirective } from './directs/out-click.directive';
import { ResizeImageComponent } from './utilComponents/resize-image/resize-image.component';
import { UserComponent } from './user/user.component';
import { UserComponent as UserCrudComponent } from './management/crud/user/user.component';
import { BranchBoardComponent } from './utilComponents/branch-board/branch-board.component';
import { CouponComponent } from './management/crud/coupon/coupon.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { GenerateBillComponent } from './generate-bill/generate-bill.component';
import { PackageBlockComponent } from './utilComponents/package-block/package-block.component';
import { BlockDirective } from './directs/block.directive';
import { PackageBlockContentComponent } from './utilComponents/package-block-content/package-block-content.component';
import { QrComponent } from './utilComponents/qr/qr.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    MenuListComponent,
    PreventClickDirective,
    BreadcrumbComponent,
    AniDirective,
    AddLayoutComponent,
    NavEventDirective,
    RestaurantSelectorsComponent,
    OrderDetailComponent,
    StockInOutComponent,
    DisplayboardsComponent,
    BoardsComponent,
    EachBoardComponent,
    RbSelectorComponent,
    OrderComponent,
    MenuReportHeaderComponent,
    StockComponent,
    MananagementNavCardComponent,
    BillsComponent,
    TestComponent,
    TableBoxComponent,
    CheckoutComponent,
    PmodalComponent,
    EmptyComponent,
    DynamicCrudComponent,
    PrinterComponent,
    PmodalCrudComponent,
    BillComponent,
    StateInputComponent,
    DpButtonComponent,
    UnitComponent,
    ProductTypeComponent,
    CategoryComponent,
    StockUnitComponent,
    CrudStockComponent,
    ProductComponent,
    StockInComponent,
    StockOutComponent,
    PdropdownComponent,
    PsepmodalComponent,
    NotfoundComponent,
    RecDirective,
    WithLoadingPipe,
    CalculatorComponent,
    MenuComponent,
    PermissionDirective,
    OutClickDirective,
    ResizeImageComponent,
    UserComponent,
    UserCrudComponent,
    BranchBoardComponent,
    CouponComponent,
    GenerateBillComponent,
    PackageBlockComponent,
    BlockDirective,
    PackageBlockContentComponent,
    QrComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    BreadcrumbModule,
    StyleClassModule,
    TableModule,
    DialogModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    PaginatorModule,
    ToastModule,
    ModalModule,
    PanelMenuModule,
    TooltipModule,
    InputNumberModule,
    BsDropdownModule,
    DropdownModule,
    NgxSpinnerModule,
    MegaMenuModule,
    ConfirmDialogModule,
    SplitButtonModule,
    NgxPrintModule,
    MultiSelectModule,
    ThermalPrintModule,
    CheckboxModule,
    RadioButtonModule,
    BsDatepickerModule.forRoot(),
    StoreModule.forRoot({ spBill: spBillCheckoutReducer, coupon: couponReducer }),
    NgxPermissionsModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [tokenInterceptorProvider, CookieService, MessageService,
    ConfirmationService, TestService, PermissionService, ResourcesService, UserResolverResolver],
  bootstrap: [AppComponent],
})
export class AppModule { }
