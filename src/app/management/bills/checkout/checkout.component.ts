import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPrintDirective } from 'ngx-print';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, firstValueFrom, flatMap, from, mergeMap, Observable, Subject, Subscription } from 'rxjs';
import { Order, billCheckOrderCol, OrderDetailCol, OrderDetail } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { PmodalComponent, PmodalData } from 'src/app/utilComponents/pmodal/pmodal.component';
import * as moment from 'moment';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { Checkbox } from 'primeng/checkbox';
import { PsepmodalComponent } from 'src/app/utilComponents/psepmodal/psepmodal.component';
import { PaymentDto } from 'src/app/dto/payment.dto';
import { Coupon, couponSelector, getSpBill, SpBillOp } from './checkout.reducers';
import { Store } from '@ngrx/store';
import { couponAction, spCheckout } from './checkout.actions';
import { OrderDetailDto, OrderDto, OrderStatus, PaymentType } from 'src/app/dto/order.dto';
import { Status } from 'src/app/utilConstant/index.util';
import { CouponService } from 'src/app/services/coupon.service';
import { CouponService as CouponNgrx } from 'src/app/services/ngrx/coupon.service';
import { CalculatorComponent } from 'src/app/utilComponents/calculator/calculator.component';
import { TestService } from 'src/app/services/test.service';
import { ResourcesService } from 'src/app/services/resources.service';
import { CheckoutModel, CheckoutService } from 'src/app/services/checkout.service';
import { GenerateBillComponent } from 'src/app/generate-bill/generate-bill.component';
import { CalService } from 'src/app/services/cal.service';
import { OnlinePaymentService } from 'src/app/services/online-payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public hidden = true;
  public cols: OrderDetailCol[] = billCheckOrderCol;
  public data: Order[];
  public dataSub: Subject<Order> = new Subject();
  public dataVAT: number;
  public billMenu: any[] = [
    { name: 'ລວມເງິນ', label: 'subtotal', value: 0 },
    { name: 'ສ່ວນຫຼຸດ', label: 'discount', value: 0 },
    { name: `ມູນຄ່າອາກອນ`, label: 'tax', value: 0 },
    { name: 'ລວມເງິນທັງໝົດ', label: 'total', value: 0 },
  ]

  /* coupon */
  public couponPercent: number | undefined = 0;
  public couponInput: null | string;
  public couponType: string;
  public couponPercentDisplay: number | undefined = 0;
  public couponMoney: number | undefined = 0;
  public couponMoneyDisplay: number | undefined = 0;

  public paymentType: string;
  public moneyReceive: number = 0;
  public moneyChange: number = 0;
  /* bank */
  public rnBank: any = 'ວ່າງ';
  public bankName: any = 'ວ່າງ';
  public bankId: number;
  public currencyM: any[] = [
    { name: "ບາດ", rate: 0, value: 0, code: "THB" },
    { name: "ດອນລ່າ", rate: 0, value: 0, code: "USD" },
  ]

  public total: number = 0;
  public discount: number = 0;
  public vat: number = 0;
  public totalVat: number = 0;
  public tariff: number;
  public paidMoney: number = 0;
  public needPay: number = 0;
  public calData$ = this.calService.calData$;
  public ip: string;
  constructor(private orderService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    private pMessage: PMsgServiceService,
    private ngxSpinService: NgxSpinnerService,
    private confirmDialog: ConfirmationService,
    private couponService: CouponService,
    private store: Store<any>,
    private couponNgrx: CouponNgrx,
    private cd: ChangeDetectorRef,
    private testService: TestService,
    private resourcesService: ResourcesService,
    private checkoutService: CheckoutService,
    private calService: CalService,
  ) {
    this.spBill$ = this.store.select(getSpBill);
  }

  public tableId: number;
  public bchId: string;
  public todayDate: any;
  public todayTime: any;

  public sepTotal: number;
  public sepVat: number;
  public sepTotalPay: number;

  public selectedData: any[] = [];

  public billTotal: number;
  /* ngrx Space */

  public spBill$: Observable<SpBillOp>;
  public sp: any;

  /* for sbd data in bill component */
  public sepBillData: OrderDetail[];
  @ViewChildren('cbod') orderDetailQuery: QueryList<any>;
  @ViewChild('dt') dt: any;
  @ViewChild(PmodalComponent) pmodal: PmodalComponent;
  @ViewChild(PsepmodalComponent) psepmodal: PmodalComponent;
  @ViewChild(NgxPrintDirective) printer: NgxPrintDirective;
  /* for cal function */
  public calDisplay: boolean = false;
  public calDisplaySep: boolean = false;
  public test = new Subject<any>();
  public checkoutData = new BehaviorSubject(this.checkoutService.defaultValue);
  public checkoutData$: Observable<CheckoutModel> = this.checkoutData.asObservable();
  @ViewChild(PmodalComponent) pmodalChild: PmodalComponent;
  @ViewChild(PsepmodalComponent) pSepModalChild: PsepmodalComponent;
  @ViewChild('calChild1') calChild1: CalculatorComponent;
  @ViewChild('calChild2') calChild2: CalculatorComponent;


  private subScription: Subscription;

  public pmodalData: PmodalData = {};

  ngOnInit(): void {
    this.sp = this.store.select(getSpBill);
    this.ngxSpinService.show();
    this.tableId = this.route.firstChild?.snapshot.params['tid'];
    this.bchId = this.route.snapshot.params['id'];
    this.dataSub.subscribe({
      next: (data) => {
        let result = [data].map((value: Order) => {
          const orderdetails = value.orderdetails.map((ordValue: OrderDetail) => {
            return {
              ...ordValue,
              read: false,
            }
          })
          return {
            ...value,
            orderdetails,
          }
        });
        this.data = result;
      },
      error: (err) => {
      }
    });

    this.subScription = this.orderService.getOrderById(this.bchId, this.tableId, 'pending').subscribe({
      next: (data: Order) => {
        this.dataSub.next(data);
        this.dataVAT = data.tariff;
        this.currencyM[0].rate = data.excTHB;
        this.currencyM[1].rate = data.excUSD;
        this.currencyM[0].value = data.moneyBalance / this.currencyM[0].rate;
        this.currencyM[1].value = data.moneyBalance / this.currencyM[1].rate;
        this.total = data.total;
        this.vat = data.moneyVat;
        this.tariff = data.tariff;
        this.totalVat = data.totalVat;
        this.paidMoney = data.moneyUpfrontPay;
        this.needPay = data.moneyBalance;
      },
      error: (data) => {
        this.router.navigate(['checkout', this.bchId]);
      },
      complete: () => {
        this.hidden = false;
        this.ngxSpinService.hide();
      }
    })
  }

  ngOnDestroy(): void {
    this.subScription.unsubscribe();
  }

  ngAfterContentInit(): void {
  }

  payment() {
    this.pmodal.visible = true;
    this.pmodalData = {
      header: "ເລຶອກຊ່ອງທາງການຊຳລະ (ຈ່າຍລວມ)",
      type: "normal",
    };
    this.checkoutService.dataSubject.next({
      ...this.checkoutService.data,
      billType: "normal"
    })
  }

  /* get coupon state */
  paymentConfirm({ moneyInput, moneyChange, rnBankInput, bankNameInput, couponMoney }: any) {
    const needPay = this.couponNgrx.couponState.couponMoney ? this.needPay - couponMoney : this.needPay;
    if (this.paymentType === 'cash') {
      if (moneyInput >= needPay) {
        this.billTotal = needPay;
        this.couponPercentDisplay = couponMoney ? this.couponPercent : 0;
        this.couponMoneyDisplay = couponMoney ? this.couponMoney : 0;
        this.pmodal.visible = false;
        this.moneyReceive = moneyInput;
        this.moneyChange = moneyChange;
        this.orderService.setLocalMoneyReceive(this.moneyReceive.toString());
        this.orderService.setLocalMoneyChange(this.moneyChange.toString());
        this.pMessage.putMoneySuccess();
      } else {
        this.pMessage.moneyIsNotEnough();
      }
    } else {
      if (moneyInput >= needPay && rnBankInput) {
        this.pmodal.visible = false;
        /* bank info */
        this.billTotal = needPay;
        this.couponPercentDisplay = this.couponPercent;
        this.couponMoneyDisplay = this.couponMoney;
        this.rnBank = rnBankInput;
        this.bankName = bankNameInput.name;
        this.bankId = bankNameInput.id;
        this.moneyReceive = moneyInput;
        this.moneyChange = moneyChange;
        this.orderService.setLocalMoneyReceive(this.moneyReceive.toString());
        this.orderService.setLocalMoneyChange(this.moneyChange.toString());
        this.pMessage.putMoneySuccess();
      } else if (moneyInput < this.needPay && !rnBankInput) {
        this.pMessage.emptyBillpayment();
      } else if (rnBankInput === null) {
        this.pMessage.rnBankFailed();
      } else {
        this.pMessage.moneyIsNotEnough();
      }
    }

  }
  payBillgetMoney() {

  }

  payBillPayment() {
  }

  payBillPaymentT() {
    this.todayDate = moment().format('l');
    this.todayTime = moment().format('LTS');
  }
  payBillPaymentF() {
    this.pMessage.billPaymentWarn();
  }
  orderPayment() {
    const calData = this.checkoutService.data;
    if (calData.payment!.type) {
      if (calData.payment!.type === 'cash') {
        if (calData.moneyReceive) {
          this.confirmDialog.confirm({
            message: 'ຢືນຢັນການຊຳລະ',
            accept: () => {
              this.ngxSpinService.show();
              let putData;
              this.data.map((data: Order) => {
                const mdData: PaymentDto = {
                  orderId: data.id,
                  restaurantId: data.restaurantId,
                  branchId: data.branchId,
                  tableId: data.tableId,
                  total: data.total,
                  amount: data.amount,
                  moneyCoupon: calData.moneyCoupon || 0,
                  moneyDiscount: calData.couponPercent || 0,
                  moneyUpfrontPay: 0,
                  moneyReceived: calData.moneyReceive!,
                  moneyChange: calData.moneyChange!,
                  tariff: data.tariff,
                  moneyVat: data.moneyVat,
                  totalVat: data.totalVat,
                  isStatus: Status.success,
                  paymentType: calData.payment!.type!,
                  couponCode: calData.couponCode || undefined,
                }
                putData = mdData;
                ;
              })
              this.orderService.orderPayment(putData).subscribe({
                next: () => {
                  this.pMessage.paymentSuccess();
                  this.router.navigate(['checkout', this.bchId]);
                },
                complete: () => {
                  this.ngxSpinService.hide();
                }
              })
            }
          });
        } else {
          this.pMessage.billPaymentWarn();
        }

      } else {
        /* bank */
        if (calData.moneyReceive) {
          this.confirmDialog.confirm({
            message: 'ຢືນຢັນການຊຳລະ',
            accept: () => {
              this.ngxSpinService.show();
              let putData;
              this.data.map((data: Order) => {
                const mdData = {
                  orderId: data.id,
                  restaurantId: data.restaurantId,
                  branchId: data.branchId,
                  tableId: data.tableId,
                  bankId: this.bankId,
                  total: data.total,
                  amount: data.amount,
                  moneyCoupon: calData.moneyCoupon || 0,
                  moneyDiscount: calData.couponPercent || 0,
                  moneyUpfrontPay: 0,
                  moneyReceived: calData.moneyReceive,
                  moneyChange: calData.moneyChange,
                  tariff: data.tariff,
                  moneyVat: data.moneyVat,
                  totalVat: data.totalVat,
                  isStatus: Status.success,
                  paymentType: calData.payment!.type,
                  referenceNumber: this.rnBank,

                }
                putData = mdData;
              })
              this.orderService.orderPayment(putData).subscribe({
                next: () => {
                  this.pMessage.paymentSuccess();
                  this.router.navigate(['checkout', this.bchId]);
                },
                complete: () => {
                  this.ngxSpinService.hide();
                }
              })
            }
          });
        } else {
          this.pMessage.billPaymentWarn();
        }
      }
    } else {
      this.pMessage.billPaymentWarn();
    }

  }

  /* sep modal function */
  sepPayment() {
    this.sepBillData = [];
    this.selectedData = [];
    let totalSep = 0;
    const calData = this.checkoutService.data;
    this.checkoutService.dataSubject.next({
      ...calData,
      billType: "sep",
    })
    this.orderDetailQuery.map((data: Checkbox) => {
      if (data.model) {
        this.selectedData.push(...data.model);
      }
    });
    if (this.selectedData.length > 0) {
      if (calData.payment?.vat === "customer") {
        this.selectedData.map(value => {
          const priceAmount = value.price * value.amount;
          totalSep += priceAmount + (priceAmount * (calData.tariff! / 100))
        })
      } else {
        this.selectedData.map(value => {
          const priceAmount = value.price * value.amount;
          totalSep += priceAmount;
        })
      }
      this.pmodalData = {
        header: "ເລຶອກຊ່ອງທາງການຊຳລະ (ແຍກຈ່າຍຕາມລາຍການ)",
        type: "sep",
        statusSep: "sepOrder",
        total: totalSep,
      };

      this.orderDetailQuery.map((data: Checkbox, index) => {
        if (data.model.length) {
          this.selectedData[index] = data.model[0];
        } else {
          this.selectedData[index] = false;
        }
      });
      /* filter two arrays */
      let resultSep = 0;
      this.selectedData.map(data => {
        if (data) {
          resultSep += data.price + (data.price * this.tariff / 100);
        }
      });
      let result: OrderDetail[] = [];
      this.data[0].orderdetails.map((data, index) => {
        let match = false;
        this.selectedData.map(od => {
          if (data.id === od.id) {
            result.push({ ...data, cb: true });
            match = true;
            return;
          }
        });
        if (!match) {
          result.push(data);
        }
      });
      this.sepBillData = result;
    } else {
      this.pmodalData = {
        header: "ເລຶອກຊ່ອງທາງການຊຳລະ (ແຍກຈ່າຍຕາມລາຄາ)",
        type: "sep",
        statusSep: "sepNormal",
        total: 0,
      }
    }
    this.pmodal.visible = true;
    /* this.selectedData = [];
    this.orderDetailQuery.map((data: Checkbox) => {
      if (data.model) {
        this.selectedData.push(...data.model);
      }
    });
    this.sepTotal = 0;
    this.sepVat = 0;
    this.sepTotalPay = 0;
    this.selectedData.map((data: OrderDetail) => {
      this.sepTotal += data.total;
      this.sepVat += data.total * (this.tariff / 100);
      this.sepTotalPay += data.total + data.total * (this.tariff / 100);
    });
    this.sepVat = Math.floor(this.sepVat);
    if (this.sepTotalPay <= this.needPay) {
      this.psepmodal.visible = true;
    } else {
      this.pMessage.defaultError();
    } */

  }

  /* sep payment from payResult */
  sepPaymentConfirm({ freeMoneyChangeInput, status, rnBankInput, order, moneyChange, op }: any) {
    if (status === 'cash') {
      if (this.sepTotalPay) {
        /* sep cash */
        if (op.moneyInput >= op.sepTotalPay) {
          this.selectedData = [];
          this.orderDetailQuery.map((data: Checkbox, index) => {
            if (data.model.length) {
              this.selectedData[index] = data.model[0];
              return;
            }
            this.selectedData[index] = false;
          });
          let localDtoUpdateOd: any[] = [];
          this.selectedData.map((data, index) => {
            if (this.selectedData[index]) {
              localDtoUpdateOd.push(data);
              return;
            }
          })
          const dtoUpdateOd: OrderDetailDto[] = localDtoUpdateOd.map((
            { id, orderId, restaurantId, branchId, bankId, tableId, menuId, price, amount, total }) => {
            return {
              orderDetailId: id,
              orderId,
              restaurantId,
              branchId,
              tableId,
              menuId,
              bankId,
              price,
              amount,
              total,
              isStatus: 'paid',
              paymentType: 'cash',
              comment: "that's my favvority food",
              reason: "Best food or healthy",
              referenceNumber: null,
            }
          });
          /* order data dto */
          const { id, branchId, restaurantId, tableId, moneyCoupon, moneyDiscount } = order;
          const resultDto: OrderDto = {
            orderId: id,
            bankId: null,
            restaurantId,
            branchId,
            tableId,
            moneyCoupon: this.couponMoney ? this.couponMoney : 0,
            moneyDiscount: this.couponPercent ? this.couponPercent : 0,
            moneyUpfrontPay: this.sepTotalPay,
            moneyReceived: op.moneyInput,
            moneyChange,
            isStatus: OrderStatus.pending,
            paymentType: PaymentType.cash,
            referenceNumber: null,
            orderdetails: dtoUpdateOd,
          }
          this.orderService.orderPayment(resultDto).subscribe({
            next: () => {
              this.ngxSpinService.show();
              this.orderService.getOrderById(this.bchId, this.tableId, 'pending').subscribe({
                next: (data: Order) => {
                  this.dataSub.next(data);
                  this.dataVAT = data.tariff;
                  this.currencyM[0].rate = data.excTHB;
                  this.currencyM[1].rate = data.excUSD;
                  this.currencyM[0].value = data.moneyBalance / this.currencyM[0].rate;
                  this.currencyM[1].value = data.moneyBalance / this.currencyM[1].rate;
                  this.total = data.total;
                  this.vat = data.moneyVat;
                  this.tariff = data.tariff;
                  this.totalVat = data.totalVat;
                  this.paidMoney = data.moneyUpfrontPay;
                  this.needPay = data.moneyBalance;
                },
                error: () => {
                  this.router.navigate(['checkout', this.bchId]);
                }
              })
            },
            complete: () => {
              this.ngxSpinService.hide();
              this.psepmodal.visible = false;
              this.pMessage.success();
            }
          });
        } else {
          this.pMessage.defaultError();
        }

      } else {
        const result = this.data.map((value: Order) => {
          const orderUpdate: OrderDto = {
            orderId: value.id,
            restaurantId: value.restaurantId,
            branchId: value.branchId,
            tableId: value.tableId,
            total: value.total,
            amount: value.amount,
            moneyCoupon: this.couponMoney || 0,
            moneyDiscount: this.couponPercent || 0,
            moneyUpfrontPay: op.sepTotalPay + this.couponMoney,
            moneyReceived: op.moneyInput,
            moneyChange,
            tariff: value.tariff,
            moneyVat: value.moneyVat,
            totalVat: value.totalVat,
            isStatus: OrderStatus.pending,
            paymentType: PaymentType.cash,
            referenceNumber: null,
            orderdetails: null,
          }
          return orderUpdate;
        });
        this.orderService.orderPayment(result[0]).subscribe({
          next: () => {
            this.ngxSpinService.show();
            this.orderService.getOrderById(this.bchId, this.tableId, 'pending').subscribe({
              next: (data: Order) => {
                this.dataSub.next(data);
                this.dataVAT = data.tariff;
                this.currencyM[0].rate = data.excTHB;
                this.currencyM[1].rate = data.excUSD;
                this.currencyM[0].value = data.moneyBalance / this.currencyM[0].rate;
                this.currencyM[1].value = data.moneyBalance / this.currencyM[1].rate;
                this.total = data.total;
                this.vat = data.moneyVat;
                this.tariff = data.tariff;
                this.totalVat = data.totalVat;
                this.paidMoney = data.moneyUpfrontPay;
                this.needPay = data.moneyBalance;
              },
              error: () => {
                this.pMessage.success();
                this.router.navigate(['checkout', this.bchId]);
              }
            })
          },
          error: () => {
          },
          complete: () => {
            this.ngxSpinService.hide();
            this.psepmodal.visible = false;
            this.pMessage.success();
          }
        });
      }
    } else {
      if (this.sepTotalPay) {
        if (op.moneyInput >= op.sepTotalPay && op.rnBank) {
          this.selectedData = [];
          this.orderDetailQuery.map((data: Checkbox, index) => {
            if (data.model.length) {
              this.selectedData[index] = data.model[0];
              return;
            }
            this.selectedData[index] = false;
          });
          let localDtoUpdateOd: any[] = [];
          this.selectedData.map((data, index) => {
            if (this.selectedData[index]) {
              localDtoUpdateOd.push(data);
              return;
            }
          })
          const dtoUpdateOd: OrderDetailDto[] = localDtoUpdateOd.map((
            { id, orderId, restaurantId, branchId, bankId, tableId, menuId, price, amount, total }) => {
            return {
              orderDetailId: id,
              orderId,
              restaurantId,
              branchId,
              tableId,
              menuId,
              bankId,
              price,
              amount,
              total,
              isStatus: 'pending',
              paymentType: 'bank',
              comment: "that's my favvority food",
              reason: "Best food or healthy",
              referenceNumber: op.rnBank,
            }
          });
          /* order data dto */
          const { id, branchId, restaurantId, tableId, moneyCoupon, moneyDiscount } = order;
          const resultDto: OrderDto = {
            orderId: id,
            bankId: null,
            restaurantId,
            branchId,
            tableId,
            moneyCoupon: this.couponMoney ? this.couponMoney : 0,
            moneyDiscount: this.couponPercent ? this.couponPercent : 0,
            moneyUpfrontPay: this.sepTotalPay,
            moneyReceived: op.moneyInput,
            moneyChange,
            isStatus: OrderStatus.pending,
            paymentType: PaymentType.bank,
            referenceNumber: null,
            orderdetails: dtoUpdateOd,
          }
          this.orderService.orderPayment(resultDto).subscribe({
            next: () => {
              this.ngxSpinService.show();
              this.orderService.getOrderById(this.bchId, this.tableId, 'pending').subscribe({
                next: (data: Order) => {
                  if (data) {
                    this.dataSub.next(data);
                    this.dataVAT = data.tariff;
                    this.currencyM[0].rate = data.excTHB;
                    this.currencyM[1].rate = data.excUSD;
                    this.currencyM[0].value = data.moneyBalance / this.currencyM[0].rate;
                    this.currencyM[1].value = data.moneyBalance / this.currencyM[1].rate;
                    this.total = data.total;
                    this.vat = data.moneyVat;
                    this.tariff = data.tariff;
                    this.totalVat = data.totalVat;
                    this.paidMoney = data.moneyUpfrontPay;
                    this.needPay = data.moneyBalance;
                  } else {
                    this.router.navigate(['checkout', this.bchId]);
                  }
                },
                error: () => {
                  this.router.navigate(['checkout', this.bchId]);
                }
              })
            },
            complete: () => {
              this.ngxSpinService.hide();
              this.psepmodal.visible = false;
              this.pMessage.success();
            }
          });
        } else {
          this.pMessage.defaultError();
        }
      } else {
        const result = this.data.map((value: Order) => {
          const orderUpdate: OrderDto = {
            orderId: value.id,
            restaurantId: value.restaurantId,
            branchId: value.branchId,
            bankId: op.bankName.code,
            tableId: value.tableId,
            total: value.total,
            amount: value.amount,
            moneyCoupon: this.couponMoney || 0,
            moneyDiscount: this.couponPercent || 0,
            moneyUpfrontPay: op.sepTotalPay + this.couponMoney,
            moneyReceived: op.moneyInput,
            moneyChange,
            tariff: value.tariff,
            moneyVat: value.moneyVat,
            totalVat: value.totalVat,
            isStatus: OrderStatus.pending,
            paymentType: PaymentType.bank,
            referenceNumber: rnBankInput,
            orderdetails: op.rnBank,
          }
          return orderUpdate;
        });
        this.orderService.orderPayment(result[0]).subscribe({
          next: () => {
            this.ngxSpinService.show();
            this.orderService.getOrderById(this.bchId, this.tableId, 'pending').subscribe({
              next: (data: Order) => {
                this.dataSub.next(data);
                this.dataVAT = data.tariff;
                this.currencyM[0].rate = data.excTHB;
                this.currencyM[1].rate = data.excUSD;
                this.currencyM[0].value = data.moneyBalance / this.currencyM[0].rate;
                this.currencyM[1].value = data.moneyBalance / this.currencyM[1].rate;
                this.total = data.total;
                this.vat = data.moneyVat;
                this.tariff = data.tariff;
                this.totalVat = data.totalVat;
                this.paidMoney = data.moneyUpfrontPay;
                this.needPay = data.moneyBalance;

              },
              error: () => {
                this.pMessage.success();
                this.router.navigate(['checkout', this.bchId]);
              }
            })
          },
          error: () => {
          },
          complete: () => {
            this.ngxSpinService.hide();
            this.psepmodal.visible = false;
            this.pMessage.success();
          }
        });
      }
    }
  }

  /* put data to sep bill */
  genBillData(moneyInput: number, freeMoneyChange: number, change?: number, sepMoneyTotal?: number) {
    this.data.map((value: Order) => {
      this.store.dispatch(spCheckout({
        billName: value.billNumber,
        tableName: value.tableName,
        total: value.moneyBalance,
        tariff: value.tariff,
        orderCount: value.orderdetails.length,
        totalVat: value.totalVat,
        vat: value.moneyVat,
        change: change,
        received: moneyInput,
        sepMoney: freeMoneyChange,
        needPay: sepMoneyTotal ? sepMoneyTotal : value.totalVat - this.paidMoney,
        paidMoney: value.moneyUpfrontPay,
        bath: sepMoneyTotal && sepMoneyTotal / value.excTHB,
        usd: sepMoneyTotal && sepMoneyTotal / value.excUSD,
        excBath: value.excTHB,
        excUSD: value.excUSD,
        sepMoneyChange: freeMoneyChange,
      }));
    });
  }
  /* print bill */

  printBill(id: string) {
    this.printer.useExistingCss = true;
    this.printer.printSectionId = 'bill-getMoney-print';
    this.printer.print();
  }

  sepPrintBill({ freeMoneyChangeInput, moneyChange, moneyInput, op }: any) {
    if (this.paymentType === 'cash') {
      if (freeMoneyChangeInput && moneyInput) {
        if (freeMoneyChangeInput <= moneyInput) {
          setTimeout(() => {
            this.genBillData(moneyInput, freeMoneyChangeInput, moneyChange, op.moneySepSelfPay);
          }, 0);
          setTimeout(() => {
            this.printBill("sep-bill-payment-print");
          }, 0);
        } else {
          this.pMessage.billPaymentWarn();
        }
        /* ປິ້ນບິນຕາມລາຍການ */
      } else if (moneyInput) {
        this.selectedData = [];
        this.orderDetailQuery.map((data: Checkbox, index) => {
          if (data.model.length) {
            this.selectedData[index] = data.model[0];
          } else {
            this.selectedData[index] = false;
          }
        });
        /* filter two arrays */
        let resultSep = 0;
        this.selectedData.map(data => {
          if (data) {
            resultSep += data.price + (data.price * this.tariff / 100);
          }
        });
        let result: OrderDetail[] = [];
        this.data[0].orderdetails.map((data, index) => {
          let match = false;
          this.selectedData.map(od => {
            if (data.id === od.id) {
              result.push({ ...data, cb: true });
              match = true;
              return;
            }
          });
          if (!match) {
            result.push(data);
          }
        });
        /* const resultSepCoupon = this.couponMoney ? resultSep - this.couponMoney : resultSep; */
        if (moneyInput >= op.sepTotalPay) {
          setTimeout(() => {
            this.genBillData(moneyInput, moneyChange, undefined, op.sepTotalPay);
            this.sepBillData = result;
          }, 0);
          setTimeout(() => {
            this.printBill("sep-bill-menu-payment-print");
          }, 0);
        } else {
          this.pMessage.defaultError();
        }

      } else {
        this.pMessage.emptyBillpayment();
      }
    } else {
      if (freeMoneyChangeInput && moneyInput) {
        if (freeMoneyChangeInput <= moneyInput) {
          setTimeout(() => {
            this.genBillData(moneyInput, freeMoneyChangeInput, moneyChange, op.moneySepSelfPay);
          }, 0);
          setTimeout(() => {
            this.printBill("sep-bill-payment-print");
          }, 0);
        } else {
          this.pMessage.billPaymentWarn();
        }

      } else if (moneyInput) {
        this.selectedData = [];
        this.orderDetailQuery.map((data: Checkbox, index) => {
          if (data.model.length) {
            this.selectedData[index] = data.model[0];
          } else {
            this.selectedData[index] = false;
          }
        });
        /* filter two arrays */
        let resultSep = 0;
        this.selectedData.map(data => {
          if (data) {
            resultSep += data.price + (data.price * this.tariff / 100);
          }
        })
        let result: OrderDetail[] = [];
        this.data[0].orderdetails.map((data) => {
          var match = false;
          this.selectedData.map(od => {
            if (data.id === od.id) {
              result.push({ ...data, cb: true });
              match = true;
              return;
            }
          });
          if (!match) {
            result.push(data);
          }
        });
        if (moneyInput >= op.sepTotalPay) {
          setTimeout(() => {
            this.genBillData(moneyInput, moneyChange, undefined, op.sepTotalPay);
            this.sepBillData = result;
          }, 0);
          setTimeout(() => {
            this.printBill("sep-bill-menu-payment-print");
          }, 0);
        } else {
          this.pMessage.defaultError();
        }

      } else {
        this.pMessage.emptyBillpayment();
      }
    }
  }

  setDefaultCoupon() {
    this.couponPercent = 0;
    this.couponMoney = 0;
    this.cd.detectChanges();
  }

  findCoupon({ couponInput, mb: moneyBalance }: any) {
    this.couponService.findCoupon(this.bchId, couponInput).subscribe({
      next: (data: any) => {
        if (data.message) {
          this.pMessage.couponExpired();
        } else {
          this.couponNgrx.update({
            couponPercent: data.percentAmount,
            couponMoney: moneyBalance * (data.percentAmount / 100),
          });
          this.couponPercent = this.couponNgrx.couponState.couponPercent;
          this.couponMoney = this.couponNgrx.couponState.couponMoney;
          this.pMessage.couponAdded();
        }
      },
      error: () => {
        this.couponPercent = 0;
        this.couponMoney = 0;
        this.couponInput = null;
        this.pMessage.couponNotFound();
      }
    });

  }
  getResultFromCal({ calResult }: { calResult: number }) {
    if (this.calDisplay) {
      this.pmodalChild.calGenerate(calResult);
    } else {
      this.pSepModalChild.calGenerate(calResult);
    }
  }
  calModal() {
    this.calChild1.calReset();
    this.calDisplay = !this.calDisplay;
  }
  calModalSep() {
    this.calChild2.calReset();
    this.calDisplaySep = !this.calDisplaySep;
  }
  calModalHide() {
    if (this.calDisplay) {
      this.calDisplay = false;
    } else {
      this.calDisplaySep = false;
    }
  }

  payConfirm(data: CheckoutModel) {
    /* data display */
    if (this.pmodalData.type === 'normal') {
      this.checkoutData.next(data);
      this.calService.calSubject.next({
        ...this.calService.calData,
        calc: data,
      });
      this.pmodal.visible = false;
    } else {
      /* separate pay */
      this.selectedData = [];
      this.orderDetailQuery.map((data: Checkbox, index) => {
        if (data.model.length) {
          this.selectedData[index] = data.model[0];
          return;
        }
        this.selectedData[index] = false;
      });
      let localDtoUpdateOd: any[] = [];
      this.selectedData.map((data, index) => {
        if (this.selectedData[index]) {
          localDtoUpdateOd.push(data);
          return;
        }
      });
      const calData = this.calService.calData;
      const coData = this.checkoutService.data;
      const dtoUpdateOd: any = localDtoUpdateOd.map((
        { id, orderId, restaurantId, branchId, bankId, tableId, menuId, price, amount, total }) => {
        return {
          orderDetailId: id,
          orderId,
          restaurantId,
          branchId,
          tableId,
          menuId,
          bankId,
          price,
          amount,
          total,
          isStatus: 'pending',
          paymentType: coData.payment?.type,
          comment: "that's my favvority food",
          reason: "Best food or healthy",
          referenceNumber: data.bank?.ref,
        }
      });
      /* order data dto */

      const resultDto: OrderDto = {
        orderId: calData.order.id,
        bankId: data.bank?.name.id,
        restaurantId: calData.order.restaurantId,
        branchId: calData.order.branchId,
        tableId: calData.order.tableId,
        moneyCoupon: coData.moneyCoupon! || 0,
        moneyDiscount: coData.couponPercent! || 0,
        moneyUpfrontPay: coData.total!,
        moneyReceived: coData.moneyReceive!,
        moneyChange: coData.moneyChange!,
        isStatus: OrderStatus.pending,
        paymentType: coData.payment!.type as PaymentType,
        referenceNumber: null,
        orderdetails: dtoUpdateOd,
      }
      this.orderService.orderPayment(resultDto).subscribe({
        next: () => {
          this.ngxSpinService.show();
          this.orderService.getOrderById(this.bchId, this.tableId, 'pending').subscribe({
            next: (data: Order) => {
              if (data) {
                this.dataSub.next(data);
                this.dataVAT = data.tariff;
                this.currencyM[0].rate = data.excTHB;
                this.currencyM[1].rate = data.excUSD;
                this.currencyM[0].value = data.moneyBalance / this.currencyM[0].rate;
                this.currencyM[1].value = data.moneyBalance / this.currencyM[1].rate;
                this.total = data.total;
                this.vat = data.moneyVat;
                this.tariff = data.tariff;
                this.totalVat = data.totalVat;
                this.paidMoney = data.moneyUpfrontPay;
                this.needPay = data.moneyBalance;
              } else {
                this.router.navigate(['checkout', this.bchId]);
              }
            },
            error: () => {
              this.router.navigate(['checkout', this.bchId]);
            }
          })
        },
        complete: () => {
          this.ngxSpinService.hide();
          this.pMessage.success();
        }
      });


    }

  }

  pmodalEvent() {
    this.pmodalData = {
      type: "normal"
    }
  }

  onClickToLoadBcelQrCode() {

  }

}
