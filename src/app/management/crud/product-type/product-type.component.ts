import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductTypeDto } from 'src/app/dto/product-type.dto';
import { colProductType, ProductType } from 'src/app/models/product-type.model';
import { AuthService } from 'src/app/services/auth.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { UtilServiceService } from 'src/app/services/util-service.service';
import { stringValidator } from 'src/app/validators/globalValidators';
@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit, OnDestroy {
  public disabled: boolean = true;
  public destroy$: Subject<boolean> = new Subject();
  public data$: Observable<ProductType[]> = this.productTypeService.dataObs$;
  public data: ProductType[];
  public col: any[];
  public items: MenuItem[]
  public modalDisplay: boolean = false;
  public modalEditDisplay: boolean = false;
  public form: FormGroup;
  public brchId: number;
  public dataId: number;
  public placementSelection: any[];
  public imagePath = 'assets/images/crud/processed-food.png';
  constructor(private productTypeService: ProductTypeService,
    private ngxSpinnerService: NgxSpinnerService,
    private utilService: UtilServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private confirmDialog: ConfirmationService,
    private authService: AuthService,
    private pMessageService: PMsgServiceService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.brchId = this.route.snapshot.params['id'];
    this.col = colProductType;
    this.form = this.fb.group({
      name: ['', [Validators.required, stringValidator()]],
    })
    this.productTypeService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: ProductType[]) => {
        this.data = data;
        this.productTypeService.dataSub$.next(data);
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
  dpEditEvent(obj: any) {
    this.data.map((data: ProductType) => {
      if (data.id === obj.id) {
        this.dataId = data.id;
        this.form.setValue({
          name: data.name,
        })
      }
    })
    this.modalEditDisplay = !this.modalEditDisplay;

  }
  dpRemoveEvent({ id }: any) {
    let currentData: any;
    this.data.map((data: ProductType) => {
      if (data.id === id) {
        currentData = data;
      }
    })
    this.confirmDialog.confirm({
      message: `ຢືນຢັນການລົບປະເພດສິນຄ້າ <b>${currentData.name}</b>`,
      accept: () => {
        const deletePrinterDto: ProductTypeDto = {
          typeId: id,
          restaurantId: parseInt(<string>this.authService.getRestaurantId()),
          branchId: this.brchId,
        }
        this.productTypeService.delete(deletePrinterDto).subscribe({
          complete: () => {
            this.ngxSpinnerService.show();
            this.pMessageService.deleteSuccess();
            this.productTypeService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
              next: (data: ProductType[]) => {
                this.data = data;
                this.productTypeService.dataSub$.next(data);
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
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const createPrinterDto: ProductTypeDto = {
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        name: this.name?.value,
      }
      this.productTypeService.create(createPrinterDto).subscribe({
        complete: () => {
          this.modalDisplay = false;
          this.pMessageService.createSuccess();
          this.productTypeService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: ProductType[]) => {
              this.data = data;
              this.productTypeService.dataSub$.next(data);
            },
            complete: () => {
              this.utilService.changeSubEvent();
              this.ngxSpinnerService.hide();
            }
          })
        },
        error: () => {
          this.pMessageService.dataDuplicate();
        }
      })
    }
  }
  update() {
    this.name?.markAsDirty();
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const updatePrinterDto: ProductTypeDto = {
        typeId: this.dataId,
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        name: this.name?.value,
      }
      this.productTypeService.update(updatePrinterDto).subscribe({
        complete: () => {
          this.modalEditDisplay = false;
          this.pMessageService.updateSuccess();
          this.productTypeService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: ProductType[]) => {
              this.data = data;
              this.productTypeService.dataSub$.next(data);
            },
            complete: () => {
              this.ngxSpinnerService.hide();
            }
          })
        },
        error: () => {
          this.pMessageService.dataDuplicate();
        }
      })
    }
  }
}

