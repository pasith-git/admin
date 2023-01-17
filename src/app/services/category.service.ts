import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CategoryDto } from '../dto/category.dto';
import { Category } from '../models/category.model';
import { ApiPath, Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public dataSub$ = new Subject<Category[]>();
  readonly dataObs$ = this.dataSub$.asObservable();
  constructor(private http: HttpClient, private authService: AuthService,
  ) {
  }

  findAll(brchId: number) {
    return this.http.get<Category[]>(Util.Api + `${ApiPath.category}/${this.authService.getRestaurantId()}/${brchId}`);
  }

  create(data: CategoryDto) {
    return this.http.post<Category>(Util.Api + `${ApiPath.category}`, data);
  }
  update(data: CategoryDto) {
    return this.http.put<Category>(Util.Api + `${ApiPath.category}/update`, data);
  }
  delete(data: CategoryDto) {
    return this.http.put<Category>(Util.Api + `${ApiPath.category}/delete`, data);
  } 
}
