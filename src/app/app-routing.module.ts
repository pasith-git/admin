import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { FirstpermissionGuard } from './guards/firstpermission.guard';
import { PermissonUpsideGuard } from './guards/permisson-upside.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddLayoutComponent } from './layout/addon/add-layout/add-layout.component';
import { OrderDetailComponent } from './management/reports/order-detail/order-detail.component';
import { OrderComponent } from './management/reports/order/order.component';
import { StockComponent } from './management/reports/stock/stock.component';
import { StockComponent as CrudStockComponent } from './management/crud/stock/stock.component';
import { laWords } from './utilConstant/index.util';
import { BillsComponent } from './management/bills/bills.component';
import { CheckoutComponent } from './management/bills/checkout/checkout.component';
import { TableResolverService } from './services/table-resolver.service';
import { PrinterComponent } from './management/crud/printer/printer.component';
import { ProductTypeComponent } from './management/crud/product-type/product-type.component';
import { UnitComponent } from './management/crud/unit/unit.component';
import { CategoryComponent } from './management/crud/category/category.component';
import { StockUnitComponent } from './management/crud/stock-unit/stock-unit.component';
import { ProductComponent } from './management/crud/product/product.component';
import { StockInComponent } from './management/crud/stock-in/stock-in.component';
import { StockOutComponent } from './management/crud/stock-out/stock-out.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MenuComponent } from './management/crud/menu/menu.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { UserComponent } from './user/user.component';
import { UserComponent as UserCrudComponent } from './management/crud/user/user.component';
import { CouponComponent } from './management/crud/coupon/coupon.component';
import { PackageGuard } from './guards/package.guard';
const routes: Routes = [
  {
    path: '', canActivateChild: [FirstpermissionGuard], component: AdminComponent, children: [
      { path: '', component: HomeComponent },
      {
        path: 'user', component: UserComponent,
      },
    ],
  },
  {
    path: '', canActivateChild: [FirstpermissionGuard, PackageGuard], pathMatch: 'prefix', component: AddLayoutComponent, children: [
      {
        path: '', pathMatch: 'prefix', canActivateChild: [NgxPermissionsGuard], children: [
          { path: 'ordersreport/:id', component: OrderComponent, data: { breadcrumb: laWords.headerReport.orderReport } },
          { path: 'orderdetailsreport/:id', component: OrderDetailComponent, data: { breadcrumb: laWords.headerReport.orderDetailReport } },
          { path: 'stocksreport/:id', component: StockComponent, data: { breadcrumb: laWords.headerReport.stockMainReport } },
        ], data: {
          path: 'reports', permissions: {
            only: ['RESTAURANTADMIN', 'BRANCHMANAGER', 'CASHIER', 'BRANCHACCOUNTANT'],
            redirecTo: '',
          }
        },
      },
     /*  {
        path: 'checkout/:id', component: BillsComponent, data: {
          path: 'checkout',
          breadcrumb: laWords.billManangement, permissions: {
            only: ['RESTAURANTADMIN', 'BRANCHMANAGER', 'CASHIER'],
            redirecTo: '',
          }
        }, canActivate: [NgxPermissionsGuard]
      },
      {
        path: 'checkout/:id', component: CheckoutComponent, data: { breadcrumb: laWords.billManangement, path: 'checkout' }, children: [
          {
            path: ':tid', component: CheckoutComponent, canActivate: [NgxPermissionsGuard], data: {
              breadcrumb: (data: any) => {
                return data.tableId;
              },
              permissions: {
                only: ['RESTAURANTADMIN', 'BRANCHMANAGER', 'CASHIER', 'WAITER'],
                redirecTo: '',
              }
            },

            resolve: { tableId: TableResolverService }
          }
        ]
      }, */
      {
        path: 'manage', pathMatch: 'prefix', children: [
          { path: ':id/printer', component: PrinterComponent, data: { breadcrumb: laWords.headerCrud.crudPrinter } },
          { path: ':id/product', component: ProductComponent, data: { breadcrumb: laWords.headerCrud.crudProduct } },
          { path: ':id/product-type', component: ProductTypeComponent, data: { breadcrumb: laWords.headerCrud.crudProductType } },
          { path: ':id/stock', component: CrudStockComponent, data: { breadcrumb: laWords.headerCrud.crudStock } },
          { path: ':id/unit', component: UnitComponent, data: { breadcrumb: laWords.headerCrud.crudUnit } },
          { path: ':id/category', component: CategoryComponent, data: { breadcrumb: laWords.headerCrud.crudCategory } },
          { path: ':id/stock-unit', component: StockUnitComponent, data: { breadcrumb: laWords.headerCrud.crudStockUnit } },
          { path: ':id/stock-in', component: StockInComponent, data: { breadcrumb: laWords.headerCrud.crudStockIn } },
          { path: ':id/stock-out', component: StockOutComponent, data: { breadcrumb: laWords.headerCrud.crudStockOut } },
          { path: ':id/menu', component: MenuComponent, data: { breadcrumb: laWords.headerCrud.crudMenu } },
          { path: ':id/user', component: UserCrudComponent, data: { breadcrumb: laWords.headerCrud.crudUser } },
          { path: ':id/coupon', component: CouponComponent, data: { breadcrumb: laWords.headerCrud.crudCoupon } },
        ], data: { path: 'crud' },
      },

    ],
  },

  {
    path: 'login', component: LoginComponent, canActivate: [PermissonUpsideGuard],
  },

  {
    path: '**', component: NotfoundComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})

export class AppRoutingModule {

}
