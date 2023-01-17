import { AfterContentInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faMoneyBill, faCreditCard, faCalculator } from '@fortawesome/free-solid-svg-icons';
import { BankOptions } from 'src/app/models/bank.model';
import { Order } from 'src/app/models/order.model';
import { BankService } from 'src/app/services/bank.service';
import { CouponService } from 'src/app/services/ngrx/coupon.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { MPSTATUS } from 'src/app/utilConstant/index.util';


@Component({
  selector: 'p-sepmodal',
  templateUrl: './psepmodal.component.html',
  styleUrls: ['./psepmodal.component.css'],
})
export class PsepmodalComponent implements OnInit, AfterContentInit, OnChanges {
  public visible: boolean = false;
  public select: boolean = false;
  public selectDebit: boolean = false;
  public selectMoney: boolean = false
  public paymentTypeCheck: string;

  /* calculator */
  public isCalDisplay: boolean = false;

  faMoneyBill = faMoneyBill;
  faCreditCard = faCreditCard;
  faCalculator = faCalculator;
  @Input() data: Order;
  @Input() index: number;
  @Output() moneyReceive = new EventEmitter();
  @Output() payResult = new EventEmitter();
  @Output() paymentType = new EventEmitter();
  @Output() sepModalHide = new EventEmitter();
  @Output() sepPrintBill = new EventEmitter();
  @Input() sepTotal: number;
  @Input() sepVat: number;
  @Input() sepTotalPay: number;
  @Input() defaultSepTotalPay: number;
  @Input() freeMoneyChange: number | null;
  @Input() needPay: number;
  public freeMoneyChangeInput: any = null && 0;
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
  public bankOptions: BankOptions[];

  public moneyInput: any = null;
  public moneyChange: number = 0;
  public moneyBalance: number = 0;
  public rnBankInput: any = null && 0;
  public bankNameInput: string;

  public moneyPickerStatus: string;
  constructor(private pMessageService: PMsgServiceService, private bankService: BankService, private couponNgrx: CouponService) {
  }
  public moneySepSelfPay: number = 0;
 
  /* coupon proper ties */
  @Input() couponPercent: number;
  @Input() couponMoney: number;
  @Output() findCouponEmit = new EventEmitter();
  @Input() couponInput: any = null;
  @Output() setDefaultCoupon = new EventEmitter();

  @Output() calModalEvent = new EventEmitter();
  @Output() calModalHide = new EventEmitter();

  ngOnInit(): void {
  
  }
  ngAfterContentInit(): void {

  }

  selectedDebit() {
    this.paymentType.emit('bank');
    this.rnBankInput = null;
    this.bankNameInput = '';
    this.select = true;
    this.selectMoney = false;
    this.selectDebit = !this.selectDebit;
    this.moneyChange = 0;
    this.moneyInput = null;
    this.freeMoneyChange = null;
    this.moneyPickerStatus = '';
    this.freeMoneyChangeInput = null;
    this.paymentTypeCheck = 'bank';

    /* coupon default */
    this.couponInput = null;
    this.couponPercent = 0;
    this.setDefaultCouponState();
  }
  selectedMoney() {
    this.paymentType.emit('cash');
    this.rnBankInput = null;
    this.bankNameInput = '';
    this.select = true;
    this.selectDebit = false;
    this.selectMoney = !this.selectMoney;
    this.moneyChange = 0;
    this.moneyInput = null;
    this.freeMoneyChange = null;
    this.moneyPickerStatus = '';
    this.freeMoneyChangeInput = null;
    this.paymentTypeCheck = 'cash';

    /* coupon default */
    this.couponInput = null;
    this.couponPercent = 0;
    this.setDefaultCouponState();
  }

  modalHide() {
    this.select = false;
    this.rnBankInput = null;
    this.bankNameInput = '';
    this.selectDebit = false;
    this.selectMoney = false;
    this.moneyInput = null;
    this.moneyChange = 0;
    this.sepModalHide.emit();
    this.moneyPickerStatus = '';
    this.freeMoneyChangeInput = null;
    this.paymentTypeCheck = '';

    /* coupon default */
    this.couponInput = null;
    this.couponPercent = 0;
    this.setDefaultCouponState();
    this.calModalHide.emit();
  }

  setDefaultCouponState() {
    this.setDefaultCoupon.emit();
  }

