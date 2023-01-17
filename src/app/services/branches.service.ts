import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Branch } from '../models/restaurants.model';
import { Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BranchesService implements OnInit {
  public branchesSubject = new BehaviorSubject<Branch[]>([]);
  public branchesObs = this.branchesSubject.asObservable();
  public totalBranch: number;
  constructor(private http: HttpClient, private authService: AuthService) {
  }
  ngOnInit(): void {
  }
  getBranchData(restaurantId: number){
    return this.http.get(Util.Api + `restaurants/${restaurantId}`).subscribe((data:any)=>{
      this.branchesSubject.next(data.branches);
    });
  }
  getBranchObs(resId: string){
    return this.http.get<Branch[]>(Util.Api + `branches/${resId}`);
  }
  
  getData(){
    return this.http.get<Branch[]>(Util.Api + `branches/${this.authService.getRestaurantId()}`);
  }
  getBranchById(id: number){
    return this.http.get<Branch>(Util.Api + `branches/${this.authService.getRestaurantId()}/${id}`);
  }
}
