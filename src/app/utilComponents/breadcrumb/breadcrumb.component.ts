import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Data, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter} from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  homeItem: MenuItem;
  breadcrumbs: MenuItem[] = [];
  constructor(private router: Router) {
    this.homeItem = {icon: 'pi pi-home', routerLink: '/'};
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumb: MenuItem[] = [];
        this.breadcrumbs = breadcrumb;
        this.addBreadcrumb(root, [], breadcrumb);
      })
  }
  ngOnInit(): void {
  }
  private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: MenuItem[]){
    if(route){
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));
      if(route.data['breadcrumb']){
        const breadcrumb = {
          label: this.getLabel(route.data),
          url: routeUrl.join('/')
        }
        breadcrumbs.push(breadcrumb);
      }
      this.addBreadcrumb(route.firstChild!, routeUrl, breadcrumbs);
    }
  }
  private getLabel(data: Data){ 
    return typeof data['breadcrumb'] === 'function' ? data['breadcrumb'](data) : data['breadcrumb'];
  } 

}