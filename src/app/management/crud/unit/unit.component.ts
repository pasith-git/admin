import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { UnitService } from 'src/app/services/unit.service';
import { colUnit, Unit } from 'src/app/models/unit.model';
import { UnitDto } from 'src/app/dto/unit.dto';
import { stringValidator } from 'src/app/validators/globalValidators';
import { UtilServiceService } from 'src/app/services/util-service.service';
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  public disabled: boolean = true;
  public destroy$: Subject<boolean> = new Subject();
  public data$: Observable<Unit[]> = this.unitService.dataObs$;
  public data: Unit[];
  public col: any[];
  public items: MenuItem[]
  public modalDisplay: boolean = false;
  public modalEditDisplay: boolean = false;
  public form: FormGroup;
  public brchId: number;
  public dataId: number;
  public placementSelection: any[];
  icon = faBalanceScale;
  constructor(private unitService: UnitService,
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
    this.col = colUnit;
    this.form = this.fb.group({
      name: ['', [Validators.required, stringValidator()]],
    })
    this.unitService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Unit[]) => {
        this.data = data;
        this.unitService.dataSub$.next(data);
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
    this.data.map((data: Unit) => {
      if (data.id === obj.id) {
        this.dataId = data.id;
        this.form.setValue({
          name: data.unitName,
        })
      }
    })
    this.modalEditDisplay = !this.modalEditDisplay;

  }
  dpRemoveEvent({ id }: any) {
    let currentData: any;
    this.data.map((data: Unit) => {
      if (data.id === id) {
        currentData = data;
      }
    })
    this.confirmDialog.confirm({
      message: `ຢືນຢັນການລົບຫົວໜ່ວຍ <b>${currentData.unitName}</b>`,
      accept: () => {
        const deletePrinterDto: UnitDto = {
          unitId: id,
          restaurantId: parseInt(<string>this.authService.getRestaurantId()),
          branchId: this.brchId,
        }
        this.unitService.delete(deletePrinterDto).subscribe({
          complete: () => {
            this.ngxSpinnerService.show();
            this.pMessageService.deleteSuccess();
            this.unitService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
              next: (data: Unit[]) => {
                this.data = data;
                this.unitService.dataSub$.next(data);
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
      const createPrinterDto: UnitDto = {
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        unitName: this.name?.value,
      }
      this.unitService.create(createPrinterDto).subscribe({
        complete: () => {
          this.modalDisplay = false;
          this.pMessageService.createSuccess();
          this.unitService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: Unit[]) => {
              this.data = data;
              this.unitService.dataSub$.next(data);
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
      const updatePrinterDto: UnitDto = {
        unitId: this.dataId,
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        unitName: this.name?.value,
      }
      this.unitService.update(updatePrinterDto).subscribe({
        complete: () => {
          this.modalEditDisplay = false;
          this.pMessageService.updateSuccess();
          this.unitService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: Unit[]) => {
              this.data = data;
              this.unitService.dataSub$.next(data);
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
