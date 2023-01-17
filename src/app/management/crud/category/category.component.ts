import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { stringValidator } from 'src/app/validators/globalValidators';
import { CategoryService } from 'src/app/services/category.service';
import { Category, colCategory } from 'src/app/models/category.model';
import { CategoryDto } from 'src/app/dto/category.dto';
import { PrinterService } from 'src/app/services/printer.service';
import { Printer } from 'src/app/models/printer.model';
import { UtilServiceService } from 'src/app/services/util-service.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public disabled: boolean = true;
  public destroy$: Subject<boolean> = new Subject();
  public data$: Observable<Category[]> = this.categoryService.dataObs$;
  public data: Category[];
  public col: any[];
  public items: MenuItem[]
  public modalDisplay: boolean = false;
  public modalEditDisplay: boolean = false;
  public form: FormGroup;
  public brchId: number;
  public dataId: number;
  public printerOptions: any[];
  public imagePath = 'assets/images/crud/grocery.png';
  constructor(private categoryService: CategoryService,
    private ngxSpinnerService: NgxSpinnerService,
    private utilService: UtilServiceService,
    private printerService: PrinterService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private confirmDialog: ConfirmationService,
    private authService: AuthService,
    private pMessageService: PMsgServiceService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.brchId = this.route.snapshot.params['id'];
    this.col = colCategory;
    this.form = this.fb.group({
      name: ['', [Validators.required, stringValidator()]],
      printer: ['', [Validators.required]],
    })
    this.printerService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Printer[]) => {
        const result = data.map((value: Printer) => {
          return { name: value.ipAddress, code: value.id };
        })
        this.printerOptions = result;
      }
    })
    this.categoryService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Category[]) => {
        this.data = data;
        this.categoryService.dataSub$.next(data);
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
  get printer() {
    return this.form.get('printer');
  }
  dpEditEvent(obj: any) {
    this.data.map((data: Category) => {
      if (data.id === obj.id) {
        this.dataId = data.id;
        this.form.setValue({
          name: data.name,
          printer: data.printerId,
        })
      }
    })
    this.modalEditDisplay = !this.modalEditDisplay;

  }
  dpRemoveEvent({ id }: any) {
    let currentData: any;
    this.data.map((data: Category) => {
      if (data.id === id) {
        currentData = data;
      }
    })
    this.confirmDialog.confirm({
      message: `ຢືນຢັນການລົບປະເພດ <b>${currentData.name}</b>`,
      accept: () => {
        const deleteDto: CategoryDto = {
          categoryId: id,
          restaurantId: parseInt(<string>this.authService.getRestaurantId()),
          branchId: this.brchId,
        }
        this.categoryService.delete(deleteDto).subscribe({
          complete: () => {
            this.ngxSpinnerService.show();
            this.pMessageService.deleteSuccess();
            this.categoryService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
              next: (data: Category[]) => {
                this.data = data;
                this.categoryService.dataSub$.next(data);
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
    this.printer?.markAsDirty();
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const createDto: CategoryDto = {
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        name: this.name?.value,
        printerId: this.printer?.value,
      }
      this.categoryService.create(createDto).subscribe({
        complete: () => {
          this.modalDisplay = false;
          this.pMessageService.createSuccess();
          this.categoryService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: Category[]) => {
              this.data = data;
              this.categoryService.dataSub$.next(data);
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
    this.printer?.markAsDirty();
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const updateDto: CategoryDto = {
        categoryId: this.dataId,
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        name: this.name?.value,
        printerId: this.printer?.value,
      }
      this.categoryService.update(updateDto).subscribe({
        complete: () => {
          this.modalEditDisplay = false;
          this.pMessageService.updateSuccess();
          this.categoryService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: Category[]) => {
              this.data = data;
              this.categoryService.dataSub$.next(data);
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
