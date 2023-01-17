import { AfterContentInit, AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../services/permission.service';
import { DynamicCrudComponent } from '../utilComponents/dynamic-crud/dynamic-crud.component';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective implements AfterContentInit {
  @Output() permissionEvent = new EventEmitter();
  constructor(private permisionService: PermissionService, private viewContainerRef: ViewContainerRef) {
    this.permisionService.getRoles();
  }
  ngAfterContentInit(): void {
  }
  @HostListener('click') clickEvent() {
    this.permissionEvent.emit(this.permisionService.role);
  }

}