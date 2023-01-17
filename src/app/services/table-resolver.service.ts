import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TableResolverService implements Resolve<any>{

  constructor() { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const id = route.params['tid'];
      return id;
  } 
}
