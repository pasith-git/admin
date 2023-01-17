import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { AuthService } from '../../services/auth.service';
import { Branch, Restaurant } from 'src/app/models/restaurants.model';
import { BranchesService } from 'src/app/services/branches.service';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, combineLatestAll, Observable, zip } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxPermissionsService } from 'ngx-permissions';
import { ResourcesService } from 'src/app/services/resources.service';
import { MenuListComponent } from '../menu-list/menu-list.component';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
@Component({
  selector: 'rb-selector',
  templateUrl: './rb-selector.component.html',
  styleUrls: ['./rb-selector.component.css']
})
export class RbSelectorComponent implements OnInit {

  public resName: string;
  public data: Branch[] = [];
  constructor(private resService: RestaurantsService,
    private authToken: AuthService,
    private brachService: BranchesService,
    private route: ActivatedRoute,
    private ngxSpinnerService: NgxSpinnerService,
    private np: NgxPermissionsService,
    private resourcesService: ResourcesService,
    private pMessageService: PMsgServiceService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    const resObs = this.resService.getRestaurantsData(this.authToken.getRestaurantId()!);
    const branchObs = this.brachService.getBranchObs(this.authToken.getRestaurantId()!);
    zip(resObs, branchObs).subscribe({
      next: (data) => {
        this.resName = data[0].name;
        this.data = data[1];
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    })
  }

  @ViewChildren(MenuListComponent) menuLists: QueryList<MenuListComponent>
  modalEvent(rbid: any) {
    if (this.np.getPermissions()['CASHIER'] || this.np.getPermissions()['WAITER']) {
      if (this.resourcesService.data.branches.id === rbid) {
        this.menuLists.map(menuList => {
          if (rbid === menuList.rbid) {
            menuList.modalDisplay = true;
          }
        })
      } else {
        this.pMessageService.permissionFailed();
      }
    } else {
      this.menuLists.map(menuList => {
        if (rbid === menuList.rbid) {
          menuList.modalDisplay = true;
        }
      })
    }

  }

}
