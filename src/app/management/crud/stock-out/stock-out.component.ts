import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { colStockUnit, StockUnit } from 'src/app/models/stock-unit.model';
import { ProductService } from 'src/app/services/product.service';
import { StockUnitService } from 'src/app/services/stock-unit.service';
import { Product } from 'src/app/models/product.model';
import { StockOutService } from 'src/app/services/stock-out.service';
import { StockOut, stockoutcol } from 'src/app/models/stock-out.model';
import { StockOutDto } from 'src/app/dto/stock-out.dto';
import { UtilServiceService } from 'src/app/services/util-service.service';
@Component({
  selector: 'app-stock-in',
  templateUrl: './stock-out.component.html',
  styleUrls: ['./stock-out.component.css']
})
export class StockOutComponent implements OnInit {
  public disabled: boolean = true;
  public destroy$: Subject<boolean> = new Subject();
  public data$: Observable<StockOut[]> = this.stockOutService.dataObs$;
  public data: StockOut[];
  public col: any[];
  public items: MenuItem[]
  public modalDisplay: boolean = false;
  public modalEditDisplay: boolean = false;
  public form: FormGroup;
  public brchId: number;
  public dataId: number;
  public productOptions: any[];
  public stockUnitOptions: any[];
  public imagePath = 'assets/images/crud/out-of-stock.png';
  constructor(private stockOutService: StockOutService,
    private ngxSpinnerService: NgxSpinnerService,
    private productService: ProductService,
    private utilService: UtilServiceService,
    private stockUnitService: StockUnitService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private confirmDialog: ConfirmationService,
    private authService: AuthService,
    private pMessageService: PMsgServiceService) { }
  get amount() {
    return this.form.get('amount');
  }
  get reason() {
    return this.form.get('reason');
  }
  get stockUnit() {
    return this.form.get('stockUnit');
  }
  get product() {
    return this.form.get('product');
  }
  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.brchId = this.route.snapshot.params['id'];
    this.col = stockoutcol;
    this.form = this.fb.group({
      product: ['', [Validators.required]],
      stockUnit: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
      reason: ['', [Validators.required]],
    })
    this.productService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Product[]) => {
        const result = data.map((value: Product) => {
          return { name: value.productName, code: value.id };
        })
        this.productOptions = result;
      }
    })
    this.stockUnitService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: StockUnit[]) => {
        const result = data.map((value: StockUnit) => {
          return { name: value.name, code: value.id };
        })
        this.stockUnitOptions = result;
      }
    })
    this.stockOutService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: StockOut[]) => {
        this.data = data;
        this.stockOutService.dataSub$.next(data);
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
  dpEditEvent(obj: any) {
    this.data.map((data: StockOut) => {
      if (data.id === obj.id) {
        this.dataId = data.id;
        this.form.setValue({
          amount: data.amount,
          stockUnit: data.stockUnitId,
          product: data.productId,
          reason: data.reason,
        })
      }
    })
    this.modalEditDisplay = !this.modalEditDisplay;

  }
  dpRemoveEvent({ id }: any) {
    let currentData: StockOut;
    this.data.map((data: StockOut) => {
      if (data.id === id) {
        currentData = data;
      }
    })
    this.confirmDialog.confirm({
      message: `ຢືນຢັນການລົບຂໍ້ມູນນຳສິນຄ້າອອກ <b>${currentData!.productName}</b>`,
      accept: () => {
        const deleteDto: StockOutDto = {
          stockOutId: id,
          restaurantId: parseInt(<string>this.authService.getRestaurantId()),
          branchId: this.brchId,
          productId: currentData.productId,
          stockUnitId: currentData.stockUnitId,
        }
        this.stockOutService.delete(deleteDto).subscribe({
          complete: () => {
            this.ngxSpinnerService.show();
            this.pMessageService.deleteSuccess();
            this.stockOutService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
              next: (data: StockOut[]) => {
                this.data = data;
                this.stockOutService.dataSub$.next(data);
              },
              complete: () => {
                this.utilService.changeSubEvent();
                this.ngxSpinnerService.hide();
              }
            })
          }
        });
      },
      reject: () => {

      }
    })
  }
  onHide(e: boolean) {
    document.querySelector('body')!.style.overflowY = 'auto';
    this.modalDisplay = e;
    this.modalEditDisplay = e;
    this.form.reset();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  create() {
    this.amount?.markAsDirty();
    this.reason?.markAsDirty();
    this.product?.markAsDirty();
    this.stockUnit?.markAsDirty();
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const createDto: StockOutDto = {
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        amount: this.amount?.value,
        stockUnitId: this.stockUnit?.value,
        productId: this.product?.value,
        reason: this.reason?.value,
      }
      this.stockOutService.create(createDto).subscribe({
        complete: () => {
          this.modalDisplay = false;
          this.pMessageService.createSuccess();
          this.stockOutService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: StockOut[]) => {
              this.data = data;
              this.stockOutService.dataSub$.next(data);
            },
            complete: () => {
              this.utilService.changeSubEvent();
              this.ngxSpinnerService.hide();
            }
          })
        },
        error: () => {
          this.ngxSpinnerService.hide();
          this.pMessageService.dataDuplicate();
        }
      })
    }
  }
  update() {
    this.amount?.markAsDirty();
    this.reason?.markAsDirty();
    this.product?.markAsDirty();
    this.stockUnit?.markAsDirty();
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const updateDto: StockOutDto = {
        stockOutId: this.dataId,
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        amount: this.amount?.value,
        productId: this.product?.value,
        stockUnitId: this.stockUnit?.value,
        reason: this.reason?.value,
      }
      this.stockOutService.update(updateDto).subscribe({
        complete: () => {
          this.modalEditDisplay = false;
          this.pMessageService.updateSuccess();
          this.stockOutService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: StockOut[]) => {
              this.data = data;
              this.stockOutService.dataSub$.next(data);
            },
            complete: () => {
              this.ngxSpinnerService.hide();
            }
          })
        },
        error: () => {
          this.ngxSpinnerService.hide();
          this.pMessageService.dataDuplicate();
        }
      })
    }
  }
}
