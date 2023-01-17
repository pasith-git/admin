import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilServiceService {
  public subValue: Boolean;
  public subChange = new Subject<Boolean>();
  constructor() {
    this.subChange.subscribe(value => {
      this.subValue = value;
    })
  }

  changeSubEvent() {
    this.subChange.next(!this.subValue);
  }

}
