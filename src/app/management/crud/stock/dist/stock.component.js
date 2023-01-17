"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StockComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var stock_model_1 = require("src/app/models/stock.model");
var StockComponent = /** @class */ (function () {
    function StockComponent(stockService, ngxSpinnerService, productService, stockUnitService, route, fb, confirmDialog, authService, pMessageService) {
        this.stockService = stockService;
        this.ngxSpinnerService = ngxSpinnerService;
        this.productService = productService;
        this.stockUnitService = stockUnitService;
        this.route = route;
        this.fb = fb;
        this.confirmDialog = confirmDialog;
        this.authService = authService;
        this.pMessageService = pMessageService;
        this.disabled = true;
        this.destroy$ = new rxjs_1.Subject();
        this.data$ = this.stockService.dataObs$;
        this.modalDisplay = false;
        this.modalEditDisplay = false;
        this.imagePath = 'assets/images/crud/stock.png';
    }
    Object.defineProperty(StockComponent.prototype, "amount", {
        get: function () {
            return this.form.get('amount');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StockComponent.prototype, "stockUnit", {
        get: function () {
            return this.form.get('stockUnit');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StockComponent.prototype, "product", {
        get: function () {
            return this.form.get('product');
        },
        enumerable: false,
        configurable: true
    });
    StockComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngxSpinnerService.show();
        this.brchId = this.route.snapshot.params['id'];
        this.col = stock_model_1.colStock;
        this.form = this.fb.group({
            amount: ['', [forms_1.Validators.required, forms_1.Validators.min(1)]],
            stockUnit: ['', [forms_1.Validators.required]],
            product: ['', [forms_1.Validators.required]]
        });
        this.productService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                var result = data.map(function (value) {
                    return { name: value.productName, code: value.id };
                });
                _this.productOptions = result;
            }
        });
        this.stockUnitService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                var result = data.map(function (value) {
                    return { name: value.name, code: value.id };
                });
                _this.stockUnitOptions = result;
            }
        });
        this.stockService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                _this.data = data;
                _this.stockService.dataSub$.next(data);
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
    StockComponent.prototype.dpEditEvent = function (obj) {
        var _this = this;
        this.data.map(function (data) {
            if (data.id === obj.id) {
                _this.dataId = data.id;
                _this.form.setValue({
                    amount: data.amount,
                    stockUnit: data.stockUnitId,
                    product: data.productId
                });
            }
        });
        this.modalEditDisplay = !this.modalEditDisplay;
    };
    StockComponent.prototype.dpRemoveEvent = function (_a) {
        var _this = this;
        var id = _a.id;
        var currentData;
        this.data.map(function (data) {
            if (data.id === id) {
                currentData = data;
            }
        });
        this.confirmDialog.confirm({
            message: "\u0EA2\u0EB7\u0E99\u0EA2\u0EB1\u0E99\u0E81\u0EB2\u0E99\u0EA5\u0EBB\u0E9A\u0EAA\u0EB0\u0E95\u0ECA\u0EAD\u0E81 <b>" + currentData.productName + "</b>",
            accept: function () {
                var deleteDto = {
                    stockId: id,
                    restaurantId: parseInt(_this.authService.getRestaurantId()),
                    branchId: _this.brchId
                };
                _this.stockService["delete"](deleteDto).subscribe({
                    complete: function () {
                        _this.ngxSpinnerService.show();
                        _this.pMessageService.deleteSuccess();
                        _this.stockService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                            next: function (data) {
                                _this.data = data;
                                _this.stockService.dataSub$.next(data);
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
    StockComponent.prototype.onHide = function (e) {
        document.querySelector('body').style.overflowY = 'auto';
        this.modalDisplay = e;
        this.modalEditDisplay = e;
        this.form.reset();
    };
    StockComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    StockComponent.prototype.create = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        (_a = this.amount) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.stockUnit) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        (_c = this.product) === null || _c === void 0 ? void 0 : _c.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var createDto = {
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                amount: (_d = this.amount) === null || _d === void 0 ? void 0 : _d.value,
                stockId: (_e = this.stockUnit) === null || _e === void 0 ? void 0 : _e.value,
                productId: (_f = this.product) === null || _f === void 0 ? void 0 : _f.value
            };
            this.stockService.create(createDto).subscribe({
                complete: function () {
                    _this.modalDisplay = false;
                    _this.pMessageService.createSuccess();
                    _this.stockService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.stockService.dataSub$.next(data);
                        },
                        complete: function () {
                            _this.ngxSpinnerService.hide();
                        }
                    });
                },
                error: function () {
                    _this.ngxSpinnerService.hide();
                    _this.pMessageService.dataDuplicate();
                }
            });
        }
    };
    StockComponent.prototype.update = function () {
        var _this = this;
        var _a, _b, _c;
        this.form.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var updateDto = {
                stockId: this.dataId,
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                amount: (_a = this.amount) === null || _a === void 0 ? void 0 : _a.value,
                productId: (_b = this.product) === null || _b === void 0 ? void 0 : _b.value,
                stockUnitId: (_c = this.stockUnit) === null || _c === void 0 ? void 0 : _c.value
            };
            this.stockService.update(updateDto).subscribe({
                complete: function () {
                    _this.modalEditDisplay = false;
                    _this.pMessageService.updateSuccess();
                    _this.stockService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.stockService.dataSub$.next(data);
                        },
                        complete: function () {
                            _this.ngxSpinnerService.hide();
                        }
                    });
                },
                error: function () {
                    _this.ngxSpinnerService.hide();
                    _this.pMessageService.dataDuplicate();
                }
            });
        }
    };
    StockComponent = __decorate([
        core_1.Component({
            selector: 'app-stock',
            templateUrl: './stock.component.html',
            styleUrls: ['./stock.component.css']
        })
    ], StockComponent);
    return StockComponent;
}());
exports.StockComponent = StockComponent;
