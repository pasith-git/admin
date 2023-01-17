import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  public _name: string;
  constructor() { }
  set name(value: string) {
    this._name = value;
  }
  get name() {
    return this._name;
  }
}
