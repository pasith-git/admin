import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Res } from '../models/res.model';
import { Util } from '../utilConstant/index.util';
import { authToken } from './authToken';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth: boolean = false;
  public _token: string;
  httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
  }
  get token() {
    return this._token = this.getLsAuthKey();
  }



  getExpiredDate() {
    return moment().add(1, 'd');
  }

  getTokenToLocalStorage(token: string, tokenKey = authToken.tokenKey) {
    localStorage.setItem(tokenKey, token);
  }

  setRestaurantId(token: string, tokenKey = authToken.restaurantId) {
    localStorage.setItem(tokenKey, token);
  }

  getRestaurantId() {
    return localStorage.getItem(authToken.restaurantId);
  }

  getTokenRoles(token: string, tokenKey = authToken.tokenKey) {
    localStorage.setItem(tokenKey, token);
  }
  checkLocalStorage() {
    if (localStorage.getItem(authToken.tokenKey)) {
      this.isAuth = true
    }
  }

  checkToken() {
    if (localStorage.getItem(authToken.tokenKey)) {
      return true;
    }
    return false;
  }
  setLSAuth(token: string) {
    localStorage.setItem(authToken.tokenKey, token);
  }

  setLSexpiredDate(expiredDate: number) {
    let date = new Date();
    date.setSeconds(expiredDate);
    localStorage.setItem(authToken.expiredDate, moment(date).toISOString());
  }
  getLSExpiredDate() {
    return localStorage.getItem(authToken.expiredDate);
  }
  autoLogOut() {
    const now = moment().toDate().getTime();
    const expiredDate = moment(this.getLSExpiredDate()).toDate().getTime();
    const result = expiredDate - now;
    return result;
  }

  setRoles(token: string) {
    localStorage.setItem(authToken.roles, token);
  }

  setFirstname(token: string) {
    localStorage.setItem(authToken.firstname, token);
  }
  getFirstname() {
    return localStorage.getItem(authToken.firstname);
  }
  clearAllAndRotate() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  setTimerToLogout() {

  }
  checkRoleLS() {
    const roleToken = localStorage.getItem(authToken.roles);
    if (roleToken?.includes(',')) {
      const roles = roleToken.split(',');
      const findMultiRoles = roles.find(data => {
        return data === 'superadmin' || data === 'branchmanager' || data === 'restaurantadmin';
      })
      if (!!findMultiRoles) {
        return true
      } else {
        return false
      }
    } else {
      if (roleToken === 'superadmin' || roleToken === 'branchmanager' || roleToken === 'restaurantadmin,branchmanager') {
        return true;
      } else {
        return false;
      }
    }
  }

  checkLs() {
    if (localStorage.getItem(authToken.tokenKey)) {
      return true;
    } else {
      return false;
    }

  }
  getLsAuthKey() {
    const cookieToken = localStorage.getItem(authToken.tokenKey);
    return `Bearer ${cookieToken}`;
  }

  makeCredentials(username: string, password: string) {
    return this.http.post<Res>(Util.Api + `login/user`, { username, password })
  }
  getRolesName() {
    let localRoles = localStorage.getItem(authToken.roles)?.split(',')[0];
    let rolesArr = localRoles?.charAt(0).toUpperCase()! + localRoles?.substring(1);
    return rolesArr;
  }
}