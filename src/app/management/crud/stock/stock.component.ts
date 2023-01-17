import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { colStockUnit, StockUnit } from 'src/app/models/stock-unit.model';
import { StockDto } from 'src/app/dto/stock.dto';
import { colStock, Stock } from 'src/app/models/stock.model';
import { StockService } from 'src/app/services/stock.service';
import { ProductService } from 'src/app/services/product.service';
import { StockUnitService } from 'src/app/services/stock-unit.service';
import { Product } from 'src/app/models/product.model';
import { UtilServiceService } from 'src/app/services/util-service.service';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  public disabled: boolean = true;
  public destroy$: Subject<boolean> = new Subject();
  public data$: Observable<Stock[]> = this.stockService.dataObs$;
  public data: Stock[];
  public col: any[];
  public items: MenuItem[]
  public modalDisplay: boolean = false;
  public modalEditDisplay: boolean = false;
  public form: FormGroup;
  public brchId: number;
  public dataId: number;
  public productOptions: any[];
  public stockUnitOptions: any[];
  public imagePath = 'assets/images/crud/stock.png';
  constructor(private stockService: StockService,
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
  get stockUnit() {
    return this.form.get('stockUnit');
  }
  get product() {
    return this.form.get('product');
  }
  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.brchId = this.route.snapshot.params['id'];
    this.col = colStock;
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      stockUnit: ['', [Validators.required]],
      product: ['', [Validators.required]],
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
    this.stockService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Stock[]) => {
        this.data = data;
        this.stockService.dataSub$.next(data);
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
    this.data.map((data: Stock) => {
      if (data.id === obj.id) {
        this.dataId = data.id;
        this.form.setValue({
          amount: data.amount,
          stockUnit: data.stockUnitId,
          product: data.productId,
        })
      }
    })
    this.modalEditDisplay = !this.modalEditDisplay;

  }
  dpRemoveEvent({ id }: any) {
    let currentData: any;
    this.data.map((data: Stock) => {
      if (data.id === id) {
        currentData = data;
      }
    })
    this.confirmDialog.confirm({
      message: `ຢືນຢັນການລົບສະຕ໊ອກ <b>${currentData.productName}</b>`,
      accept: () => {
        const deleteDto: StockDto = {
          stockId: id,
          restaurantId: parseInt(<string>this.authService.getRestaurantId()),
          branchId: this.brchId,
        }
        this.stockService.delete(deleteDto).subscribe({
          complete: () => {
            this.ngxSpinnerService.show();
            this.pMessageService.deleteSuccess();
            this.stockService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
              next: (data: Stock[]) => {
                this.data = data;
                this.stockService.dataSub$.next(data);
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
    this.stockUnit?.markAsDirty();
    this.product?.markAsDirty();
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const createDto: StockDto = {
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        amount: this.amount?.value,
        stockUnitId: this.stockUnit?.value,
        productId: this.product?.value,
      }
      this.stockService.create(createDto).subscribe({
        complete: () => {
          this.modalDisplay = false;
          this.pMessageService.createSuccess();
          this.stockService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: Stock[]) => {
              this.data = data;
              this.stockService.dataSub$.next(data);
            },
            complete: () => {
              this.utilService.changeSubEvent();
              this.ngxSpinnerService.hide();
            }
          })
        },
        error: (err) => {
          this.ngxSpinnerService.hide();
          this.pMessageService.dataDuplicate();
        }
      })
    }
  }
  update() {
    this.form.markAsDirty();
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const updateDto: StockDto = {
        stockId: this.dataId,
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        amount: this.amount?.value,
        productId: this.product?.value,
        stockUnitId: this.stockUnit?.value,
      }
      this.stockService.update(updateDto).subscribe({
        complete: () => {
          this.modalEditDisplay = false;
          this.pMessageService.updateSuccess();
          this.stockService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: Stock[]) => {
              this.data = data;
              this.stockService.dataSub$.next(data);
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
