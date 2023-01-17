import { Injectable, OnInit } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
  NavigationEnd,
  ActivatedRoute
} from '@angular/router';
import { ResourcesService } from '../services/resources.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverResolver implements Resolve<boolean> {
  constructor(private resourcesService: ResourcesService, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(e=>{
      if(e instanceof NavigationEnd){
      }
    })
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
  }

}
