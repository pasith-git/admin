import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Province } from '../models/province.model';
import { Util } from '../utilConstant/index.util';

@Injectable({
  providedIn: 'root'
})
export class ProvincesService {
  public provincesSub = new BehaviorSubject<Province[]>([]);
  public provincesObs = this.provincesSub.asObservable();
  constructor(private http: HttpClient) {
    this.getProvincesData().subscribe((data: any) => {
      this.provincesSub.next(data.provinces);
    })
  }

  getProvincesData() {
    return this.http.get(Util.Api + 'provinces')
  }
  createProvincesData(name: string, region: string) {
    return this.http.post(Util.Api + 'provinces', {
      name: name,
      section: region,
    });
  }
}