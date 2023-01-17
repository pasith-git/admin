import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, firstValueFrom, interval, map, Observable, zip } from 'rxjs';
import { OrderDetail } from '../models/order.model';
import { BranchesService } from '../services/branches.service';
import { CalService } from '../services/cal.service';
import { CheckoutService } from '../services/checkout.service';
import { OrdersService } from '../services/orders.service';
import { ResourcesService } from '../services/resources.service';
import { PmodalData } from '../utilComponents/pmodal/pmodal.component';

@Component({
  selector: 'app-generate-bill',
  templateUrl: './generate-bill.component.html',
  styleUrls: ['./generate-bill.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateBillComponent implements OnInit, OnChanges {
  public resourceSubject = this.calService.calSubject;
  public resourceData$ = this.calService.calData$;
  public checkoutData = this.checkoutService.data;
  public billDetailData = {};
  @Input() pmodalData: PmodalData = {};
  @Input() sepBillData: OrderDetail[];
  public image: string = '';
  public cal$ = this.checkoutService.data$;
  constructor(
    private resourceService: ResourcesService,
    private cbr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private orderService: OrdersService,
    public checkoutService: CheckoutService,
    private branchService: BranchesService,
    private calService: CalService
  ) {
    this.resourceService.getData().subscribe(rsData => {
      const tableId = this.route.firstChild?.snapshot.params['tid'];
      const bchId = this.route.snapshot.params['id'];
      zip(this.branchService.getData(), this.orderService.getOrderById(bchId, tableId, 'pending'))
        .subscribe({
          next: (data) => {
            const branch = data[0].filter(value => value.id.toString() === bchId).map(brch => {
              const genAddress = brch.address.split(',')
              return {
                ...brch,
                address: genAddress,
              }
            })
            this.resourceSubject.next({
              order: data[1],
              resources: rsData,
              branch: branch[0],

            });
          }
        })
      this.cbr.markForCheck();
    })
  }

  ngOnInit(): void {
    console.log(this.resourceData$);
    this.image = this.orderService.getImage();
    interval(0).subscribe({
      next: () => {
        let todayDate = moment().format('l');
        let todayTime = moment().format('LTS');
        this.resourceSubject.next({
          ...this.resourceSubject.getValue(),
          time: {
            todayDate,
            todayTime,
          },
          billType: this.checkoutService.data.billType,
        })
        this.cbr.markForCheck();
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resourceSubject.next({
      ...this.resourceSubject.getValue(),
      addition: {
        bill: {
          header: changes['billDetail']?.currentValue?.header,
        }
      }
    });
  }


}
