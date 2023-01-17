import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalService {
  public calSubject = new BehaviorSubject<any>({});
  public calData$ = this.calSubject.asObservable();
  public calData: any;
  constructor() {
    this.calSubject.subscribe({
      next: (data) => {
        this.calData = data;
      }
    })
  }
}
