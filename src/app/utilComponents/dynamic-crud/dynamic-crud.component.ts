import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { PermissionService } from 'src/app/services/permission.service';
import { Roles } from 'src/app/utilConstant/index.util';
import { DpButtonComponent } from '../dp-button/dp-button.component';

@Component({
  selector: 'dynamic-crud',
  templateUrl: './dynamic-crud.component.html',
  styleUrls: ['./dynamic-crud.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicCrudComponent implements OnInit {
  @Input() extraColKey: string;;
  @Input() data$: Observable<any[]>;
  @Input() col: any[] = [];
  @Input() items: MenuItem[];
  @Output() modalShow = new EventEmitter<boolean>();
  @ViewChildren(DpButtonComponent) dpButtons: QueryList<any>;
  @Output() dpEdit = new EventEmitter();
  @Output() dpRemove = new EventEmitter();
  @Input() disabled: boolean;
  @Input() extraColCheck: boolean;
  @Input() extraColProfile: boolean;
  @Input() extraCol: any;
  @Output() eventFullPic = new EventEmitter();
  public roles: string[] = [];
  constructor(private el: ElementRef, public permissonService: PermissionService, private np: NgxPermissionsService) {
  }
  @HostListener("window:scroll", ['$event']) onWindowScroll(e: any) {
    const offSetTable = this.el.nativeElement.getElementsByClassName('p-datatable')[0]?.offsetTop;
    const headerTable = this.el.nativeElement.getElementsByClassName('crud-header')[0];
    const theadTable = this.el.nativeElement.getElementsByClassName('p-datatable-thead')[0];
    const windowScroll = e.target.scrollingElement.scrollTop;
    if (headerTable) {
      if (windowScroll > offSetTable) {
        theadTable.style.cssText = `
        position: sticky;
        z-index: 1011;
        top: 55px;
        `
        headerTable.style.cssText = `
        position: sticky;
        z-index: 1011;
        margin-bottom: 0px;
        padding: 5px 0 !important;
        top: 0;
        `
        return;
      }
      theadTable.style.cssText = '';
      headerTable.style.cssText = `
      padding: 5px 0 !important;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
      margin-bottom: 0.5em; 
      `
    }
  }
  ngOnInit(): void {
  }
  showDialog(bool: boolean) {
    document.querySelector('body')!.style.overflowY = 'hidden';
    this.dpButtons.map((dpButtonComponent: DpButtonComponent, index: number) => {
      dpButtonComponent.display = false;
    })
    this.modalShow.emit(bool);
  }
  toggleDp(dpId: number) {
    this.dpButtons.map((dpButtonComponent: DpButtonComponent, index: number) => {
      if (dpId === dpButtonComponent.dpId) {
        dpButtonComponent.display = dpButtonComponent.display === false ? true : false;
      } else {
        dpButtonComponent.display = false;
      }
    })
  }
  dpEditEvent(id: number, dpIndex: number) {
    document.querySelector('body')!.style.overflowY = 'hidden';
    this.dpEdit.emit({ id, dpIndex });
    this.dpButtons.map((dpButtonComponent: DpButtonComponent) => {
      if (dpButtonComponent.dpId === id) {
        dpButtonComponent.display = false;
      }
    })
  }
  dpRemoveEvent(id: number) {
    this.dpRemove.emit({ id });
  }
  checkRoles(_roles: string) {
    if (_roles) {
      const roles = _roles.split(',');
      const filter = roles.filter(data => data === Roles.RESTAURANTADMIN || Roles.BRANCHMANAGER);
      if (filter.length > 0) {
        this.roles = filter;
      }
    }


  }
  permissionFailedAlert() {
    this.permissonService.showModal();
  }

  resizeFullPic(data: any) {
    this.eventFullPic.emit(data);
  }
}
