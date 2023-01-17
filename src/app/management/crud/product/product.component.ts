import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { ipAddressValidator, numberValidator, stringValidator } from 'src/app/validators/globalValidators';
import { ProductService } from 'src/app/services/product.service';
import { colProduct, Product } from 'src/app/models/product.model';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ProductType } from 'src/app/models/product-type.model';
import { ProductDto } from 'src/app/dto/product.dto';
import { StockUnitService } from 'src/app/services/stock-unit.service';
import { StockUnit } from 'src/app/models/stock-unit.model';
import { UtilServiceService } from 'src/app/services/util-service.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],

})
export class ProductComponent implements OnInit {
  public disabled: boolean = true;
  public destroy$: Subject<boolean> = new Subject();
  public data$: Observable<Product[]> = this.productService.dataObs$;
  public data: Product[];
  public col: any[];
  public items: MenuItem[]
  public modalDisplay: boolean = false;
  public modalEditDisplay: boolean = false;
  public form: FormGroup;
  public brchId: number;
  public dataId: number;
  public productTypeOptions: any[];
  public unitOptions: any[];
  public imagePath = 'assets/images/crud/supplies.png';
  constructor(private productService: ProductService,
    private ngxSpinnerService: NgxSpinnerService,
    private productTypeService: ProductTypeService,
    private stockUnitService: StockUnitService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private confirmDialog: ConfirmationService,
    private authService: AuthService,
    private pMessageService: PMsgServiceService,
    private cbr: ChangeDetectorRef,
    private utilService: UtilServiceService) {
  }
  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.brchId = this.route.snapshot.params['id'];
    this.col = colProduct;
    this.form = this.fb.group({
      name: ['', [Validators.required, stringValidator()]],
      type: ['', [Validators.required]],
      unit: ['', [Validators.required]],
    })
    this.productTypeService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: ProductType[]) => {
        const result = data.map((value: ProductType) => {
          return { name: value.name, code: value.id };
        })
        this.productTypeOptions = result;
      }
    })
    this.stockUnitService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: StockUnit[]) => {
        const result = data.map((value: StockUnit) => {
          return { name: value.name, code: value.id };
        })
        this.unitOptions = result;
      }
    })
    this.productService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Product[]) => {
        this.data = data;
        this.productService.dataSub$.next(data);
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

  get name() {
    return this.form.get('name');
  }
  get type() {
    return this.form.get('type');
  }
  get unit() {
    return this.form.get('unit');
  }
  dpEditEvent(obj: any) {
    this.data.map((data: Product) => {
      if (data.id === obj.id) {
        this.dataId = data.id;
        this.form.setValue({
          name: data.productName,
          type: data.productTypeId,
          unit: data.stockUnitId,
        })
      }
    })
    this.modalEditDisplay = !this.modalEditDisplay;

  }
  dpRemoveEvent({ id }: any) {
    let currentData: any;
    this.data.map((data: Product) => {
      if (data.id === id) {
        currentData = data;
      }
    })
    this.confirmDialog.confirm({
      message: `ຢືນຢັນການລົບສິນຄ້າ <b>${currentData.productName}</b>`,
      accept: () => {
        const deleteDto: ProductDto = {
          productId: id,
          restaurantId: parseInt(<string>this.authService.getRestaurantId()),
          branchId: this.brchId,
        }
        this.productService.delete(deleteDto).subscribe({
          complete: () => {
            this.ngxSpinnerService.show();
            this.pMessageService.deleteSuccess();
            this.productService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
              next: (data: Product[]) => {
                this.data = data;
                this.productService.dataSub$.next(data);
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
    this.name?.markAsDirty();
    this.type?.markAsDirty();
    this.unit?.markAsDirty();
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const createDto: ProductDto = {
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        name: this.name?.value,
        productTypeId: this.type?.value,
        stockUnitId: this.unit?.value,
      }
      this.productService.create(createDto).subscribe({
        complete: () => {
          this.modalDisplay = false;
          this.pMessageService.createSuccess();
          this.productService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: Product[]) => {
              this.data = data;
              this.productService.dataSub$.next(data);
            },
            complete: () => {
              this.utilService.changeSubEvent();
              this.ngxSpinnerService.hide();
            }
          })
        },
        error: (data) => {
          this.ngxSpinnerService.hide();
        }
      })
    }
  }
  update() {
    this.name?.markAsDirty();
    this.type?.markAsDirty();
    this.unit?.markAsDirty();
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const updateDto: ProductDto = {
        productId: this.dataId,
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        name: this.name?.value,
        productTypeId: this.type?.value,
        stockUnitId: this.unit?.value,
      }
      this.productService.update(updateDto).subscribe({
        complete: () => {
          this.modalEditDisplay = false;
          this.pMessageService.updateSuccess();
          this.productService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: Product[]) => {
              this.data = data;
              this.productService.dataSub$.next(data);
            },
            complete: () => {
              this.ngxSpinnerService.hide();
            }
          })
        },
        error: () => {
          this.ngxSpinnerService.hide();
        }
      })
    }
  }
}
