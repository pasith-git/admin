import { AfterContentInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faMoneyBill, faCreditCard, faCalculator, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { BankService } from 'src/app/services/bank.service';
import { CheckoutModel, CheckoutService } from 'src/app/services/checkout.service';
import { CouponService } from 'src/app/services/coupon.service';
import { OrdersService } from 'src/app/services/orders.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';

export interface PmodalData {
  header?: string
  type?: string
  total?: number
  statusSep?: string
}

@Component({
  selector: 'p-modal',
  templateUrl: './pmodal.component.html',
  styleUrls: ['./pmodal.component.css'],
})

export class PmodalComponent implements OnInit, AfterContentInit, OnChanges {
  public visible: boolean = false;
  public select: boolean = false;
  public selectDebit: boolean = false;
  public selectMoney: boolean = false;
  faMoneyBill = faMoneyBill;
  faCreditCard = faCreditCard;
  faCalculator = faCalculator;
  @Input() pmodalData: PmodalData = {};
  @Output() pmodalEvent = new EventEmitter();
  /* cal functions */
  @Output() calModalEvent = new EventEmitter();
  @Output() calModalHide = new EventEmitter();
  public moneyOptions: any[] = [
    { amount: 500 },
    { amount: 1000 },
    { amount: 2000 },
    { amount: 5000 },
    { amount: 10000 },
    { amount: 20000 },
    { amount: 50000 },
    { amount: 100000 },
  ]
  public bankOptions: any[];
  public rnBankInput: any = null && 0;
  public bankNameInput: string;

  public tableId: number;
  public brchId: number;
  public selectedValue: string;
  public orderData = {
    moneyBalance: 0,
    tariff: 0,
    vatOption: "",
    defaultTotal: 0,
  }
  public form: FormGroup;
  public checkoutData: Observable<CheckoutModel>;
  public inputPicker: string = '';

  @Output() checkoutDataEvent = new EventEmitter();
  constructor(private bankService: BankService,
    private checkoutService: CheckoutService,
    private couponService: CouponService,
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private pMessageService: PMsgServiceService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      money: [undefined, Validators.required],
      coupon: [''],
      discount: [''],
      bankName: [''],
      bankRef: ['', Validators.required],
      npMoney: ['', Validators.required],
    })
    this.tableId = this.route.firstChild?.snapshot.params['tid'];
    this.brchId = this.route.snapshot.params['id'];
    this.checkoutData = this.checkoutService.data$;
    this.orderService.getOrderById(this.brchId.toString(), this.tableId, 'pending').subscribe({
      next: (order) => {
        this.orderData = {
          moneyBalance: order.vatOption === "restaurant" ? order.total : order.moneyBalance,
          tariff: order.tariff,
          vatOption: order.vatOption,
          defaultTotal: order.total,
        }
        this.checkoutService.dataSubject.next({
          ...this.checkoutService.data,
          total: this.orderData.moneyBalance,
          defaultTotal: order.total,
          payment: {
            vat: this.orderData.vatOption,
          },
          tariff: this.orderData.tariff,
        })
      }
    })

    this.bankService.findIdAndName(this.brchId).subscribe(data => {
      const genBank = data.map(value => {
        return {
          id: value.id,
          name: { id: value.id, value: value.name }
        }
      })
      this.bankOptions = genBank;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    /* this.checkoutService.dataSubject.next({
      ...this.checkoutService.data,
      total: changes['pmodalData'].currentValue.total,
    })
    console.log(changes['pmodalData'].currentValue.total); */
    if (changes['pmodalData'].currentValue.type === "normal") {
      this.npMoney?.clearValidators();
    } else {
      this.npMoney?.addValidators(Validators.required);
    }
  }

  get moneyInput() {
    return this.form.get('money');
  }

  get couponInput() {
    return this.form.get('coupon');
  }

  get discount() {
    return this.form.get('discount');
  }

  get bankName() {
    return this.form.get('bankName');
  }

  get bankRef() {
    return this.form.get('bankRef');
  }

  get npMoney() {
    return this.form?.get('npMoney');
  }

  ngAfterContentInit(): void {
  }

  calculated(data: CheckoutModel) {
    const coData = this.checkoutService.data;
    this.checkoutService.dataSubject.next({
      ...coData,
      ...data,
    })
  }

  selectedDebit() {

    this.rnBankInput = null;
    this.bankNameInput = '';
    this.select = true;
    this.selectMoney = false;
    this.selectDebit = !this.selectDebit;
    this.bankRef?.addValidators(Validators.required);
    this.checkoutService.dataSubject.next({
      ...this.checkoutService.defaultValue,
      payment: {
        type: "bank",
        vat: this.orderData.vatOption,
      },

      total: this.pmodalData.statusSep ? this.pmodalData.total : this.orderData.moneyBalance,
      defaultTotal: this.orderData.defaultTotal,
      tariff: this.orderData.tariff,

    });
    if (this.pmodalData.statusSep === 'sepOrder' || this.pmodalData.type === 'normal') {
      this.npMoney?.clearValidators();
    } else {
      this.npMoney?.addValidators(Validators.required)
    }
    this.form.reset();
  }
  selectedMoney() {
    this.rnBankInput = null;
    this.bankNameInput = '';
    this.select = true;
    this.selectDebit = false;
    this.selectMoney = !this.selectMoney;
    this.bankRef?.clearValidators();
    this.checkoutService.dataSubject.next({
      ...this.checkoutService.defaultValue,
      payment: {
        type: "cash",
        vat: this.orderData.vatOption,
      },
      total: this.pmodalData.statusSep ? this.pmodalData.total : this.orderData.moneyBalance,
      defaultTotal: this.orderData.defaultTotal,
      tariff: this.orderData.tariff,
    });
    this.form.reset();
    if (this.pmodalData.statusSep === 'sepOrder' || this.pmodalData.type === 'normal') {
      this.npMoney?.clearValidators();
    } else {
      this.npMoney?.addValidators(Validators.required)
    }
  }

  modalHide() {
    this.select = false;
    this.rnBankInput = null;
    this.bankNameInput = '';
    this.selectDebit = false;
    this.selectMoney = false;
    this.selectedValue = '';
    this.calModalHide.emit();
    this.checkoutService.dataSubject.next({
      ...this.checkoutService.data,
      total: this.orderData.moneyBalance,
      tariff: this.orderData.tariff,
      payment: {
        ...this.checkoutService.data.payment,
        vat: this.orderData.vatOption,
      }
    });
    this.pmodalEvent.emit();
    this.inputPicker = '';
    this.form.reset();
  }

  moneyPicker(mp: number) {
    if (this.inputPicker === "npMoney") {
      if (this.npMoney?.value) {
        const npValue = this.npMoney.value + mp;
        this.npMoney.setValue(npValue);
        const npMoney = { value: npValue };
        this.getMoneyRnp(npMoney)
      } else {
        this.npMoney?.setValue(mp);
        const npMoney = { value: mp };
        this.getMoneyRnp(npMoney)
      }

    } else {
      this.moneyInput?.setValue(this.moneyInput ? this.moneyInput.value + mp : mp);
    }
    const coData = this.checkoutService.data;
    this.checkoutService.dataSubject.next({
      ...coData,
      moneyReceive: (this.moneyInput?.value + coData.moneyCoupon!) || 0,
      moneyChange: this.moneyInput ? Math.abs(coData.total! - (this.moneyInput.value + coData.moneyCoupon!)) : 0,
    })
  }

  getMoneyR(e: any) {
    const coData = this.checkoutService.data;
    this.checkoutService.dataSubject.next({
      ...coData,
      moneyReceive: e.value || 0,
      moneyChange: coData.moneyCoupon ?
        Math.abs(coData.total! - e.value) : e.value ? Math.abs(coData.total! - (e.value + coData.moneyCoupon)) : 0,
    })
  }

  getMoneyRnp(e: any) {
    const coData = this.checkoutService.data;
    if (e.value) {
      if (e.value <= this.orderData.moneyBalance) {
        this.checkoutService.dataSubject.next({
          ...coData,
          total: e.value,
          moneyChange: Math.abs(e.value - (this.moneyInput?.value + coData.moneyCoupon)),
          validSep: true,
        })
      } else {
        this.checkoutService.dataSubject.next({
          ...coData,
          total: this.orderData.moneyBalance,
          moneyChange: Math.abs(this.orderData.moneyBalance - (this.moneyInput?.value + coData.moneyCoupon)),
          validSep: true,
        })
      }
    } else {
      this.checkoutService.dataSubject.next({
        ...coData,
        total: 0,
      })
    }

  }

  /* find coupon code*/
  findCoupon() {
    const coData = this.checkoutService.data;
    if (this.discount?.value === 'discountMoney') {
      /* check if not NaN */
      if (parseInt(this.couponInput!.value)) {
        const total = this.orderData.vatOption === "customer" ? Math.abs(((coData.defaultTotal! - this.couponInput?.value) * (coData.tariff! / 100)) + Math.abs(coData.defaultTotal! - this.couponInput?.value))
          : Math.abs(this.orderData.moneyBalance - this.couponInput?.value);
        this.checkoutService.dataSubject.next({
          ...coData,
          ...(this.orderData.vatOption === "customer" && { total }),
          couponPercent: 0,
          moneyCoupon: parseInt(this.couponInput?.value),
          moneyChange: Math.abs(total - this.moneyInput!.value),
        });
      } else {
        this.pMessageService.customMessageWarn("ໃສ່ຈຳນວນເງິນໃຫ້ຖືກຕ້ອງ");
      }


    } else if (this.discount?.value === 'discountPercent') {

      if (parseInt(this.couponInput!.value)) {
        const discountMoney = coData.defaultTotal! * parseInt(this.couponInput?.value) / 100;
        const total = this.orderData.vatOption === "customer" ? Math.abs(((coData.defaultTotal! - discountMoney) * (coData.tariff! / 100)) + coData.defaultTotal!)
          : Math.abs(this.orderData.moneyBalance - (this.orderData.moneyBalance * parseInt(this.couponInput?.value) / 100));
        this.checkoutService.dataSubject.next({
          ...coData,
          ...(this.orderData.vatOption === "customer" && { total }),
          couponPercent: parseInt(this.couponInput?.value),
          moneyCoupon: discountMoney,
          moneyChange: Math.abs(total - this.moneyInput!.value),
        });
      } else {
        this.pMessageService.customMessageWarn("ໃສ່ຈຳນວນເປິເຊັນໃຫ້ຖືກຕ້ອງ");
      }

    } else if (this.discount?.value === 'discountMember') {

      this.couponService.generateCodeByPhone(this.couponInput?.value).subscribe({
        next: (data: any) => {
          const moneyCoupon = coData.defaultTotal! * (data.discount / 100);
          const total = this.orderData.vatOption === "customer" ? Math.abs(((coData.defaultTotal! - moneyCoupon) * (coData.tariff! / 100)) + coData.defaultTotal!)
            : Math.abs(this.orderData.moneyBalance - (this.orderData.moneyBalance * (data.discount / 100)));
          this.checkoutService.dataSubject.next({
            ...coData,
            ...(this.orderData.vatOption === "customer" && { total }),
            couponPercent: data.discount,
            moneyCoupon: moneyCoupon,
            moneyChange: this.moneyInput ? Math.abs(total - this.moneyInput.value) : 0,

          });
        },
        error: () => {
          this.pMessageService.customMessageWarn("ບໍ່ພົບສ່ວນຫຼຸດໃນເບີໂທນີ້");
        }
      })

    } else if (this.discount?.value === 'discountCode' || !this.discount?.value) {

      this.couponService.findCoupon(this.brchId.toString(), this.couponInput!.value).subscribe({
        next: (coupon) => {
          const moneyCoupon = coData.defaultTotal! * (coupon.percentAmount / 100);
          const total = this.orderData.vatOption === "customer" ? Math.abs(((coData.defaultTotal! - moneyCoupon) * (coData.tariff! / 100)) + coData.defaultTotal!)
            : Math.abs(this.orderData.moneyBalance - (this.orderData.moneyBalance * (coupon.percentAmount / 100)));
          this.checkoutService.dataSubject.next({
            ...coData,
            ...(this.orderData.vatOption === "customer" && { total }),
            couponPercent: coupon.percentAmount,
            moneyCoupon: moneyCoupon,
            couponCode: this.couponInput?.value,
            moneyChange: this.moneyInput ? Math.abs(total - this.moneyInput.value) : 0,

          });
        },
        error: () => {
          this.pMessageService.couponNotFound();
          return;
        }
      })

    }

  }

  payByCash() {
    this.moneyInput?.markAsDirty();
    this.bankRef?.markAsDirty();
    this.npMoney?.markAsDirty();
    const coData = this.checkoutService.data;
    if (this.form.valid) {
      if ((coData.moneyReceive! + coData.moneyCoupon!) >= coData.total!) {
        this.checkoutDataEvent.emit({
          ...this.checkoutService.data,
          bank: {
            name: this.bankNameInput,
            ref: this.bankRef?.value,
          },
        })
      } else {
        this.pMessageService.customMessageWarn('ຈຳນວນເງິນບໍ່ຖືກຕ້ອງ');
      }
    }
  }

  /* calulator */

  calGenerate(data: number) {
    let calNum: any = 0;
    if (this.inputPicker === "npMoney") {
      if (data) {
        if (!this.npMoney?.value) {
          calNum = data;
        } else {
          calNum = this.npMoney?.value + data;
        }
      } else {
        calNum = 0;
      }
      const obj = { value: calNum };
      this.npMoney?.setValue(calNum);
      this.getMoneyRnp(obj);
    } else {
      if (data) {
        if (!this.moneyInput?.value) {
          calNum = data;
        } else {
          calNum = this.moneyInput?.value + data;
        }
      } else {
        calNum = 0;
      }
      const obj = { value: calNum };
      this.moneyInput?.setValue(calNum);
      this.getMoneyR(obj);
    }

  }

  calModal() {
    this.calModalEvent.emit();
  }

  moneyBlur() {
    this.inputPicker = "money";
  }

  npMoneyBlur() {
    this.inputPicker = "npMoney";
  }

  sepPrint() {
  }
  sepPrintF() {
    this.pMessageService.billPaymentWarn();
  }

  resetForm() {
    this.form.reset();
    this.checkoutService.dataSubject.next({
      ...this.checkoutService.data,
      moneyReceive: 0,
      moneyCoupon: 0,
      moneyChange: 0,
      couponPercent: 0,
      ...(this.pmodalData.statusSep === "sepNormal" ? { total: 0 } : { total: this.orderData.moneyBalance })
    })
  }
}
