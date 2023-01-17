import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChange, SimpleChanges, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, merge, Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BillsComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  public paramId: string;
  public dataSub: Subject<Order[]> = new Subject();
  public data: Order[] = [];
  public defaultData: Order[] = [];
  public loading: boolean = false;
  public tableSearch: string;
  public subScription: Subscription;
  constructor(private orderService: OrdersService, private route: ActivatedRoute, private router: Router,
    private ngxSpinService: NgxSpinnerService,
  ) {

  }
  ngOnInit(): void {
    this.ngxSpinService.show();
    this.paramId = this.route.snapshot.params['id'];
    this.dataSub.subscribe({
      next: (data: Order[]) => {
        this.data = data;
        this.defaultData = data;
      },
      complete: () => {
        this.ngxSpinService.hide();
      }
    })

    this.subScription = this.orderService.getOrderDataStatus('pending', this.paramId).subscribe({
      next: (data) => {
        this.dataSub.next(data);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.ngxSpinService.hide();
          this.loading = true;
        } else {
          this.ngxSpinService.hide();
        }
      },
      complete: () => {
        this.loading = true;
        this.ngxSpinService.hide();
      },
    })
  }

  tableSearchEvent(tableSearch: string) {
    const tableSearchEle = document.getElementById('tableSearch');
    if (tableSearchEle) {
      tableSearchEle.onkeyup = (e) => {
        const filterData = this.defaultData.filter((value: Order) => {
          return value.tableName.includes(tableSearch);
        });
        this.data = filterData;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterContentInit(): void {

  }
  ngOnDestroy(): void {
    this.subScription.unsubscribe();
  }
}
