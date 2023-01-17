"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrderComponent = void 0;
var core_1 = require("@angular/core");
var order_model_1 = require("src/app/models/order.model");
var moment = require("moment");
var xlsx = require("xlsx");
var FileSaver = require("file-saver");
var func_1 = require("src/app/utilConstant/func");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var rxjs_1 = require("rxjs");
var OrderComponent = /** @class */ (function () {
    function OrderComponent(orderService, route, router, changeDef, pMessage, conRef, ngxSpinnerService, confirmDialog, authService, rs) {
        this.orderService = orderService;
        this.route = route;
        this.router = router;
        this.changeDef = changeDef;
        this.pMessage = pMessage;
        this.conRef = conRef;
        this.ngxSpinnerService = ngxSpinnerService;
        this.confirmDialog = confirmDialog;
        this.authService = authService;
        this.rs = rs;
        this.faTrash = free_solid_svg_icons_1.faTrash;
        this.data = [];
        this.initData = [];
        this.dataFilter = [];
        this.dataSelection = [];
        this.dataDetailSelection = [];
        this.col = order_model_1.orderCol;
        this.orderStatus = [
            { name: 'ລໍຖ້າ', code: 'pending' },
            { name: 'ສຳເລັດ', code: 'success' },
            { name: 'ຍົກເລີກ', code: 'cancel' },
        ];
        this.tableStatus = 'pending';
        this.disableOption = true;
        this.reasonValue = null;
        this.todayDateInterVal = rxjs_1.interval(1000);
        this.onDestroy$ = new rxjs_1.Subject();
    }
    OrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.todayDateInterVal.pipe(rxjs_1.takeUntil(this.onDestroy$)).subscribe({
            next: function () {
                _this.todayDate = moment().format('L');
            }
        });
        this.extraCol = order_model_1.orderDetailCol;
        this.filterPaymentType = [
            { label: 'bank', value: 'bank' },
            { label: 'cash', value: 'cash' },
        ];
        this.ngxSpinnerService.show();
        this.paramId = this.route.snapshot.params['id'];
        this.orderService.getOrders({
            branchId: parseInt(this.paramId)
        }).subscribe({
            next: function (data) {
                _this.dataFilter = data;
                _this.data = data;
                _this.initData = data;
            },
            error: function (data) {
                if (data.error.message === 'ບໍ່ມີຂໍ້ມູນ') {
                }
                else {
                }
                _this.ngxSpinnerService.hide();
            },
            complete: function () {
                _this.disableOption = false;
                _this.ngxSpinnerService.hide();
            }
        });
    };
    OrderComponent.prototype.ngOnDestroy = function () {
        this.onDestroy$.next();
    };
    OrderComponent.prototype.ngAfterViewInit = function () {
    };
    OrderComponent.prototype.ngAfterContentInit = function () {
    };
    OrderComponent.prototype.ngAfterViewChecked = function () {
        var countT = 0;
        var countQ = 0;
        this.dataTable.dataToRender.map(function (data) {
            countT += data.total;
            countQ += data.amount;
        });
        this.totalT = countT;
        this.totalQ = countQ;
        this.changeDef.detectChanges();
    };
    OrderComponent.prototype.filterDate = function (e, dt) {
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
        var _this = this;
        if (e && e.length > 0) {
            this.ngxSpinnerService.show();
            var startDate = moment(e[0]).format('YYYY-MM-DD');
            var toDate = moment(e[1]).format('YYYY-MM-DD');
            this.orderService.getOrders({
                branchId: parseInt(this.paramId),
                status: this.tableStatus,
                startDate: startDate,
                toDate: toDate
            }).subscribe({
                next: function (data) {
                    _this.data = data;
                },
                error: function () {
                    _this.pMessage.filterDateMessage();
                    _this.ngxSpinnerService.hide();
                },
                complete: function () {
                    _this.disableOption = false;
                    _this.ngxSpinnerService.hide();
                }
            });
        }
    };
    OrderComponent.prototype.resetTable = function () {
        this.dataTable.reset();
    };
    OrderComponent.prototype.exportPdf = function () {
        return func_1.pPdfExport('pdfData', 'order');
    };
    OrderComponent.prototype.exportExcel = function () {
        var tableHtml = this.conRef.element.nativeElement.getElementsByClassName('exportData')[0];
        var worksheet = xlsx.utils.table_to_sheet(tableHtml);
        var workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        var excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "reports-order");
    };
    OrderComponent.prototype.saveAsExcelFile = function (buffer, fileName) {
        var EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        var EXCEL_EXTENSION = '.xlsx';
        var data = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    };
    OrderComponent.prototype.reset = function (dp) {
        if (this.data.length > 0) {
            if (this.dataFilter) {
                this.dataTable.clear();
                this.orderStatusSelected = '';
                if (typeof dp.bsValue !== undefined) {
                    this.data = this.dataFilter;
                    dp.bsValue = undefined;
                }
            }
            else {
                this.dataTable.clear();
                this.orderStatusSelected = '';
                if (typeof dp.bsValue !== undefined) {
                    this.data = this.initData;
                    dp.bsValue = undefined;
                }
            }
        }
    };
    OrderComponent.prototype.odStatusSelect = function (statusName) {
        var _this = this;
        if (statusName !== this.tableStatus) {
            this.ngxSpinnerService.show();
            this.orderService.getOrders({
                branchId: parseInt(this.paramId),
                status: statusName
            }).subscribe({
                next: function (data) {
                    if (statusName === 'pending') {
                        _this.tableStatus = 'pending';
                        _this.extraCol = order_model_1.orderDetailCol;
                        _this.data = data;
                        _this.dataFilter = data;
                    }
                    else if (statusName === 'success') {
                        _this.tableStatus = 'success';
                        _this.extraCol = order_model_1.orderDetailCol;
                        _this.data = data;
                        _this.dataFilter = data;
                    }
                    else {
                        _this.tableStatus = 'error';
                        _this.extraCol = order_model_1.orderDetailColError;
                        _this.data = data;
                        _this.dataFilter = data;
                    }
                },
                error: function (data) {
                    _this.pMessage.nonePendingData();
                    _this.ngxSpinnerService.hide();
                },
                complete: function () {
                    _this.disableOption = false;
                    _this.ngxSpinnerService.hide();
                }
            });
        }
        else {
            return;
        }
    };
    OrderComponent.prototype.deleteOrder = function (_a) {
        var _this = this;
        var id = _a.id, billNumber = _a.billNumber, restaurantId = _a.restaurantId, tableId = _a.tableId;
        this.confirmDialog.confirm({
            message: "\u0E95\u0EC9\u0EAD\u0E87\u0E81\u0EB2\u0E99\u0E8D\u0EBB\u0E81\u0EC0\u0EA5\u0EB5\u0E81\u0E9A\u0EB4\u0E99 " + billNumber + " ?",
            accept: function () {
                if (_this.reasonValue) {
                    _this.ngxSpinnerService.show();
                    var dataSend = [
                        {
                            orderId: id,
                            restaurantId: restaurantId,
                            branchId: _this.paramId,
                            tableId: tableId,
                            isStatus: "cancel",
                            reason: _this.reasonValue
                        }
                    ];
                    _this.orderService.cancelOrder(dataSend).subscribe({
                        next: function () {
                            _this.orderService.getOrders({
                                branchId: parseInt(_this.paramId)
                            }).subscribe(function (data) {
                                _this.data = data;
                            });
                        },
                        complete: function () {
                            _this.ngxSpinnerService.hide();
                        }
                    });
                }
                else {
                    _this.pMessage.reasonEmpty();
                }
            }
        });
    };
    OrderComponent.prototype.deleleOrderDetail = function (_a) {
        var _this = this;
        var id = _a.id, orderId = _a.orderId, tableId = _a.tableId, menuId = _a.menuId, branchId = _a.branchId, restaurantId = _a.restaurantId, amount = _a.amount, menuName = _a.menuName;
        var orderToDeleteData = [{
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
            message: "\u0E95\u0EC9\u0EAD\u0E87\u0E81\u0EB2\u0E99\u0E8D\u0EBB\u0E81\u0EC0\u0EA5\u0EB5\u0E81\u0EC0\u0EA1\u0E99\u0EB9 " + menuName,
            accept: function () {
                if (_this.reasonValue) {
                    _this.ngxSpinnerService.show();
                    _this.orderService.cancelOrderDetail(orderToDeleteData).subscribe({
                        next: function () {
                            _this.orderService.getOrders({
                                branchId: parseInt(_this.paramId)
                            }).subscribe(function (data) {
                                var _a;
                                _this.data = data;
                                _this.dataTable.expandedRowKeys = (_a = {}, _a[orderId] = true, _a);
                            });
                        },
                        complete: function () {
                            _this.ngxSpinnerService.hide();
                        }
                    });
                }
                else {
                    _this.pMessage.reasonEmpty();
                }
            }
        });
    };
    OrderComponent.prototype.deleteOrderDetailSelection = function () {
        var _this = this;
        if (this.dataDetailSelection.length > 0) {
            this.confirmDialog.confirm({
                message: "\u0E95\u0EC9\u0EAD\u0E87\u0E81\u0EB2\u0E99\u0E8D\u0EBB\u0E81\u0EC0\u0EA5\u0EB5\u0E81\u0EA5\u0EB2\u0E8D\u0E81\u0EB2\u0E99\u0E97\u0EB5\u0EC8\u0EC0\u0EA5\u0EB7\u0EAD\u0E81 ?",
                accept: function () {
                    if (_this.reasonValue) {
                        _this.ngxSpinnerService.show();
                        var dataSend_1 = _this.dataDetailSelection.map(function (_a) {
                            var id = _a.id, orderId = _a.orderId, tableId = _a.tableId, branchId = _a.branchId, menuId = _a.menuId, restaurantId = _a.restaurantId, amount = _a.amount;
                            return {
                                orderDetailId: id,
                                orderId: orderId,
                                tableId: tableId,
                                menuId: menuId,
                                branchId: branchId,
                                restaurantId: restaurantId,
                                amount: amount,
                                reason: _this.reasonValue
                            };
                        });
                        _this.orderService.cancelOrderDetail(dataSend_1).subscribe({
                            next: function () {
                                _this.orderService.getOrders({
                                    branchId: parseInt(_this.paramId)
                                }).subscribe(function (data) {
                                    var _a;
                                    _this.data = data;
                                    _this.dataTable.expandedRowKeys = (_a = {}, _a[dataSend_1[0].orderId] = true, _a);
                                });
                            },
                            complete: function () {
                                _this.ngxSpinnerService.hide();
                            }
                        });
                    }
                    else {
                        _this.pMessage.reasonEmpty();
                    }
                }
            });
        }
        else {
            this.pMessage.selectedFailed();
        }
    };
    OrderComponent.prototype.deleteOrderSelection = function () {
        var _this = this;
        if (this.dataSelection.length > 0) {
            this.confirmDialog.confirm({
                message: "\u0E95\u0EC9\u0EAD\u0E87\u0E81\u0EB2\u0E99\u0E8D\u0EBB\u0E81\u0EC0\u0EA5\u0EB5\u0E81\u0EA5\u0EB2\u0E8D\u0E81\u0EB2\u0E99\u0E97\u0EB5\u0EC8\u0EC0\u0EA5\u0EB7\u0EAD\u0E81 ?",
                accept: function () {
                    if (_this.reasonValue) {
                        _this.ngxSpinnerService.show();
                        var dataSend = _this.dataSelection.map(function (_a) {
                            var id = _a.id, branchId = _a.branchId, restaurantId = _a.restaurantId, tableId = _a.tableId;
                            return {
                                orderId: id,
                                restaurantId: restaurantId,
                                branchId: branchId,
                                tableId: tableId,
                                isStatus: "cancel",
                                reason: _this.reasonValue
                            };
                        });
                        _this.orderService.cancelOrder(dataSend).subscribe({
                            next: function () {
                                _this.orderService.getOrders({
                                    branchId: parseInt(_this.paramId)
                                }).subscribe(function (data) {
                                    _this.data = data;
                                });
                            },
                            complete: function () {
                                _this.ngxSpinnerService.hide();
                            }
                        });
                    }
                    else {
                        _this.pMessage.reasonEmpty();
                    }
                }
            });
        }
        else {
            this.pMessage.selectedFailed();
        }
    };
    OrderComponent.prototype.hideDialog = function (e) {
        if (e === 0 || e === 1 || e === 2) {
            this.reasonValue = null;
        }
    };
    __decorate([
        core_1.ViewChild('dt', { static: false })
    ], OrderComponent.prototype, "dataTable");
    OrderComponent = __decorate([
        core_1.Component({
            selector: 'app-order',
            templateUrl: './order.component.html',
            styleUrls: ['./order.component.css']
        })
    ], OrderComponent);
    return OrderComponent;
}());
exports.OrderComponent = OrderComponent;
