import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ApiPath, Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';
import { Unit } from '../models/unit.model';
import { UnitDto } from '../dto/unit.dto';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  public dataSub$ = new Subject<Unit[]>();
  readonly dataObs$ = this.dataSub$.asObservable();
  constructor(private http: HttpClient, private authService: AuthService,
  ) {
  }

  findAll(brchId: number) {
    return this.http.get<Unit[]>(Util.Api + `${ApiPath.unit}/${this.authService.getRestaurantId()}/${brchId}`);
  }

  create(data: UnitDto) {
    return this.http.post<Unit>(Util.Api + `${ApiPath.unit}`, data);
  }
  update(data: UnitDto) {
    return this.http.put<Unit>(Util.Api + `${ApiPath.unit}/update`, data);
  }
  delete(data: UnitDto) {
    return this.http.put<Unit>(Util.Api + `${ApiPath.unit}/delete`, data);
  }

}
