import { Injectable } from '@angular/core';
import { StateKey } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RouteService {
  public stateSub = new Subject();
  public stateObs = this.stateSub.asObservable();
  constructor(private route: ActivatedRoute, private router: Router) {
    
  }


}
