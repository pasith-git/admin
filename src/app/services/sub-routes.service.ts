import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
import { NgxPermissionsService } from 'ngx-permissions';
import { filter, firstValueFrom } from 'rxjs';
import { BranchesService } from './branches.service';
import { PMsgServiceService } from './p-msg-service.service';
import { ResourcesService } from './resources.service';

@Injectable({
  providedIn: 'root'
})
export class SubRoutesService {

  public paramId: number;
  constructor(private router: Router, private route: ActivatedRoute, private rs: ResourcesService,
    private permissionService: NgxPermissionsService, private pMessage: PMsgServiceService,
    private branchService: BranchesService) {
    this.subscribeToRouterParams();
  }
  subscribeToRouterParams() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let active = this.route;
        while (active.firstChild) { active = active.firstChild };
        active.params.subscribe((params: Params) => {
          this.paramId = parseInt(params['id']);
        });
      });
  }
  checkRoleBranches() {
    if (this.paramId) {
      firstValueFrom(this.branchService.getData()).then(branches => {
        if (branches.filter(data => data.id === this.paramId).length > 0) {
          if (parseInt(localStorage.getItem('brch') as string) !== this.paramId && (this.permissionService.getPermissions()['CASHIER']
            || this.permissionService.getPermissions()['WAITER'])) {
            this.pMessage.permissionFailed();
            this.router.navigate(['']);
          }
        } else {
          this.pMessage.branchNotFound();
          this.router.navigate(['']);
        }
      })

    }

  }
}
