"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrderDetailComponent = void 0;
var core_1 = require("@angular/core");
var order_detail_model_1 = require("src/app/models/order-detail.model");
var FileSaver = require("file-saver");
var xlsx = require("xlsx");
var func_1 = require("src/app/utilConstant/func");
var rxjs_1 = require("rxjs");
var moment = require("moment");
var OrderDetailComponent = /** @class */ (function () {
    function OrderDetailComponent(dataService, route, router, pMessage, changeDef, rs, ngxSpinnerService) {
        this.dataService = dataService;
        this.route = route;
        this.router = router;
        this.pMessage = pMessage;
        this.changeDef = changeDef;
        this.rs = rs;
        this.ngxSpinnerService = ngxSpinnerService;
        this.col = order_detail_model_1.orderdetailCol;
        this.disableOption = true;
        this.todayDateInterVal = rxjs_1.interval(1000);
        this.onDestroy$ = new rxjs_1.Subject();
    }
    OrderDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.todayDateInterVal.pipe(rxjs_1.takeUntil(this.onDestroy$)).subscribe({
            next: function () {
                _this.todayDate = moment().format('L');
            }
        });
        this.ngxSpinnerService.show();
        this.route.params.subscribe(function (_a) {
            var id = _a.id;
            _this.dataService.getData(id).subscribe({
                next: function (data) {
                    _this.data = data;
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
    OrderDetailComponent.prototype.ngOnDestroy = function () {
        this.onDestroy$.next();
    };
    OrderDetailComponent.prototype.exportPdf = function () {
        return func_1.pPdfExport('pdfData', 'order-detail');
    };
    OrderDetailComponent.prototype.exportExcel = function () {
        var tableHtml = document.getElementById('exportData');
        var worksheet = xlsx.utils.table_to_sheet(tableHtml);
        var workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        var excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "reports-order-detail");
    };
    OrderDetailComponent.prototype.saveAsExcelFile = function (buffer, fileName) {
        var EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        var EXCEL_EXTENSION = '.xlsx';
        var data = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    };
    OrderDetailComponent.prototype.ngAfterViewInit = function () {
    };
    OrderDetailComponent.prototype.ngAfterContentInit = function () {
    };
    OrderDetailComponent.prototype.ngAfterViewChecked = function () {
        var countPrice = 0;
        var countAmount = 0;
        this.dataTable.dataToRender.map(function (data) {
            countPrice += data.price;
            countAmount += data.amount;
        });
        this.totalPrice = countPrice;
        this.totalAmount = countAmount;
        this.changeDef.detectChanges();
    };
    OrderDetailComponent.prototype.filterDate = function (e, dt) {
    };
    OrderDetailComponent.prototype.showAllTableRows = function () {
        this.dataTable.rows = this.dataTable.value.length;
    };
    OrderDetailComponent.prototype.resetTable = function () {
        this.dataTable.reset();
    };
    OrderDetailComponent.prototype.numberCounter = function (length) {
        return Array(length);
    };
    OrderDetailComponent.prototype.reset = function () {
        this.dataTable.clear();
    };
    __decorate([
        core_1.ViewChild('dt', { static: false })
    ], OrderDetailComponent.prototype, "dataTable");
    OrderDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-order-detail',
            templateUrl: './order-detail.component.html',
            styleUrls: ['./order-detail.component.css']
        })
    ], OrderDetailComponent);
    return OrderDetailComponent;
}());
exports.OrderDetailComponent = OrderDetailComponent;
