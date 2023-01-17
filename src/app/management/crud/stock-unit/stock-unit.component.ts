import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { numberValidator, stringValidator } from 'src/app/validators/globalValidators';
import { StockUnitService } from 'src/app/services/stock-unit.service';
import { colStockUnit, StockUnit } from 'src/app/models/stock-unit.model';
import { StockUnitDto } from 'src/app/dto/stock-unit.dto';
import { UtilServiceService } from 'src/app/services/util-service.service';
@Component({
  selector: 'app-stock-unit',
  templateUrl: './stock-unit.component.html',
  styleUrls: ['./stock-unit.component.css']
})
export class StockUnitComponent implements OnInit {
  public disabled: boolean = true;
  public destroy$: Subject<boolean> = new Subject();
  public data$: Observable<StockUnit[]> = this.stockUnitService.dataObs$;
  public data: StockUnit[];
  public col: any[];
  public items: MenuItem[]
  public modalDisplay: boolean = false;
  public modalEditDisplay: boolean = false;
  public form: FormGroup;
  public brchId: number;
  public dataId: number;
  public placementSelection: any[];
  public imagePath = 'assets/images/crud/boxes.png';
  constructor(private stockUnitService: StockUnitService,
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
    this.col = colStockUnit;
    this.form = this.fb.group({
      name: ['', [Validators.required, stringValidator()]],
      netContent: ['', [numberValidator()]],
    })
    this.stockUnitService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: StockUnit[]) => {
        this.data = data;
        this.stockUnitService.dataSub$.next(data);
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
  get netContent() {
    return this.form.get('netContent');
  }
  dpEditEvent(obj: any) {
    this.data.map((data: StockUnit) => {
      if (data.id === obj.id) {
        this.dataId = data.id;
        this.form.setValue({
          name: data.name,
          netContent: data.netContent,
        })
      }
    })
    this.modalEditDisplay = !this.modalEditDisplay;

  }
  dpRemoveEvent({ id }: any) {
    let currentData: any;
    this.data.map((data: StockUnit) => {
      if (data.id === id) {
        currentData = data;
      }
    })
    this.confirmDialog.confirm({
      message: `ຢືນຢັນການລົບສະຕ໊ອກຫົວໜ່ວຍ <b>${currentData.name}</b>`,
      accept: () => {
        const deleteDto: StockUnitDto = {
          stockunitId: id,
          restaurantId: parseInt(<string>this.authService.getRestaurantId()),
          branchId: this.brchId,
        }
        this.stockUnitService.delete(deleteDto).subscribe({
          complete: () => {
            this.ngxSpinnerService.show();
            this.pMessageService.deleteSuccess();
            this.stockUnitService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
              next: (data: StockUnit[]) => {
                this.data = data;
                this.stockUnitService.dataSub$.next(data);
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
    this.netContent?.markAsDirty();
    if (this.form.valid) {
      this.modalDisplay = false;
      const createDto: StockUnitDto = {
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        name: this.name?.value,
        netContent: 0 || this.netContent?.value,
      }
      this.stockUnitService.create(createDto).subscribe({
        complete: () => {
          this.ngxSpinnerService.show();
          this.pMessageService.createSuccess();
          this.stockUnitService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: StockUnit[]) => {
              this.data = data;
              this.stockUnitService.dataSub$.next(data);
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
    this.netContent?.markAsDirty();
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const updateDto: StockUnitDto = {
        stockunitId: this.dataId,
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        name: this.name?.value,
        netContent: 0 || this.netContent?.value,
      }
      this.stockUnitService.update(updateDto).subscribe({
        complete: () => {
          this.modalEditDisplay = false;
          this.pMessageService.updateSuccess();
          this.stockUnitService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: StockUnit[]) => {
              this.data = data;
              this.stockUnitService.dataSub$.next(data);
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
