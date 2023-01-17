import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { AuthService } from '../services/auth.service';
import { authToken } from '../services/authToken';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getLsAuthKey();
    const authReq = req.clone({
      headers: req.headers.set(authToken.header, token)
    })

    return next.handle(authReq);
  }
}