  moneyPicker(mp: number) {
    if (this.sepTotalPay) {
      this.moneyInput += mp;
      this.moneyChange = Math.abs(this.sepTotalPay - this.moneyInput);
    } else {

      if (this.moneyPickerStatus === MPSTATUS.rec) {
        this.moneyInput += mp;
        this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
        this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);

      } else if (this.moneyPickerStatus === MPSTATUS.cha) {
        this.freeMoneyChangeInput += mp;
        this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
        this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);

      } else {
        this.moneyInput += mp;
        this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
        this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
      }

    }
  }

  moneyInputEvent(e: any) {
    this.moneyInput = e.value;
    if (this.sepTotalPay) {
      this.moneyChange = Math.abs(this.sepTotalPay - this.moneyInput);
    } else {
      this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
      this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
    }
    if (e.value === null) {
    }
  }

  freeMoneyChangeInputEvent({ value }: any) {
    this.freeMoneyChangeInput = value;
    if (this.sepTotalPay) {
      this.moneyChange = Math.abs(this.sepTotalPay - this.moneyInput);
    } else {
      this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
      this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
    }
    if (value === null) {
      this.moneyChange = 0;
    }
  }

  payByCash(data: any) {
    if (this.paymentTypeCheck === 'cash') {
      if (this.sepTotalPay) {
        this.payResult.emit({
          freeMoneyChangeInput: this.freeMoneyChangeInput, order: this.data, moneyChange: this.moneyChange
          , status: 'cash', op: { sepTotalPay: this.sepTotalPay, moneyInput: this.moneyInput, bankName: this.bankNameInput, rnBank: this.rnBankInput },
        });
        this.calModalHide.emit();
      } else {
        if (this.freeMoneyChangeInput && this.moneyInput) {
          if (this.freeMoneyChangeInput <= this.moneyInput) {
            if (this.freeMoneyChangeInput <= this.moneyBalance) {
              this.payResult.emit({
                freeMoneyChangeInput: this.freeMoneyChangeInput, order: this.data, moneyChange: this.moneyChange
                , status: 'cash', op: { sepTotalPay: this.moneySepSelfPay, moneyInput: this.moneyInput, bankName: this.bankNameInput, rnBank: this.rnBankInput },
              });
              this.calModalHide.emit();
            } else {
              /* needPay lower then freemoney */
              this.pMessageService.defaultError();
            }
          } else {
            this.pMessageService.defaultError();
          }
        } else {
          this.pMessageService.emptyBillpayment();
        }
      }

    } else {
      if (this.sepTotalPay) {
        this.payResult.emit({
          freeMoneyChangeInput: this.freeMoneyChangeInput, order: this.data, moneyChange: this.moneyChange
          , status: 'bank', op: { sepTotalPay: this.sepTotalPay, moneyInput: this.moneyInput, bankName: this.bankNameInput, rnBank: this.rnBankInput },
        });
        this.calModalHide.emit();
      } else {
        if (this.freeMoneyChangeInput && this.moneyInput && this.rnBankInput) {
          if (this.freeMoneyChangeInput <= this.moneyInput) {
            if (this.freeMoneyChangeInput <= this.moneyBalance) {
              this.payResult.emit({
                freeMoneyChangeInput: this.freeMoneyChangeInput, order: this.data, moneyChange: this.moneyChange
                , status: 'bank', op: { sepTotalPay: this.moneySepSelfPay, moneyInput: this.moneyInput, bankName: this.bankNameInput, rnBank: this.rnBankInput },
              });
              this.calModalHide.emit();
            } else {
              /* needPay lower then freemoney */
              this.pMessageService.defaultError();
            }
          } else {
            this.pMessageService.defaultError();
          }
        } else {
          this.pMessageService.emptyBillpayment();
        }
      }
    }
  }



  sepPrint() {
    if (this.paymentTypeCheck === 'cash') {

      if (this.sepTotalPay) {
        if (this.moneyInput) {
          this.sepPrintBill.emit({ freeMoneyChangeInput: this.freeMoneyChangeInput, moneyChange: this.moneyChange, moneyInput: this.moneyInput, op: { sepTotalPay: this.sepTotalPay } });
        } else {
          this.pMessageService.emptyBillpayment();
        }
      } else {
        if (this.freeMoneyChangeInput && this.moneyInput) {
          if (this.freeMoneyChangeInput <= this.moneyInput) {
            if (this.freeMoneyChangeInput <= this.moneyBalance) {
              this.sepPrintBill.emit({ freeMoneyChangeInput: this.freeMoneyChangeInput, moneyChange: this.moneyChange, moneyInput: this.moneyInput, op: { moneySepSelfPay: this.moneySepSelfPay } })
            } else {
              /* needPay lower then freemoney */
              this.pMessageService.defaultError();
            }
          } else {
            this.pMessageService.defaultError();
          }
        } else {
          this.pMessageService.emptyBillpayment();
        }
      }

    } else {
      if (this.sepTotalPay) {
        if (this.moneyInput && this.rnBankInput) {
          this.sepPrintBill.emit({ freeMoneyChangeInput: this.freeMoneyChangeInput, moneyChange: this.moneyChange, moneyInput: this.moneyInput, op: { sepTotalPay: this.sepTotalPay } });
        } else {
          this.pMessageService.emptyBillpayment();
        }
      } else {
        if (this.freeMoneyChangeInput && this.moneyInput) {
          if (this.freeMoneyChangeInput <= this.moneyInput) {
            if (this.freeMoneyChangeInput <= this.moneyBalance) {
              this.sepPrintBill.emit({ freeMoneyChangeInput: this.freeMoneyChangeInput, moneyChange: this.moneyChange, moneyInput: this.moneyInput, op: { moneySepSelfPay: this.moneySepSelfPay } });
            } else {
              /* needPay lower then freemoney */
              this.pMessageService.defaultError();
            }
          } else {
            this.pMessageService.defaultError();
          }
        } else {
          this.pMessageService.emptyBillpayment();
        }
      }
    }
  }

  focusRec() {
    this.moneyPickerStatus = MPSTATUS.rec;
  }

  focusCha() {
    this.moneyPickerStatus = MPSTATUS.cha;
  }

  ngOnChanges({ couponPercent }: SimpleChanges): void {
    if (this.sepTotalPay) {
      if (couponPercent?.currentValue > 0) {
        if (this.moneyInput > 0) {
          this.sepTotalPay = this.defaultSepTotalPay - this.couponMoney;
          this.moneyChange = Math.abs(this.moneyInput - this.sepTotalPay);
        } else {
          this.sepTotalPay = this.defaultSepTotalPay - this.couponMoney;
        }
      } else {
        this.sepTotalPay = this.defaultSepTotalPay;
        this.moneyChange = Math.abs(this.moneyChange ? this.moneyInput - this.sepTotalPay : 0);
      }
    } else {
      this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
      this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
    }

  }

  /* find coupon code*/
  findCoupon() {
    if (this.sepTotalPay) {
      if (this.couponInput === '') {
        this.findCouponEmit.emit({ couponInput: null });
      } else {
        this.couponNgrx.update({
          couponCode: this.couponInput,
        })
        this.findCouponEmit.emit({ couponInput: this.couponInput, mb: this.defaultSepTotalPay });
      }
    } else {
      if (!this.couponInput) {
        this.findCouponEmit.emit({ couponInput: null });
      } else {
        if (this.freeMoneyChangeInput) {
          if (this.freeMoneyChangeInput <= this.moneyBalance) {
            this.couponNgrx.update({
              couponCode: this.couponInput,
            })
            this.findCouponEmit.emit({ couponInput: this.couponInput, mb: this.freeMoneyChangeInput });
          } else {
            this.pMessageService.overflowPayment();
          }
        } else {
          this.pMessageService.customMessageWarn("ກະລຸນາປ້ອນຈຳນວນເງິນທີ່ຕ້ອງການຈ່າຍ");
        }
      }
    }

  }

  calGenerate(data: number) {
    if (data > 0) {
      if (this.sepTotalPay) {
        this.moneyInput = data;
        this.moneyChange = Math.abs(this.sepTotalPay - this.moneyInput);
      } else {
        if (this.moneyPickerStatus === MPSTATUS.rec) {
          this.moneyInput = data;
          this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
          this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);

        } else if (this.moneyPickerStatus === MPSTATUS.cha) {
          this.freeMoneyChangeInput = data;
          this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
          this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);

        } else {
          this.moneyInput = data;
          this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
          this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
        }
      }


    } else {
      if (this.moneyPickerStatus === MPSTATUS.rec) {
        this.moneyInput = null;
        this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
        this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);

      } else if (this.moneyPickerStatus === MPSTATUS.cha) {
        this.freeMoneyChangeInput = null;
        this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
        this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);

      } else {
        this.moneyInput = null;
        this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
        this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
      }
    }

  }
  calModal() {
    this.calModalEvent.emit();
  }
}
