import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuDto } from '../dto/menu.dto';
import { Menu } from '../models/menu.model';
import { ApiPath, Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public dataSub$ = new Subject<Menu[]>();
  readonly dataObs$ = this.dataSub$.asObservable();
  constructor(private http: HttpClient, private authService: AuthService,
  ) {
  }

  findAll(brchId: number) {
    return this.http.get<Menu[]>(Util.Api + `${ApiPath.menu}/${this.authService.getRestaurantId()}/${brchId}`);
  }

  create(data: any) {
    return this.http.post<Menu>(Util.Api + `${ApiPath.menu}`, data);
  }
  update(data: any) {
    return this.http.put<Menu>(Util.Api + `${ApiPath.menu}/update`, data);
  }
  delete(data: MenuDto) {
    return this.http.put<Menu>(Util.Api + `${ApiPath.menu}/delete`, data);
  }
  findAllById(id: number, brchId: number){
    return this.http.get<Menu>(Util.Api + `${ApiPath.menu}/menu/${brchId}/${id}`);
  }
}
