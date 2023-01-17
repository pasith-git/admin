import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, HostListener, OnChanges, OnInit, QueryList, SimpleChanges, TemplateRef, ViewChild, ViewChildren, ViewContainerRef, Renderer2, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { OrdersService } from 'src/app/services/orders.service';
import { Order, OrderCol, orderCol, OrderDetailCol, orderDetailCol, OrderDetail, exportOrderCol, MenuOrder, Menudetail, orderDetailColError } from 'src/app/models/order.model';
import { Table, TableCheckbox } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import * as xlsx from 'xlsx';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';
import { pPdfExport } from 'src/app/utilConstant/func';
import { RowInput } from 'jspdf-autotable';
import { ConfirmationService, ConfirmEventType, MenuItem } from 'primeng/api';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getOrdersDto, status } from 'src/app/dto/order.dto';
import { AuthService } from 'src/app/services/auth.service';
import { interval, Subject, takeUntil } from 'rxjs';
import { ResourcesService } from 'src/app/services/resources.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy {
  faTrash = faTrash;
  public data: Order[] = [];
  public initData: Order[] = [];
  public dataFilter: Order[] = [];
  public dataSelection: Order[] = [];
  public dataDetailSelection: OrderDetail[] = [];
  public col: OrderCol[] = orderCol;
  public extraCol: OrderDetailCol[];
  public totalT: number;
  public totalQ: number;
  public orderStatus = [
    { name: 'ລໍຖ້າ', code: 'pending' },
    { name: 'ສຳເລັດ', code: 'success' },
    { name: 'ຍົກເລີກ', code: 'cancel' },
  ];
  public tableStatus: string = 'pending';

  public tableExport: boolean;
  public paramId: string;
  public orderStatusSelected: string;
  public disableOption: boolean = true;
  public reasonValue: any = null;
  public filterPaymentType: any[];

  public todayDateInterVal = interval(1000);
  private onDestroy$ = new Subject<void>();
  public todayDate: any;
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDef: ChangeDetectorRef,
    private pMessage: PMsgServiceService,
    private conRef: ViewContainerRef,
    private ngxSpinnerService: NgxSpinnerService,
    private confirmDialog: ConfirmationService,
    private authService: AuthService,
    public rs: ResourcesService,
  ) {
  }
  @ViewChild('dt', { static: false }) dataTable: Table;

  ngOnInit(): void {
    this.todayDateInterVal.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: () => {
        this.todayDate = moment().format('L');
      }
    })
    this.extraCol = orderDetailCol;
    this.filterPaymentType = [
      { label: 'bank', value: 'bank' },
      { label: 'cash', value: 'cash' },
    ]
    this.ngxSpinnerService.show();
    this.paramId = this.route.snapshot.params['id'];
    this.orderService.getOrders({
      branchId: parseInt(this.paramId),
    }).subscribe({
      next: (data: Order[]) => {
        this.dataFilter = data;
        this.data = data;
        this.initData = data;
      },
      error: (data) => {
        if (data.error.message === 'ບໍ່ມີຂໍ້ມູນ') {
        } else {
        }
        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.disableOption = false;
        this.ngxSpinnerService.hide();
      }
    })
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  ngAfterViewInit(): void {

  }

  ngAfterContentInit(): void {
  }

  ngAfterViewChecked(): void {
    let countT = 0;
    let countQ = 0;
    this.dataTable.dataToRender.map((data: Order) => {
      countT += data.total;
      countQ += data.amount;
    })
    this.totalT = countT;
    this.totalQ = countQ;
    this.changeDef.detectChanges();
  }

  filterDate(e: Date[], dt: Table) {
    /* if (this.dataFilter) {
      if (e && e.length > 0) {
        const initDataTable = this.dataFilter;
        const startDate = moment(e[0]).startOf('day').unix();
        const endDate = moment(e[1]).startOf('day').unix();
        const filterDate = initDataTable.filter((data: Order) => {
          const date = moment(data.createdAt).startOf('day').unix();
          return date >= startDate && date <= endDate;
        })
        if (filterDate.length > 0) {
          this.data = filterDate;
        } else if (filterDate.length === 0) {
          this.pMessage.filterDateMessage();
          this.data = this.dataFilter;
        }
      } else {
        this.data = this.dataFilter;
      }
    } else {
      if (e && e.length > 0) {
        const initDataTable = this.initData;
        const startDate = moment(e[0]).startOf('day').unix();
        const endDate = moment(e[1]).startOf('day').unix();
        const filterDate = initDataTable.filter((data: Order) => {
          const date = moment(data.createdAt).startOf('day').unix();
          return date >= startDate && date <= endDate;
        })
        if (filterDate.length > 0) {
          this.data = filterDate;
        } else if (filterDate.length === 0) {
          this.pMessage.filterDateMessage();
          this.data = this.initData;
        }
      } else {
        this.data = this.initData;
      }
    } */

    if (e && e.length > 0) {
      this.ngxSpinnerService.show();
      const startDate = moment(e[0]).format('YYYY-MM-DD');
      const toDate = moment(e[1]).format('YYYY-MM-DD');
      this.orderService.getOrders({
        branchId: parseInt(this.paramId),
        status: this.tableStatus,
        startDate,
        toDate,
      }).subscribe({
        next: (data: Order[]) => {
          this.data = data;
        },
        error: (err) => {
          this.pMessage.filterDateMessage();
          this.ngxSpinnerService.hide();
        },
        complete: () => {
          this.disableOption = false;
          this.ngxSpinnerService.hide();
        }
      })
    }

  }

  resetTable() {
    this.dataTable.reset();
  }

  exportPdf() {
    return pPdfExport('pdfData', 'order');
  }

  exportExcel() {
    const tableHtml = this.conRef.element.nativeElement.getElementsByClassName('exportData')[0];
    const worksheet = xlsx.utils.table_to_sheet(tableHtml);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "reports-order");
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  reset(dp: BsDatepickerDirective) {

    if (this.data.length > 0) {
      if (this.dataFilter) {
        this.dataTable.clear();
        this.orderStatusSelected = '';
        if (typeof dp.bsValue !== undefined) {
          this.data = this.dataFilter;
          dp.bsValue = undefined;
        }
      } else {
        this.dataTable.clear();
        this.orderStatusSelected = '';
        if (typeof dp.bsValue !== undefined) {
          this.data = this.initData;
          dp.bsValue = undefined;
        }
      }
    }
  }

  odStatusSelect(statusName: status) {
    if (statusName !== this.tableStatus) {
      this.ngxSpinnerService.show();
      this.orderService.getOrders({
        branchId: parseInt(this.paramId),
        status: statusName,
      }).subscribe({
        next: (data: Order[]) => {
          if (statusName === 'pending') {
            this.tableStatus = 'pending';
            this.extraCol = orderDetailCol;
            this.data = data;
            this.dataFilter = data;
          } else if (statusName === 'success') {
            this.tableStatus = 'success';
            this.extraCol = orderDetailCol;
            this.data = data;
            this.dataFilter = data;
          } else {
            this.tableStatus = 'cancel';
            this.extraCol = orderDetailColError;
            this.data = data;
            this.dataFilter = data;
          }
        },
        error: (data) => {
          this.tableStatus = statusName;
          this.data = [];
          this.dataFilter = [];
          this.ngxSpinnerService.hide();
        },
        complete: () => {
          this.disableOption = false;
          this.ngxSpinnerService.hide();
        }
      })
    } else {
      return;
    }
  }

  deleteOrder({ id, billNumber, restaurantId, tableId }: Order) {
    this.confirmDialog.confirm({
      message: `ຕ້ອງການຍົກເລີກບິນ ${billNumber} ?`,
      accept: () => {
        if (this.reasonValue) {
          this.ngxSpinnerService.show();
          const dataSend = [
            {
              orderId: id,
              restaurantId: restaurantId,
              branchId: this.paramId,
              tableId: tableId,
              isStatus: "cancel",
              reason: this.reasonValue,
            }
          ]
          this.orderService.cancelOrder(dataSend).subscribe({
            next: () => {
              this.orderService.getOrders({
                branchId: parseInt(this.paramId),
              }).subscribe((data: Order[]) => {
                this.data = data;
              })
            },
            complete: () => {
              this.ngxSpinnerService.hide();
            }
          });
        } else {
          this.pMessage.reasonEmpty();
        }

      },
    });
  }

  deleleOrderDetail({ id, orderId, tableId, menuId, branchId, restaurantId, amount, menuName }: OrderDetail) {
    const orderToDeleteData = [{
      orderDetailId: id,
      orderId: orderId,
      tableId: tableId,
      menuId: menuId,
      branchId: branchId,
      restaurantId: restaurantId,
      amount: amount,
      reason: this.reasonValue
    }];
    this.confirmDialog.confirm({
      message: `ຕ້ອງການຍົກເລີກເມນູ ${menuName}`,
      accept: () => {
        if (this.reasonValue) {
          this.ngxSpinnerService.show();
          this.orderService.cancelOrderDetail(orderToDeleteData).subscribe({
            next: () => {
              this.orderService.getOrders({
                branchId: parseInt(this.paramId),
              }).subscribe((data: Order[]) => {
                this.data = data;
                this.dataTable.expandedRowKeys = { [orderId]: true };
              })
            },
            complete: () => {
              this.ngxSpinnerService.hide();
            }
          })
        } else {
          this.pMessage.reasonEmpty();
        }
      }
    })
  }

  deleteOrderDetailSelection() {
    if (this.dataDetailSelection.length > 0) {
      this.confirmDialog.confirm({
        message: `ຕ້ອງການຍົກເລີກລາຍການທີ່ເລືອກ ?`,
        accept: () => {

          if (this.reasonValue) {
            this.ngxSpinnerService.show();
            const dataSend = this.dataDetailSelection.map(({ id, orderId, tableId, branchId, menuId, restaurantId, amount }: OrderDetail) => {
              return {
                orderDetailId: id,
                orderId: orderId,
                tableId: tableId,
                menuId: menuId,
                branchId: branchId,
                restaurantId: restaurantId,
                amount: amount,
                reason: this.reasonValue,
              }
            })
            this.orderService.cancelOrderDetail(dataSend).subscribe({
              next: () => {
                this.orderService.getOrders({
                  branchId: parseInt(this.paramId),
                }).subscribe((data: Order[]) => {
                  this.data = data;
                  this.dataTable.expandedRowKeys = { [dataSend[0].orderId]: true };
                })
              },
              complete: () => {
                this.ngxSpinnerService.hide();
              }
            })

          } else {
            this.pMessage.reasonEmpty();
          }
        }
      })
    } else {
      this.pMessage.selectedFailed();
    }
  }

  deleteOrderSelection() {
    if (this.dataSelection.length > 0) {
      this.confirmDialog.confirm({
        message: `ຕ້ອງການຍົກເລີກລາຍການທີ່ເລືອກ ?`,
        accept: () => {
          if (this.reasonValue) {
            this.ngxSpinnerService.show();
            const dataSend = this.dataSelection.map(({ id, branchId, restaurantId, tableId }: Order) => {
              return {
                orderId: id,
                restaurantId: restaurantId,
                branchId: branchId,
                tableId: tableId,
                isStatus: "cancel",
                reason: this.reasonValue,
              }
            })
            this.orderService.cancelOrder(dataSend).subscribe({
              next: () => {
                this.orderService.getOrders({
                  branchId: parseInt(this.paramId),
                }).subscribe((data: Order[]) => {
                  this.data = data;
                })
              },
              complete: () => {
                this.ngxSpinnerService.hide();
              }
            });
          } else {
            this.pMessage.reasonEmpty();
          }
        }
      })
    } else {
      this.pMessage.selectedFailed();
    }
  }
  hideDialog(e: ConfirmEventType) {
    if (e === 0 || e === 1 || e === 2) {
      this.reasonValue = null;
    }
  }
}

