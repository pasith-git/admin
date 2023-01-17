import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, Renderer2, SimpleChanges, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxPermissionsService } from 'ngx-permissions';
import { MenuItem } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { ResourcesService } from 'src/app/services/resources.service';
import { laWords } from 'src/app/utilConstant/index.util';

@Component({
  selector: 'menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent implements AfterViewInit, OnInit {

  @Input() data: any[] = [];
  @Input() menuItems: MenuItem[];
  @Input() rbid: any;
  @Input() rbname: any;
  public calMenuList: any;
  public floorList: any;
  public calSize: any;
  public fullMenuSize: any;
  public currentSize = 0;
  public modalDisplay: boolean = false;
  public menuListId: any;
  @Output() modalEvent = new EventEmitter();
  constructor(private route: ActivatedRoute, private router: Router, public rs: ResourcesService, public np: NgxPermissionsService) {
  }
  ngOnInit(): void {
    this.calMenuList = this.data.length / 8
    this.floorList = Math.floor(this.data.length / 8);
    this.calSize = this.data.length % 8 == 0 ? this.floorList : this.floorList + 1;
    /*  */
    this.fullMenuSize = this.calSize;
  }

  @ViewChild('id') id: TemplateRef<any>;
  @ViewChild('btnprev') btnprev!: ElementRef;
  @ViewChild('btnnext') btnnext!: ElementRef;
  @ViewChild('menulist') menulist!: ElementRef;

  @ContentChild('menu-list') menuList: TemplateRef<any>;
  slide(n: number) {
    this.currentSize += n
    const result = this.currentSize * 80;
    this.setStyle(this.menulist, 'transform', `translateX(-${result}vw)`);
    this.setStyle(this.menulist, 'transition', `0.2s`);
    const csCheck = this.currentSize;
    if (csCheck == 0) {
      this.setStyle(this.btnprev, 'display', 'none');
      this.setStyle(this.btnnext, 'display', 'block');
    }
    if (csCheck > 0 && csCheck < this.fullMenuSize) {
      this.setStyle(this.btnprev, 'display', 'block');
      this.setStyle(this.btnnext, 'display', 'block');
    }
    if (csCheck > 0 && csCheck == this.fullMenuSize - 1) {
      this.setStyle(this.btnprev, 'display', 'block');
      this.setStyle(this.btnnext, 'display', 'none');
    }
  }

  ngAfterViewInit(): void {
    if (this.fullMenuSize == 1 || this.fullMenuSize == 0) {
      this.setStyle(this.btnprev, 'display', `none`);
      this.setStyle(this.btnnext, 'display', `none`);
    } else {
      this.setStyle(this.btnprev, 'display', `none`);
      this.setStyle(this.btnnext, 'display', `block`);
    }

  }
  setStyle(el: ElementRef, styleName: string, value: string) {
    el.nativeElement.style[styleName] = value
  }
  navReport(bid: number) {
    this.router.navigate(['/ordersreport'], { state: { bid: bid } });
  }
  @ViewChildren('dialog') dialog: QueryList<Dialog>;
  modalShow(id: any) {
    this.modalEvent.emit(id);
  }
}
