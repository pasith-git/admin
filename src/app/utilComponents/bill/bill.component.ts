import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Order, OrderDetail } from 'src/app/models/order.model';
import { Branch } from 'src/app/models/restaurants.model';
import { AuthService } from 'src/app/services/auth.service';
import { BranchesService } from 'src/app/services/branches.service';
import * as moment from 'moment';
import { OrdersService } from 'src/app/services/orders.service';
import { UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { Observable } from 'rxjs';
import { SpBillOp } from 'src/app/management/bills/checkout/checkout.reducers';
import { ResourcesService } from 'src/app/services/resources.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bill-for-print',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})

export class BillComponent implements OnInit, OnChanges {
  @Input() data: Order[];
  @Input() sepData: Observable<SpBillOp>;
  @Input() billHeader: string;
  @Output() getId = new EventEmitter();
  @Input() showBillmoney: boolean;
  @Input() showBillpayment: boolean;
  @Input() billStatus: string = 'billPayment';
  public branches: Branch;
  public splitAddress: any[];
  public firstname: any;
  @Input() todayDate: any;
  @Input() todayTime: any;
  public loading: boolean;
  public image: string;
  @Input() moneyR: number = 0;
  @Input() moneyC: number = 0;
  @Input() billId: string;

  @Input() billTotal: number;
  /* coupon properties */
  @Input() couponMoney: number;
  @Input() couponPercent: number;

  @Input() sepTotalPay: number;
  /* sep bill printing */
  @Input() sepBillData: OrderDetail[];
  status: boolean = false;
  usbPrintDriver: UsbDriver;
  webPrintDriver: WebPrintDriver;
  ip: string = '';
  constructor(private branchService: BranchesService,
    private authService: AuthService,
    private orderService: OrdersService,
    public rs: ResourcesService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.image = this.orderService.getImage();
    this.todayDate = moment().format('l');
    this.todayTime = moment().format('LTS');
    this.firstname = this.authService.getFirstname();
    this.branchService.getData().subscribe((data: Branch[]) => {
      data.map((data: Branch) => {
        this.loading = true;
        if (data.id.toString() === this.route.snapshot.params['id']) {
          this.branches = data;
        }
        this.splitAddress = data.address.split(',');
      })
    })
  }

  ngOnChanges({ todayDate, todayTime }: SimpleChanges): void {

    this.todayDate = moment().format('l');
    this.todayTime = moment().format('LTS');
  }
}
