import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsServiceService implements OnInit {
  constructor(private router: Router) {
    
  }


  ngOnInit(): void {
  }

}
