import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Table } from 'primeng/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import { OrderDetail, orderdetailCol, OrderDetailCol } from 'src/app/models/order-detail.model';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import * as FileSaver from 'file-saver';
import * as xlsx from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';
import { pPdfExport } from 'src/app/utilConstant/func';
import { ResourcesService } from 'src/app/services/resources.service';
import { interval, Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy {

  public data: OrderDetail[];
  public initData: OrderDetail[];
  public totalPrice: number;
  public totalAmount: number;
  public col: OrderDetailCol[] = orderdetailCol;
  public disableOption: boolean = true;
  public todayDateInterVal = interval(1000);
  private onDestroy$ = new Subject<void>();
  public todayDate: any;
  constructor(
    private dataService: OrderDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private pMessage: PMsgServiceService,
    private changeDef: ChangeDetectorRef,
    public rs: ResourcesService,
    private ngxSpinnerService: NgxSpinnerService
  ) {
  }
  @ViewChild('dt', { static: false }) dataTable: Table;

  ngOnInit(): void {
    this.todayDateInterVal.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: () => {
        this.todayDate = moment().format('L');
      }
    })
    this.ngxSpinnerService.show();
    this.route.params.subscribe(({ id }) => {
      this.dataService.getData(id).subscribe({
        next: (data: OrderDetail[]) => {
          this.initData = data;
          this.data = data;
        },
        error: (err) => {
          this.ngxSpinnerService.hide();
        },
        complete: () => {
          this.disableOption = false;
          this.ngxSpinnerService.hide();
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  exportPdf() {
    return pPdfExport('pdfData', 'order-detail');
  }

  exportExcel() {
    const tableHtml = document.getElementById('exportData');
    const worksheet = xlsx.utils.table_to_sheet(tableHtml);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "reports-order-detail");
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  ngAfterViewInit(): void {

  }

  ngAfterContentInit(): void {
  }

  ngAfterViewChecked(): void {
    let countPrice = 0;
    let countAmount = 0;
    this.dataTable.dataToRender.map((data: OrderDetail) => {
      countPrice += data.price;
      countAmount += data.amount;
    })
    this.totalPrice = countPrice;
    this.totalAmount = countAmount;
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
      this.route.params.subscribe(({ id }) => {
        this.dataService.getData(id, startDate, toDate).subscribe({
          next: (data: OrderDetail[]) => {
            this.data = data;
          },
          error: (err: any) => {
            this.pMessage.filterDateMessage();
            this.ngxSpinnerService.hide();
          },
          complete: () => {
            this.disableOption = false;
            this.ngxSpinnerService.hide();
          }
        })
      })

    }

  }

  showAllTableRows() {
    this.dataTable.rows = this.dataTable.value.length;
  }

  resetTable() {
  }

  numberCounter(length: number) {
    return Array(length);
  }

  reset() {
    this.dataTable.clear();
    this.data = this.initData;
  }
}
