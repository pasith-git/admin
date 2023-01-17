import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserDto } from '../dto/user.dto';
import { GenUser, User } from '../models/user.model';
import { ApiPath, Util } from '../utilConstant/index.util';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public dataSub$ = new Subject<GenUser[]>();
  public dataObs$ = this.dataSub$.asObservable();
  constructor(private http: HttpClient) {

  }
  getUserData() {
    return this.http.get(Util.Api + 'admin/users');
  }
  getUserRoles() {
    return this.http.get(Util.Api + 'admin/users/roles')
  }
  postUserData() {
    return this.http.post(Util.Api + 'admin/users', {

    })
  }
  register(data: UserDto) {
    return this.http.post(Util.Api + ApiPath.user + '/register', data);
  }
  otp(data: { phone: string }) {
    return this.http.post(Util.Api + ApiPath.user + '/verify-code', data);
  }
  resetPassword(data: { userId: string, username: string, password: string }) {
    return this.http.post(Util.Api + ApiPath.user + '/change-password', data);
  }
  getDataByBranch(brchId: number) {
    return this.http.get<User[]>(Util.Api + ApiPath.user + `/${brchId}`);
  }
  delete(data: UserDto) {
    return this.http.put(Util.Api + ApiPath.user + '/delete', data);
  }
  create(data: UserDto) {
    return this.http.post(Util.Api + ApiPath.user, data);
  }
  update(data: UserDto) {
    return this.http.put(Util.Api + ApiPath.user + '/update', data);
  }
}
