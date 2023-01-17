"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StockUnitComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var globalValidators_1 = require("src/app/validators/globalValidators");
var stock_unit_model_1 = require("src/app/models/stock-unit.model");
var StockUnitComponent = /** @class */ (function () {
    function StockUnitComponent(stockUnitService, ngxSpinnerService, route, fb, confirmDialog, authService, pMessageService) {
        this.stockUnitService = stockUnitService;
        this.ngxSpinnerService = ngxSpinnerService;
        this.route = route;
        this.fb = fb;
        this.confirmDialog = confirmDialog;
        this.authService = authService;
        this.pMessageService = pMessageService;
        this.disabled = true;
        this.destroy$ = new rxjs_1.Subject();
        this.data$ = this.stockUnitService.dataObs$;
        this.modalDisplay = false;
        this.modalEditDisplay = false;
        this.imagePath = 'assets/images/crud/boxes.png';
    }
    StockUnitComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngxSpinnerService.show();
        this.brchId = this.route.snapshot.params['id'];
        this.col = stock_unit_model_1.colStockUnit;
        this.form = this.fb.group({
            name: ['', [forms_1.Validators.required, globalValidators_1.stringValidator()]],
            netContent: ['', [globalValidators_1.numberValidator()]]
        });
        this.stockUnitService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                _this.data = data;
                _this.stockUnitService.dataSub$.next(data);
            },
            error: function () {
                _this.ngxSpinnerService.hide();
            },
            complete: function () {
                _this.ngxSpinnerService.hide();
                _this.disabled = false;
            }
        });
    };
    Object.defineProperty(StockUnitComponent.prototype, "name", {
        get: function () {
            return this.form.get('name');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StockUnitComponent.prototype, "netContent", {
        get: function () {
            return this.form.get('netContent');
        },
        enumerable: false,
        configurable: true
    });
    StockUnitComponent.prototype.dpEditEvent = function (obj) {
        var _this = this;
        this.data.map(function (data) {
            if (data.id === obj.id) {
                _this.dataId = data.id;
                _this.form.setValue({
                    name: data.name,
                    netContent: data.netContent
                });
            }
        });
        this.modalEditDisplay = !this.modalEditDisplay;
    };
    StockUnitComponent.prototype.dpRemoveEvent = function (_a) {
        var _this = this;
        var id = _a.id;
        var currentData;
        this.data.map(function (data) {
            if (data.id === id) {
                currentData = data;
            }
        });
        this.confirmDialog.confirm({
            message: "\u0EA2\u0EB7\u0E99\u0EA2\u0EB1\u0E99\u0E81\u0EB2\u0E99\u0EA5\u0EBB\u0E9A\u0EAA\u0EB0\u0E95\u0ECA\u0EAD\u0E81\u0EAB\u0EBB\u0EA7\u0EDC\u0EC8\u0EA7\u0E8D <b>" + currentData.name + "</b>",
            accept: function () {
                var deleteDto = {
                    stockunitId: id,
                    restaurantId: parseInt(_this.authService.getRestaurantId()),
                    branchId: _this.brchId
                };
                _this.stockUnitService["delete"](deleteDto).subscribe({
                    complete: function () {
                        _this.ngxSpinnerService.show();
                        _this.pMessageService.deleteSuccess();
                        _this.stockUnitService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                            next: function (data) {
                                _this.data = data;
                                _this.stockUnitService.dataSub$.next(data);
                            },
                            complete: function () {
                                _this.ngxSpinnerService.hide();
                            }
                        });
                    }
                });
            },
            reject: function () {
            }
        });
    };
    StockUnitComponent.prototype.onHide = function (e) {
        document.querySelector('body').style.overflowY = 'auto';
        this.modalDisplay = e;
        this.modalEditDisplay = e;
        this.form.reset();
    };
    StockUnitComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    StockUnitComponent.prototype.create = function () {
        var _this = this;
        var _a, _b, _c, _d;
        (_a = this.name) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.netContent) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        if (this.form.valid) {
            this.modalDisplay = false;
            var createDto = {
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                name: (_c = this.name) === null || _c === void 0 ? void 0 : _c.value,
                netContent: 0 || ((_d = this.netContent) === null || _d === void 0 ? void 0 : _d.value)
            };
            this.stockUnitService.create(createDto).subscribe({
                complete: function () {
                    _this.ngxSpinnerService.show();
                    _this.pMessageService.createSuccess();
                    _this.stockUnitService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.stockUnitService.dataSub$.next(data);
                        },
                        complete: function () {
                            _this.ngxSpinnerService.hide();
                        }
                    });
                },
                error: function () {
                    _this.pMessageService.dataDuplicate();
                }
            });
        }
    };
    StockUnitComponent.prototype.update = function () {
        var _this = this;
        var _a, _b, _c, _d;
        (_a = this.name) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.netContent) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var updateDto = {
                stockunitId: this.dataId,
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                name: (_c = this.name) === null || _c === void 0 ? void 0 : _c.value,
                netContent: 0 || ((_d = this.netContent) === null || _d === void 0 ? void 0 : _d.value)
            };
            this.stockUnitService.update(updateDto).subscribe({
                complete: function () {
                    _this.modalEditDisplay = false;
                    _this.pMessageService.updateSuccess();
                    _this.stockUnitService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.stockUnitService.dataSub$.next(data);
                        },
                        complete: function () {
                            _this.ngxSpinnerService.hide();
                        }
                    });
                },
                error: function () {
                    _this.pMessageService.dataDuplicate();
                }
            });
        }
    };
    StockUnitComponent = __decorate([
        core_1.Component({
            selector: 'app-stock-unit',
            templateUrl: './stock-unit.component.html',
            styleUrls: ['./stock-unit.component.css']
        })
    ], StockUnitComponent);
    return StockUnitComponent;
}());
exports.StockUnitComponent = StockUnitComponent;
