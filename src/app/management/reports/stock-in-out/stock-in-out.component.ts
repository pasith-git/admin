import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Table } from 'primeng/table';
import { laWords } from 'src/app/utilConstant/index.util';
import { ActivatedRoute, Router } from '@angular/router';
import { StockInOutService } from 'src/app/services/stock-in-out.service';
import { exportStockinoutCOl, Stockinout, StockinoutCol, stockinoutCol } from 'src/app/models/stock-in-out.model';
import * as moment from 'moment';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import * as xlsx from 'xlsx';
import * as FileSaver from 'file-saver';
import { pPdfExport } from 'src/app/utilConstant/func';
import { ResourcesService } from 'src/app/services/resources.service';
import { interval, Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-stock-in-out',
  templateUrl: './stock-in-out.component.html',
  styleUrls: ['./stock-in-out.component.css']
})
export class StockInOutComponent implements OnInit, AfterViewChecked, OnDestroy {
  public lawordStockInOut = laWords.stockReport.stockInOutReport;

  public data: Stockinout[];
  public initData: Stockinout[];
  public col: StockinoutCol[] = stockinoutCol;
  public totalQ: number;
  public totalQin: number;
  public totalQout: number;
  public StockinoutDate: any;
  public disableOption: boolean = true;
  public todayDateInterVal = interval(1000);
  private onDestroy$ = new Subject<void>();
  public todayDate: any;
  constructor(private stockService: StockInOutService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDef: ChangeDetectorRef,
    public rs: ResourcesService,
    private ngxSpinnerService: NgxSpinnerService) {
  }
  @ViewChild('dt', { static: false }) dataTable: Table;
  @ViewChild('pdfData') pdfData: any;
  ngOnInit(): void {
    this.todayDateInterVal.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: () => {
        this.todayDate = moment().format('L');
      }
    })
    this.ngxSpinnerService.show();
    this.route.params.subscribe(({ id }) => {
      this.stockService.getData(id).subscribe({
        next: (data: Stockinout[]) => {
          this.data = data;
          this.initData = data;
        },
        error: () => {
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
  ngAfterViewChecked(): void {
    let countQ = 0;
    let countQin = 0;
    let countQout = 0;
    this.dataTable.dataToRender.map((data: Stockinout) => {
      countQ += data.amount;
      countQin += data.inAmount;
      countQout += data.usedAmount;
    })
    this.totalQ = countQ;
    this.totalQin = countQin;
    this.totalQout = countQout;
    this.changeDef.detectChanges();
  }
  filterDate(e: Date[], dt: Table) {
    if (e && e.length > 0) {
      const initDataTable = this.initData;
      const branchId = this.route.snapshot.params['id'];
      /*       const startDate = moment(e[0]).startOf('day').unix();
            const endDate = moment(e[1]).startOf('day').unix(); */
      const startDate = moment(e[0]).startOf('day').format('YYYY-MM-DD');
      const endDate = moment(e[1]).startOf('day').format('YYYY-MM-DD');
      this.ngxSpinnerService.show();
      this.stockService.getFilterDateData(branchId, startDate, endDate).subscribe({
        next: (data: Stockinout[]) => {
          this.data = data;
          this.StockinoutDate = `${moment(startDate).format('DD-MM-YYYY')} - ${moment(startDate).format('DD-MM-YYYY')}`;
        },
        error: () => {
        },
        complete: () => {
          this.ngxSpinnerService.hide();
        }
      })
    } else {
      this.data = this.initData;
    }

  }
  exportPdf() {
    return pPdfExport('pdfData', 'stock-in-out');
  }

  exportExcel() {
    const tableHtml = document.getElementById('exportData');
    const worksheet = xlsx.utils.table_to_sheet(tableHtml);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "reports-stock-in-out");
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
    this.dataTable.clear();
    if (typeof dp.bsValue !== undefined) {
      this.data = this.initData;
      dp.bsValue = undefined;
    }
  }
}
