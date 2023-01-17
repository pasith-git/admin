import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PrinterDto } from 'src/app/dto/printer.dto';
import { colPrinter, Printer } from 'src/app/models/printer.model';
import { AuthService } from 'src/app/services/auth.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { PrinterService } from 'src/app/services/printer.service';
import { ipAddressValidator, portValidator, stringValidator } from 'src/app/validators/globalValidators';
import { DynamicCrudComponent } from 'src/app/utilComponents/dynamic-crud/dynamic-crud.component';
import { UtilServiceService } from 'src/app/services/util-service.service';
@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.css']
})
export class PrinterComponent implements OnInit, OnDestroy, AfterViewInit {
  public disabled: boolean = true;
  public destroy$: Subject<boolean> = new Subject();
  public data$: Observable<Printer[]> = this.printerService.dataObs$;
  public data: Printer[];
  public col: any[];
  public items: MenuItem[]
  public modalDisplay: boolean = false;
  public modalEditDisplay: boolean = false;
  public form: FormGroup;
  public validatorsBox: boolean = false;
  public brchId: number;
  public dataId: number;
  public placementSelection: any[];
  public imagePath = 'assets/images/crud/printer.png';
  constructor(private printerService: PrinterService,
    private utilService: UtilServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private pMessageService: PMsgServiceService,
    private confirmDialog: ConfirmationService,
    private ngxSpinnerService: NgxSpinnerService) {
  }
  @ViewChild('dynamic') dpButton: DynamicCrudComponent;
  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.placementSelection = [
      { name: 'other', code: 'other' },
      { name: 'kitchen', code: 'kitchen' },
      { name: 'counter', code: 'counter' },
      { name: 'bar', code: 'bar' },
    ]
    this.brchId = this.route.snapshot.params['id'];
    this.form = this.fb.group({
      ipAddress: ['', [Validators.required, ipAddressValidator()]],
      port: ['', [Validators.required, portValidator()]],
      placement: ['', [Validators.required, stringValidator()]],
    })
    this.items = [
      {
        label: 'Update', icon: 'pi pi-refresh', command: () => { }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => { }
      },
    ];
    this.col = colPrinter;
    this.printerService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Printer[]) => {
        this.data = data;
        this.printerService.dataSub$.next(data);
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

  get ipAddress() {
    return this.form.get('ipAddress');
  }
  get port() {
    return this.form.get('port');
  }
  get placement() {
    return this.form.get('placement');
  }
  create() {
    this.ipAddress?.markAsDirty();
    this.port?.markAsDirty();
    this.placement?.markAsDirty();
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const createPrinterDto: PrinterDto = {
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        ipAddress: this.ipAddress?.value,
        portNumber: this.port?.value,
        placement: this.placement?.value,
      }
      this.printerService.create(createPrinterDto).subscribe({
        complete: () => {
          this.modalDisplay = false;
          this.pMessageService.createSuccess();
          this.printerService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: Printer[]) => {
              this.data = data;
              this.printerService.dataSub$.next(data);
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
    this.ipAddress?.markAsDirty();
    this.port?.markAsDirty();
    this.placement?.markAsDirty();
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const updatePrinterDto: PrinterDto = {
        printerId: this.dataId,
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        ipAddress: this.ipAddress?.value,
        portNumber: this.port?.value,
        placement: this.placement?.value,
      }
      this.printerService.update(updatePrinterDto).subscribe({
        complete: () => {
          this.modalEditDisplay = false;
          this.pMessageService.updateSuccess();
          this.printerService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: Printer[]) => {
              this.data = data;
              this.printerService.dataSub$.next(data);
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
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngAfterViewInit(): void {
  }
  onHide(e: boolean) {
    document.querySelector('body')!.style.overflowY = 'auto';
    this.modalDisplay = e;
    this.modalEditDisplay = e;
    this.form.reset();
  }

  dpEditEvent(obj: any) {

    this.data.map((data: Printer) => {
      if (data.id === obj.id) {
        this.dataId = data.id;
        this.form.setValue({
          ipAddress: data.ipAddress,
          port: data.portNumber,
          placement: data.placement,
        })
      }
    })
    this.modalEditDisplay = !this.modalEditDisplay;

  }
  dpRemoveEvent({ id }: any) {
    let currentData: any;
    this.data.map((data: Printer) => {
      if (data.id === id) {
        currentData = data;
      }
    })
    this.confirmDialog.confirm({
      message: `ຢືນຢັນການລົບໄອພີ <b>${currentData.ipAddress}</b>`,
      accept: () => {
        const deletePrinterDto: PrinterDto = {
          printerId: id,
          restaurantId: parseInt(<string>this.authService.getRestaurantId()),
          branchId: this.brchId,
        }
        this.printerService.delete(deletePrinterDto).subscribe({
          complete: () => {
            this.ngxSpinnerService.show();
            this.pMessageService.deleteSuccess();
            this.printerService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
              next: (data: Printer[]) => {
                this.data = data;
                this.printerService.dataSub$.next(data);
              },
              complete: () => {
                this.utilService.changeSubEvent();
                this.ngxSpinnerService.hide();
              }
            })
          }
        });
      },
    })
  }
}
