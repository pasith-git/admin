import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, Subject } from 'rxjs';
import { Bank, BankOptions } from '../models/bank.model';
import { ApiPath, Util } from '../utilConstant/index.util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private readonly loading$ = new BehaviorSubject(false);
  constructor(private http: HttpClient, private authService: AuthService) { }

  findAll(brchId: number): Observable<Bank[]> {
    return this.http.get<Bank[]>(Util.Api + ApiPath.bank + `/${this.authService.getRestaurantId()}/${brchId}`);
  }

  findIdAndName(brchId: number): Observable<BankOptions[]> {
    return this.findAll(brchId).pipe(map((banks) => {
      return banks.map(({ id, name }) => {
        return {
          id,
          name,
        }
      });
    }),

    );
  }
}
