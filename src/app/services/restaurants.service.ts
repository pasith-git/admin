import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, filter, Subject } from 'rxjs';
import { Restaurant } from '../models/restaurants.model';
import { Util } from '../utilConstant/index.util';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  public restaurantsSubject = new Subject<Restaurant>();
  public restaurantsObs = this.restaurantsSubject.asObservable();
  constructor(private http: HttpClient) {
    
  }
  getRestaurantsData(resId: string) {
    return this.http.get<Restaurant>(Util.Api + `restaurants/${resId}`);
  }
}