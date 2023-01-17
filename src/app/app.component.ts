import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Params, Router, RoutesRecognized } from '@angular/router';
import { roLocale } from 'ngx-bootstrap/chronos';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ResourcesService } from './services/resources.service';
import { SubRoutesService } from './services/sub-routes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ResourcesService],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private subRoutes: SubRoutesService, private resourcesService: ResourcesService, private np: NgxPermissionsService,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.resourcesService.getData().subscribe({
          next: (data: any) => {
            const roles = data.roles.map((role: string) => {
              return role.toUpperCase();
            })
            const branches = data.branches.id
            localStorage.setItem('roles', roles)
            localStorage.setItem('brch', branches)
          },
          error: () => {
            return;
          }
        })
        if (localStorage.getItem('roles')) {
          const localRoles = localStorage.getItem('roles')?.split(',') as string[];
          this.np.loadPermissions(localRoles as string[]);
        }
        this.subRoutes.checkRoleBranches();
        if (this.authService.getLSExpiredDate()) {
          setTimeout(() => {
            this.authService.clearAllAndRotate();
          }, this.authService.autoLogOut());
        }
      }
    })
  }
  title = 'admin';
  ngOnInit(): void {
    this.resourcesService.getData().subscribe({
      next: (data: any) => {
        const roles = data.roles.map((role: string) => {
          return role.toUpperCase();
        })
        const branches = data.branches.id
        localStorage.setItem('roles', roles)
        localStorage.setItem('brch', branches)
      },
      error: () => {
        return;
      }
    })
    if (localStorage.getItem('roles')) {
      const localRoles = localStorage.getItem('roles')?.split(',') as string[];
      this.np.loadPermissions(localRoles as string[]);
    }
    this.subRoutes.checkRoleBranches();
    if (this.authService.getExpiredDate()) {
      setTimeout(() => {
        this.authService.clearAllAndRotate();
      }, this.authService.autoLogOut());
    }
  }

}
