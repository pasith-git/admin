import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { filter, Observable } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermissionService } from '../services/permission.service';
import { AuthService } from '../services/auth.service';
import { authToken } from '../services/authToken';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private permissionService: NgxPermissionsService, private pPermissioService: PermissionService, private auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request);
  }
}
