"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var globalValidators_1 = require("src/app/validators/globalValidators");
var product_model_1 = require("src/app/models/product.model");
var ProductComponent = /** @class */ (function () {
    function ProductComponent(productService, ngxSpinnerService, productTypeService, stockUnitService, route, fb, confirmDialog, authService, pMessageService) {
        this.productService = productService;
        this.ngxSpinnerService = ngxSpinnerService;
        this.productTypeService = productTypeService;
        this.stockUnitService = stockUnitService;
        this.route = route;
        this.fb = fb;
        this.confirmDialog = confirmDialog;
        this.authService = authService;
        this.pMessageService = pMessageService;
        this.disabled = true;
        this.destroy$ = new rxjs_1.Subject();
        this.data$ = this.productService.dataObs$;
        this.modalDisplay = false;
        this.modalEditDisplay = false;
        this.imagePath = 'assets/images/crud/supplies.png';
    }
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngxSpinnerService.show();
        this.brchId = this.route.snapshot.params['id'];
        this.col = product_model_1.colProduct;
        this.form = this.fb.group({
            name: ['', [forms_1.Validators.required, globalValidators_1.stringValidator()]],
            type: ['', [forms_1.Validators.required]],
            unit: ['', [forms_1.Validators.required]]
        });
        this.productTypeService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                var result = data.map(function (value) {
                    return { name: value.name, code: value.id };
                });
                _this.productTypeOptions = result;
            }
        });
        this.stockUnitService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                var result = data.map(function (value) {
                    return { name: value.name, code: value.id };
                });
                _this.unitOptions = result;
            }
        });
        this.productService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                _this.data = data;
                _this.productService.dataSub$.next(data);
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
    Object.defineProperty(ProductComponent.prototype, "name", {
        get: function () {
            return this.form.get('name');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProductComponent.prototype, "type", {
        get: function () {
            return this.form.get('type');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProductComponent.prototype, "unit", {
        get: function () {
            return this.form.get('unit');
        },
        enumerable: false,
        configurable: true
    });
    ProductComponent.prototype.dpEditEvent = function (obj) {
        var _this = this;
        this.data.map(function (data) {
            if (data.id === obj.id) {
                _this.dataId = data.id;
                _this.form.setValue({
                    name: data.productName,
                    type: data.productTypeId,
                    unit: data.stockUnitId
                });
            }
        });
        this.modalEditDisplay = !this.modalEditDisplay;
    };
    ProductComponent.prototype.dpRemoveEvent = function (_a) {
        var _this = this;
        var id = _a.id;
        var currentData;
        this.data.map(function (data) {
            if (data.id === id) {
                currentData = data;
            }
        });
        this.confirmDialog.confirm({
            message: "\u0EA2\u0EB7\u0E99\u0EA2\u0EB1\u0E99\u0E81\u0EB2\u0E99\u0EA5\u0EBB\u0E9A\u0EAA\u0EB4\u0E99\u0E84\u0EC9\u0EB2 <b>" + currentData.productName + "</b>",
            accept: function () {
                var deleteDto = {
                    productId: id,
                    restaurantId: parseInt(_this.authService.getRestaurantId()),
                    branchId: _this.brchId
                };
                _this.productService["delete"](deleteDto).subscribe({
                    complete: function () {
                        _this.ngxSpinnerService.show();
                        _this.pMessageService.deleteSuccess();
                        _this.productService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                            next: function (data) {
                                _this.data = data;
                                _this.productService.dataSub$.next(data);
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
    ProductComponent.prototype.onHide = function (e) {
        document.querySelector('body').style.overflowY = 'auto';
        this.modalDisplay = e;
        this.modalEditDisplay = e;
        this.form.reset();
    };
    ProductComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    ProductComponent.prototype.create = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        (_a = this.name) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.type) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        (_c = this.unit) === null || _c === void 0 ? void 0 : _c.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var createDto = {
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                name: (_d = this.name) === null || _d === void 0 ? void 0 : _d.value,
                productTypeId: (_e = this.type) === null || _e === void 0 ? void 0 : _e.value,
                stockUnitId: (_f = this.unit) === null || _f === void 0 ? void 0 : _f.value
            };
            this.productService.create(createDto).subscribe({
                complete: function () {
                    _this.modalDisplay = false;
                    _this.pMessageService.createSuccess();
                    _this.productService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.productService.dataSub$.next(data);
                        },
                        complete: function () {
                            _this.ngxSpinnerService.hide();
                        }
                    });
                },
                error: function (data) {
                    _this.ngxSpinnerService.hide();
                }
            });
        }
    };
    ProductComponent.prototype.update = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        (_a = this.name) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.type) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        (_c = this.unit) === null || _c === void 0 ? void 0 : _c.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var updateDto = {
                productId: this.dataId,
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                name: (_d = this.name) === null || _d === void 0 ? void 0 : _d.value,
                productTypeId: (_e = this.type) === null || _e === void 0 ? void 0 : _e.value,
                stockUnitId: (_f = this.unit) === null || _f === void 0 ? void 0 : _f.value
            };
            this.productService.update(updateDto).subscribe({
                complete: function () {
                    _this.modalEditDisplay = false;
                    _this.pMessageService.updateSuccess();
                    _this.productService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.productService.dataSub$.next(data);
                        },
                        complete: function () {
                            _this.ngxSpinnerService.hide();
                        }
                    });
                },
                error: function () {
                    _this.ngxSpinnerService.hide();
                }
            });
        }
    };
    ProductComponent = __decorate([
        core_1.Component({
            selector: 'app-product',
            templateUrl: './product.component.html',
            styleUrls: ['./product.component.css']
        })
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
