"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StockOutComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var stock_out_model_1 = require("src/app/models/stock-out.model");
var StockOutComponent = /** @class */ (function () {
    function StockOutComponent(stockOutService, ngxSpinnerService, productService, stockUnitService, route, fb, confirmDialog, authService, pMessageService) {
        this.stockOutService = stockOutService;
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
        this.data$ = this.stockOutService.dataObs$;
        this.modalDisplay = false;
        this.modalEditDisplay = false;
        this.imagePath = 'assets/images/crud/out-of-stock.png';
    }
    Object.defineProperty(StockOutComponent.prototype, "amount", {
        get: function () {
            return this.form.get('amount');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StockOutComponent.prototype, "reason", {
        get: function () {
            return this.form.get('reason');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StockOutComponent.prototype, "stockUnit", {
        get: function () {
            return this.form.get('stockUnit');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StockOutComponent.prototype, "product", {
        get: function () {
            return this.form.get('product');
        },
        enumerable: false,
        configurable: true
    });
    StockOutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngxSpinnerService.show();
        this.brchId = this.route.snapshot.params['id'];
        this.col = stock_out_model_1.stockoutcol;
        this.form = this.fb.group({
            product: ['', [forms_1.Validators.required]],
            stockUnit: ['', [forms_1.Validators.required]],
            amount: ['', [forms_1.Validators.required, forms_1.Validators.min(1)]],
            reason: ['', [forms_1.Validators.required]]
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
        this.stockOutService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                _this.data = data;
                _this.stockOutService.dataSub$.next(data);
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
    StockOutComponent.prototype.dpEditEvent = function (obj) {
        var _this = this;
        this.data.map(function (data) {
            if (data.id === obj.id) {
                _this.dataId = data.id;
                _this.form.setValue({
                    amount: data.amount,
                    stockUnit: data.stockUnitId,
                    product: data.productId,
                    reason: data.reason
                });
            }
        });
        this.modalEditDisplay = !this.modalEditDisplay;
    };
    StockOutComponent.prototype.dpRemoveEvent = function (_a) {
        var _this = this;
        var id = _a.id;
        var currentData;
        this.data.map(function (data) {
            if (data.id === id) {
                currentData = data;
            }
        });
        this.confirmDialog.confirm({
            message: "\u0EA2\u0EB7\u0E99\u0EA2\u0EB1\u0E99\u0E81\u0EB2\u0E99\u0EA5\u0EBB\u0E9A\u0E82\u0ECD\u0EC9\u0EA1\u0EB9\u0E99\u0E99\u0EB3\u0EAA\u0EB4\u0E99\u0E84\u0EC9\u0EB2\u0EAD\u0EAD\u0E81 <b>" + currentData.productName + "</b>",
            accept: function () {
                var deleteDto = {
                    stockOutId: id,
                    restaurantId: parseInt(_this.authService.getRestaurantId()),
                    branchId: _this.brchId,
                    productId: currentData.productId,
                    stockUnitId: currentData.stockUnitId
                };
                _this.stockOutService["delete"](deleteDto).subscribe({
                    complete: function () {
                        _this.ngxSpinnerService.show();
                        _this.pMessageService.deleteSuccess();
                        _this.stockOutService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                            next: function (data) {
                                _this.data = data;
                                _this.stockOutService.dataSub$.next(data);
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
    StockOutComponent.prototype.onHide = function (e) {
        document.querySelector('body').style.overflowY = 'auto';
        this.modalDisplay = e;
        this.modalEditDisplay = e;
        this.form.reset();
    };
    StockOutComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    StockOutComponent.prototype.create = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_a = this.amount) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.reason) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        (_c = this.product) === null || _c === void 0 ? void 0 : _c.markAsDirty();
        (_d = this.stockUnit) === null || _d === void 0 ? void 0 : _d.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var createDto = {
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                amount: (_e = this.amount) === null || _e === void 0 ? void 0 : _e.value,
                stockUnitId: (_f = this.stockUnit) === null || _f === void 0 ? void 0 : _f.value,
                productId: (_g = this.product) === null || _g === void 0 ? void 0 : _g.value,
                reason: (_h = this.reason) === null || _h === void 0 ? void 0 : _h.value
            };
            this.stockOutService.create(createDto).subscribe({
                complete: function () {
                    _this.modalDisplay = false;
                    _this.pMessageService.createSuccess();
                    _this.stockOutService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.stockOutService.dataSub$.next(data);
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
    StockOutComponent.prototype.update = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_a = this.amount) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.reason) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        (_c = this.product) === null || _c === void 0 ? void 0 : _c.markAsDirty();
        (_d = this.stockUnit) === null || _d === void 0 ? void 0 : _d.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var updateDto = {
                stockOutId: this.dataId,
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                amount: (_e = this.amount) === null || _e === void 0 ? void 0 : _e.value,
                productId: (_f = this.product) === null || _f === void 0 ? void 0 : _f.value,
                stockUnitId: (_g = this.stockUnit) === null || _g === void 0 ? void 0 : _g.value,
                reason: (_h = this.reason) === null || _h === void 0 ? void 0 : _h.value
            };
            this.stockOutService.update(updateDto).subscribe({
                complete: function () {
                    _this.modalEditDisplay = false;
                    _this.pMessageService.updateSuccess();
                    _this.stockOutService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.stockOutService.dataSub$.next(data);
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
    StockOutComponent = __decorate([
        core_1.Component({
            selector: 'app-stock-in',
            templateUrl: './stock-out.component.html',
            styleUrls: ['./stock-out.component.css']
        })
    ], StockOutComponent);
    return StockOutComponent;
}());
exports.StockOutComponent = StockOutComponent;
