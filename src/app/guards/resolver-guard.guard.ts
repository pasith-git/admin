import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs';
import { ResourcesService } from '../services/resources.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverGuardGuard implements CanActivateChild{

  constructor(private resourcesService: ResourcesService){
    this.resourcesService.getResources();
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return true;
  }
}
