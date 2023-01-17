import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath, Util } from '../utilConstant/index.util';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getProvince() {
    return this.http.get(Util.Api + ApiPath.province);
  }

  getDistrict(provinceId: number) {
    return this.http.get(Util.Api + ApiPath.district + `/${provinceId}`);
  }
}
