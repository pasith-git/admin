import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  public _role: string = '';
  public modalP: BehaviorSubject<any> = new BehaviorSubject(false);
  constructor() { }
  getRolesFromLocal() {
    return localStorage.getItem('roles');
  }
  setRole(data: any){
    localStorage.setItem('roles', data);
  }
  getRoles() {
    this._role = this.getRolesFromLocal() as string;
  }
  get role() {
    return this._role;
  }
  showModal(){
    this.modalP.next(true);
  }
  hideModal(){
    this.modalP.next(false);
  }
}
