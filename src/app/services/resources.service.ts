import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject, filter, firstValueFrom, Subscription } from 'rxjs';
import { ApiPath, Util } from '../utilConstant/index.util';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root',
  useClass: ResourcesService,
})
export class ResourcesService {
  public resources: BehaviorSubject<any> = new BehaviorSubject(null);
  public data: any;
  constructor(private http: HttpClient,
    private pPermissionService: PermissionService, private np: NgxPermissionsService,) {
  }
  getResources() {
    return firstValueFrom(this.http.get(Util.Api + ApiPath.user + '/info')).then((data: any) => {
      const roles = data.roles.map((role: string) => {
        return role.toUpperCase();
      });
      this.data = data;
      const containRoles = roles.join(",");
      this.pPermissionService.setRole(containRoles);
      const permissions = this.pPermissionService.getRolesFromLocal()?.split(",");
      this.np.loadPermissions(permissions as string[]);
    }).catch(e => {
      return;
    })
  }
  getData(){
    return this.http.get(Util.Api + ApiPath.user + '/info');
  }

}
