import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { faSmileWink } from '@fortawesome/free-solid-svg-icons';
import { map, observable, Observable, take, tap } from 'rxjs';
import { BranchesService } from '../services/branches.service';
import { PackageService } from '../services/package.service';

@Injectable({
  providedIn: 'root'
})
export class PackageGuard implements CanActivate, CanActivateChild {
  private ss$: Observable<string[]>;
  constructor(private router: Router, private route: ActivatedRoute, private pb: PackageService, private branchService: BranchesService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const bchId = state.url.split('/')[2];
    this.branchService.getBranchById(parseInt(bchId)).subscribe({
      next: (data) => {
        this.pb.getSub(data.expired);
      }
    });
    if (localStorage.getItem("expired") === "true") {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./'], { relativeTo: this.route, state: { package: true } });
      return false;
    } else {
      return true;
    }
  }
}
