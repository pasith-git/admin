"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StockInOutComponent = void 0;
var core_1 = require("@angular/core");
var index_util_1 = require("src/app/utilConstant/index.util");
var stock_in_out_model_1 = require("src/app/models/stock-in-out.model");
var moment = require("moment");
var xlsx = require("xlsx");
var FileSaver = require("file-saver");
var func_1 = require("src/app/utilConstant/func");
var rxjs_1 = require("rxjs");
var StockInOutComponent = /** @class */ (function () {
    function StockInOutComponent(stockService, route, router, changeDef, rs, ngxSpinnerService) {
        this.stockService = stockService;
        this.route = route;
        this.router = router;
        this.changeDef = changeDef;
        this.rs = rs;
        this.ngxSpinnerService = ngxSpinnerService;
        this.lawordStockInOut = index_util_1.laWords.stockReport.stockInOutReport;
        this.col = stock_in_out_model_1.stockinoutCol;
        this.disableOption = true;
        this.todayDateInterVal = rxjs_1.interval(1000);
        this.onDestroy$ = new rxjs_1.Subject();
    }
    StockInOutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.todayDateInterVal.pipe(rxjs_1.takeUntil(this.onDestroy$)).subscribe({
            next: function () {
                _this.todayDate = moment().format('L');
            }
        });
        this.ngxSpinnerService.show();
        this.route.params.subscribe(function (_a) {
            var id = _a.id;
            _this.stockService.getData(id).subscribe({
                next: function (data) {
                    _this.data = data;
                    _this.initData = data;
                },
                error: function () {
                    _this.ngxSpinnerService.hide();
                },
                complete: function () {
                    _this.disableOption = false;
                    _this.ngxSpinnerService.hide();
                }
            });
        });
    };
    StockInOutComponent.prototype.ngOnDestroy = function () {
        this.onDestroy$.next();
    };
    StockInOutComponent.prototype.ngAfterViewChecked = function () {
        var countQ = 0;
        var countQin = 0;
        var countQout = 0;
        this.dataTable.dataToRender.map(function (data) {
            countQ += data.amount;
            countQin += data.inAmount;
            countQout += data.usedAmount;
        });
        this.totalQ = countQ;
        this.totalQin = countQin;
        this.totalQout = countQout;
        this.changeDef.detectChanges();
    };
    StockInOutComponent.prototype.filterDate = function (e, dt) {
        var _this = this;
        if (e && e.length > 0) {
            var initDataTable = this.initData;
            var branchId = this.route.snapshot.params['id'];
            /*       const startDate = moment(e[0]).startOf('day').unix();
                  const endDate = moment(e[1]).startOf('day').unix(); */
            var startDate_1 = moment(e[0]).startOf('day').format('YYYY-MM-DD');
            var endDate = moment(e[1]).startOf('day').format('YYYY-MM-DD');
            this.ngxSpinnerService.show();
            this.stockService.getFilterDateData(branchId, startDate_1, endDate).subscribe({
                next: function (data) {
                    _this.data = data;
                    _this.StockinoutDate = moment(startDate_1).format('DD-MM-YYYY') + " - " + moment(startDate_1).format('DD-MM-YYYY');
                },
                error: function () {
                },
                complete: function () {
                    _this.ngxSpinnerService.hide();
                }
            });
        }
        else {
            this.data = this.initData;
        }
    };
    StockInOutComponent.prototype.exportPdf = function () {
        return func_1.pPdfExport('pdfData', 'stock-in-out');
    };
    StockInOutComponent.prototype.exportExcel = function () {
        var tableHtml = document.getElementById('exportData');
        var worksheet = xlsx.utils.table_to_sheet(tableHtml);
        var workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        var excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "reports-stock-in-out");
    };
    StockInOutComponent.prototype.saveAsExcelFile = function (buffer, fileName) {
        var EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        var EXCEL_EXTENSION = '.xlsx';
        var data = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    };
    StockInOutComponent.prototype.reset = function (dp) {
        this.dataTable.clear();
        if (typeof dp.bsValue !== undefined) {
            this.data = this.initData;
            dp.bsValue = undefined;
        }
    };
    __decorate([
        core_1.ViewChild('dt', { static: false })
    ], StockInOutComponent.prototype, "dataTable");
    __decorate([
        core_1.ViewChild('pdfData')
    ], StockInOutComponent.prototype, "pdfData");
    StockInOutComponent = __decorate([
        core_1.Component({
            selector: 'app-stock-in-out',
            templateUrl: './stock-in-out.component.html',
            styleUrls: ['./stock-in-out.component.css']
        })
    ], StockInOutComponent);
    return StockInOutComponent;
}());
exports.StockInOutComponent = StockInOutComponent;
