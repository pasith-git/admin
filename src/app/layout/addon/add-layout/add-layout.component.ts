import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BranchesService } from 'src/app/services/branches.service';
import { PackageService } from 'src/app/services/package.service';
import { PermissionService } from 'src/app/services/permission.service';
import { ResourcesService } from 'src/app/services/resources.service';
import { laWords } from 'src/app/utilConstant/index.util';

@Component({
  selector: 'app-add-layout',
  templateUrl: './add-layout.component.html',
  styleUrls: ['./add-layout.component.css'],
})
export class AddLayoutComponent implements OnInit {
  public reportMenuList: any[] = [];
  public crudMenuList: any[] = [];
  public showMenu: string;
  public modalP = this.permissionService.modalP.asObservable();
  constructor(private el: ElementRef, private route: ActivatedRoute,
    private router: Router,
    private permissionService: PermissionService,
    private branchService: BranchesService,
    private rs: ResourcesService,
    private cbr: ChangeDetectorRef,
    private pb: PackageService) {
    const bchId = this.router.url.split('/')[2];
    this.branchService.getBranchById(parseInt(bchId)).subscribe({
      next: (data) => {
        this.pb.getSub(data.expired);
        if(data.expired){
        this.router.navigate(['/'], { relativeTo: this.route, state: { package: true } });
        }
      }
    })
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.rs.getResources();
      }
    })
  }


  @HostListener("window:scroll", ['$event']) onWindowScroll(e: any) {
    const offSetTable = this.el.nativeElement.getElementsByClassName('p-datatable')[0]?.offsetTop;
    const headerTable = this.el.nativeElement.getElementsByClassName('p-datatable-header')[0];
    const theadTable = this.el.nativeElement.getElementsByClassName('p-datatable-thead')[0];
    const windowScroll = e.target.scrollingElement.scrollTop;
    if (headerTable) {
      if (windowScroll > offSetTable) {
        headerTable.style.cssText = `
          position: sticky;
          width: 96vw;
          z-index: 1011;
          top: 0;
        `
        theadTable.style.top = '75px';
      }
    }
  }

  ngOnInit(): void {

    const dataReport = this.route.children[0].snapshot.data['path'];
    const bchId = this.router.url.split('/')[2];
    if (dataReport === 'reports') {
      this.showMenu = 'reports';
    } else if (dataReport === 'crud') {
      this.showMenu = 'crud';
    } else if (dataReport === 'checkout') {
      this.showMenu = 'checkout';
    }
    this.reportMenuList = [
      { name: laWords.orderReport, link: `/ordersreport/${bchId}`, active: false },
      { name: laWords.orderDetailReport, link: `/orderdetailsreport/${bchId}`, active: false },
      { name: laWords.stockMainReport, link: `/stocksreport/${bchId}`, active: false },
    ]

    this.crudMenuList = [
      { name: laWords.crud.crudUser, active: false, link: `manage/${bchId}/user` },
      { name: laWords.crud.crudMenu, active: false, link: `manage/${bchId}/menu` },
      { name: laWords.crud.crudProduct, active: false, link: `manage/${bchId}/product` },
      { name: laWords.crud.crudProductType, active: false, link: `manage/${bchId}/product-type` },
      { name: laWords.crud.crudUnit, active: false, link: `manage/${bchId}/unit` },
      { name: laWords.crud.crudStock, active: false, link: `manage/${bchId}/stock` },
      { name: laWords.crud.crudStockUnit, active: false, link: `manage/${bchId}/stock-unit` },
      { name: laWords.crud.crudCategory, active: false, link: `manage/${bchId}/category` },
      { name: laWords.crud.crudPrinter, active: false, link: `manage/${bchId}/printer` },
      { name: laWords.crud.crudCoupon, active: false, link: `manage/${bchId}/coupon` },
      { name: laWords.crud.crudStockIn, active: false, link: `manage/${bchId}/stock-in` },
      { name: laWords.crud.crudStockOut, active: false, link: `manage/${bchId}/stock-out` },
    ]
  }

  modalPChange() {
    if (this.permissionService.modalP.getValue()) {
      this.permissionService.modalP.next(!this.permissionService.modalP.getValue());
    }
  }
  modalPHide() {
    this.permissionService.hideModal();
  }
}