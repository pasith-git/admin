import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CouponDto } from 'src/app/dto/coupon.dto';
import { colCoupon, Coupon } from 'src/app/models/coupon.model';
import { AuthService } from 'src/app/services/auth.service';
import { CouponService } from 'src/app/services/coupon.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { ResourcesService } from 'src/app/services/resources.service';
import { UtilServiceService } from 'src/app/services/util-service.service';
import { dateValidators } from 'src/app/validators/globalValidators';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit, OnDestroy {
  public disabled: boolean = true;
  public destroy$: Subject<boolean> = new Subject();
  public data$: Observable<Coupon[]> = this.couponService.dataObs$;
  public data: Coupon[];
  public col: any[];
  public modalDisplay: boolean = false;
  public modalEditDisplay: boolean = false;
  public form: FormGroup;
  public brchId: number;
  public dataId: number;
  public printerOptions: any[];
  public gcodes: any[] = [];
  public imagePath = 'assets/images/crud/voucher.png';
  public info: any;
  public amount: number = 1;
  constructor(private couponService: CouponService,
    private fb: FormBuilder,
    private pMessageService: PMsgServiceService,
    private confirmDialog: ConfirmationService,
    private ngxSpinnerService: NgxSpinnerService,
    private route: ActivatedRoute,
    private resourceService: ResourcesService,
    private authService: AuthService,
    private utilService: UtilServiceService) { }

  ngOnInit(): void {
    this.resourceService.getData().subscribe({
      next: (data) => {
        this.info = data;
      }
    })
    this.form = this.fb.group({
      percentCoupon: ['', [Validators.required]],
      expiredDate: ['', [Validators.required, dateValidators()]],
      code: [''],
    })


    this.ngxSpinnerService.show();
    this.brchId = this.route.snapshot.params['id'];
    this.col = colCoupon;
    this.couponService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Coupon[]) => {
        this.data = data;
        this.couponService.dataSub$.next(data);
      },
      error: () => {
        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
        this.disabled = false;
      },
    });
  }
  get percentCoupon() {
    return this.form.get('percentCoupon');
  }
  get expiredDate() {
    return this.form.get('expiredDate');
  }
  get code() {
    return this.form.get('code');
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  dpEditEvent(obj: any) {
    this.code?.addValidators(Validators.required)
    this.data.map((data: Coupon) => {
      if (data.id === obj.id) {
        this.dataId = data.id;
        this.form.setValue({
          percentCoupon: data.percentAmount,
          expiredDate: moment(data.dateExit).format('yyyy-MM-DD'),
          code: data.generatedCode,
        })
      }
    })
    this.modalEditDisplay = !this.modalEditDisplay;

  }

  onHide(e: boolean) {
    this.code?.removeValidators(Validators.required)
    document.querySelector('body')!.style.overflowY = 'auto';
    this.modalDisplay = e;
    this.modalEditDisplay = e;
    this.form.reset();
    this.gcodes = [];
  }
  removeCodeSelection(i: number) {
    this.gcodes = this.gcodes.filter((d, index) => index !== i);
  }
  generateCode() {
    if (this.amount && this.amount !== 1) {
      this.couponService.generateCode(this.info.restaurantName, this.amount).subscribe({
        next: (data: any) => {
          data.map((value: any) => {
            this.gcodes.push(value);
          })
        }
      })
    } else {
      this.couponService.generateCode(this.info.restaurantName, 1).subscribe({
        next: (data: any) => {
          data.map((value: any) => {
            this.gcodes.push(value);
          })
        }
      })
    }
  }

  create() {
    /* check if date before current */
    const fControls = Object.keys(this.form.controls);
    fControls.map(fControl => {
      this.form.controls[fControl].markAsDirty();
    })
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const newUser: CouponDto = {
        branchId: this.brchId,
        percentAmount: this.percentCoupon?.value,
        generatedCode: this.gcodes,
        dateExit: this.expiredDate?.value,
        restaurantId: parseInt(this.authService.getRestaurantId() as string),
      }
      this.couponService.create(newUser).subscribe({
        complete: () => {
          this.modalDisplay = false;
          this.pMessageService.createSuccess();
          this.couponService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data) => {
              this.data = data;
              this.couponService.dataSub$.next(data);
            },
            complete: () => {
              this.utilService.changeSubEvent();
              this.ngxSpinnerService.hide();
            }
          })
        },
        error: (data) => {
          this.pMessageService.customMessageWarn(data.error.message);
          this.ngxSpinnerService.hide();
        }
      });
    }

  }
  dpRemoveEvent({ id }: any) {
    let currentData: any;
    this.data.map((data: Coupon) => {
      if (data.id === id) {
        currentData = data;
      }
    })
    this.confirmDialog.confirm({
      message: `ຢືນຢັນການລົບຄູປອງ <b>${currentData.generatedCode}</b>`,
      accept: () => {
        const deleteDto: CouponDto = {
          branchId: this.brchId,
          couponId: currentData.id,
          restaurantId: parseInt(this.authService.getRestaurantId() as string),
        }
        this.couponService.deleteCoupon(deleteDto).subscribe({
          complete: () => {
            this.ngxSpinnerService.show();
            this.couponService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
              next: (data: Coupon[]) => {
                this.pMessageService.deleteSuccess();
                this.data = data;
                this.couponService.dataSub$.next(data);
              },
              complete: () => {
                this.utilService.changeSubEvent();
                this.ngxSpinnerService.hide();
              }
            })
          },
          error: (data) => {
          }
        });
      },
      reject: () => {

      }
    })
  }


  update() {
    const fControls = Object.keys(this.form.controls);
    fControls.map(fControl => {
      this.form.controls[fControl].markAsDirty();
    })
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const update: CouponDto = {
        branchId: this.brchId,
        couponId: this.dataId,
        generatedCode: this.code?.value,
        isUsed: false,
        percentAmount: this.percentCoupon?.value,
        dateExit: this.expiredDate?.value,
        restaurantId: parseInt(this.authService.getRestaurantId() as string),
      }
      this.couponService.updateCoupon(update).subscribe({
        complete: () => {
          this.modalEditDisplay = false;
          this.pMessageService.updateSuccess();
          this.couponService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: Coupon[]) => {
              this.data = data;
              this.couponService.dataSub$.next(data);
            },
            complete: () => {
              this.ngxSpinnerService.hide();
            }
          })
        },
        error: (data) => {
          console.log(data);
          this.ngxSpinnerService.hide();
        }
      })
    }
  }
}
