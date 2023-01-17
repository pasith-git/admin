import { Component, OnInit, Input } from '@angular/core';
import { faStickyNote, faPrint, IconDefinition, faTasks } from '@fortawesome/free-solid-svg-icons';
import { NgxPermissionsService } from 'ngx-permissions';
import { MegaMenuItem } from 'primeng/api';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { PermissionService } from 'src/app/services/permission.service';
import { RouteService } from 'src/app/services/route.service';
import { laWords } from 'src/app/utilConstant/index.util';
interface NaviMenu {
  iconName: IconDefinition,
  label: string,
  menuList: MegaMenuItem[],
}
@Component({
  selector: 'mananagement-nav-card',
  templateUrl: './mananagement-nav-card.component.html',
  styleUrls: ['./mananagement-nav-card.component.css']
})
export class MananagementNavCardComponent implements OnInit {
  items: NaviMenu[];
  @Input() bid: string;
  constructor(private routeService: RouteService, private ngxPermissionsService: NgxPermissionsService, private permissionsService: PermissionService, private pMessage: PMsgServiceService) { }

  ngOnInit(): void {
    this.items = [/* {
      iconName: faPrint,
      label: 'ໃບບິນ',
      menuList: [
        {
          label: 'ເລືອກ',
          items: [
            [
              {
                ...(this.ngxPermissionsService.getPermissions()['RESTAURANTADMIN'] ||
                  this.ngxPermissionsService.getPermissions()['BRANCHMANAGER'] ||
                  this.ngxPermissionsService.getPermissions()['CASHIER']
                  ?
                  {
                    items: [
                      { label: laWords.billManangement, routerLink: `checkout/${this.bid}` },
                    ]
                  }
                  :
                  {
                    items: [
                      { label: laWords.billManangement, command: () => { this.pMessage.permissionFailed() } },
                    ]
                  }
                )

              },
            ],
          ]
        },

      ]
    }, */ {
      iconName: faStickyNote,
      label: 'ລາຍງານ',
      menuList: [
        {
          label: 'ເລືອກ',
          items: [
            [
              {
                ...(this.ngxPermissionsService.getPermissions()['RESTAURANTADMIN'] ||
                  this.ngxPermissionsService.getPermissions()['BRANCHMANAGER'] ||
                  this.ngxPermissionsService.getPermissions()['CASHIER'] ||
                  this.ngxPermissionsService.getPermissions()['BRANCHACCOUNTANT']
                  ?
                  {
                    items: [
                      { label: laWords.orderReport, routerLink: `ordersreport/${this.bid}` },
                      { label: laWords.orderDetailReport, routerLink: `orderdetailsreport/${this.bid}` },
                      { label: laWords.stockMainReport, routerLink: `stocksreport/${this.bid}` },
                    ]
                  }
                  :
                  {
                    items: [
                      { label: laWords.orderReport, command: () => { this.pMessage.permissionFailed() } },
                      { label: laWords.orderDetailReport, command: () => { this.pMessage.permissionFailed() } },
                      { label: laWords.stockMainReport, command: () => { this.pMessage.permissionFailed() } },
                    ]
                  }
                )

              },
            ],
          ]
        },

      ]
    },
    {
      iconName: faTasks,
      label: 'ຈັດການຂໍ້ມູນ',
      menuList: [
        {
          label: 'ເລືອກ',
          items: [
            [
              {
                items: [
                  { label: laWords.crud.crudUser, routerLink: `manage/${this.bid}/user` },
                  { label: laWords.crud.crudMenu, routerLink: `manage/${this.bid}/menu` },
                  { label: laWords.crud.crudProduct, routerLink: `manage/${this.bid}/product` },
                  { label: laWords.crud.crudProductType, routerLink: `manage/${this.bid}/product-type` },
                  { label: laWords.crud.crudStock, routerLink: `manage/${this.bid}/stock` },
                  { label: laWords.crud.crudUnit, routerLink: `manage/${this.bid}/unit` },
                  { label: laWords.crud.crudStockUnit, routerLink: `manage/${this.bid}/stock-unit` },
                  { label: laWords.crud.crudCategory, routerLink: `manage/${this.bid}/category` },
                  { label: laWords.crud.crudPrinter, routerLink: `manage/${this.bid}/printer` },
                  { label: laWords.crud.crudCoupon, routerLink: `manage/${this.bid}/coupon` },
                  { label: laWords.crud.crudStockIn, routerLink: `manage/${this.bid}/stock-in` },
                  { label: laWords.crud.crudStockOut, routerLink: `manage/${this.bid}/stock-out` },
                ]
              },
            ],
          ]
        },

      ]
    },
    ];
  }
}

