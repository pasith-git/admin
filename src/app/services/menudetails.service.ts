import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath, Util } from '../utilConstant/index.util';

@Injectable({
  providedIn: 'root'
})
export class MenudetailsService {
  /* public dataSub$ = new Subject<Menu[]>(); */
  /* readonly dataObs$ = this.dataSub$.asObservable(); */
  constructor(private http: HttpClient,
  ) {
  }

  create(data: any) {
    return this.http.post<any>(Util.Api + `${ApiPath.menuDetail}`, data);
  }
  update(data: any) {
    return this.http.put<any>(Util.Api + `${ApiPath.menuDetail}/update`, data);
  }
  delete(data: any) {
    return this.http.delete<any>(Util.Api + `${ApiPath.menuDetail}/delete`, { body: data });
  }
}
