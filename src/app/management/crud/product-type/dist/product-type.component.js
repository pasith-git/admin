"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductTypeComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var product_type_model_1 = require("src/app/models/product-type.model");
var globalValidators_1 = require("src/app/validators/globalValidators");
var ProductTypeComponent = /** @class */ (function () {
    function ProductTypeComponent(productTypeService, ngxSpinnerService, route, fb, confirmDialog, authService, pMessageService) {
        this.productTypeService = productTypeService;
        this.ngxSpinnerService = ngxSpinnerService;
        this.route = route;
        this.fb = fb;
        this.confirmDialog = confirmDialog;
        this.authService = authService;
        this.pMessageService = pMessageService;
        this.disabled = true;
        this.destroy$ = new rxjs_1.Subject();
        this.data$ = this.productTypeService.dataObs$;
        this.modalDisplay = false;
        this.modalEditDisplay = false;
        this.imagePath = 'assets/images/crud/processed-food.png';
    }
    ProductTypeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngxSpinnerService.show();
        this.brchId = this.route.snapshot.params['id'];
        this.col = product_type_model_1.colProductType;
        this.form = this.fb.group({
            name: ['', [forms_1.Validators.required, globalValidators_1.stringValidator()]]
        });
        this.productTypeService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                _this.data = data;
                _this.productTypeService.dataSub$.next(data);
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
    Object.defineProperty(ProductTypeComponent.prototype, "name", {
        get: function () {
            return this.form.get('name');
        },
        enumerable: false,
        configurable: true
    });
    ProductTypeComponent.prototype.dpEditEvent = function (obj) {
        var _this = this;
        this.data.map(function (data) {
            if (data.id === obj.id) {
                _this.dataId = data.id;
                _this.form.setValue({
                    name: data.name
                });
            }
        });
        this.modalEditDisplay = !this.modalEditDisplay;
    };
    ProductTypeComponent.prototype.dpRemoveEvent = function (_a) {
        var _this = this;
        var id = _a.id;
        var currentData;
        this.data.map(function (data) {
            if (data.id === id) {
                currentData = data;
            }
        });
        this.confirmDialog.confirm({
            message: "\u0EA2\u0EB7\u0E99\u0EA2\u0EB1\u0E99\u0E81\u0EB2\u0E99\u0EA5\u0EBB\u0E9A\u0E9B\u0EB0\u0EC0\u0E9E\u0E94\u0EAA\u0EB4\u0E99\u0E84\u0EC9\u0EB2 <b>" + currentData.name + "</b>",
            accept: function () {
                var deletePrinterDto = {
                    typeId: id,
                    restaurantId: parseInt(_this.authService.getRestaurantId()),
                    branchId: _this.brchId
                };
                _this.productTypeService["delete"](deletePrinterDto).subscribe({
                    complete: function () {
                        _this.ngxSpinnerService.show();
                        _this.pMessageService.deleteSuccess();
                        _this.productTypeService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                            next: function (data) {
                                _this.data = data;
                                _this.productTypeService.dataSub$.next(data);
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
    ProductTypeComponent.prototype.onHide = function (e) {
        document.querySelector('body').style.overflowY = 'auto';
        this.modalDisplay = e;
        this.modalEditDisplay = e;
        this.form.reset();
    };
    ProductTypeComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    ProductTypeComponent.prototype.create = function () {
        var _this = this;
        var _a, _b;
        (_a = this.name) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var createPrinterDto = {
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                name: (_b = this.name) === null || _b === void 0 ? void 0 : _b.value
            };
            this.productTypeService.create(createPrinterDto).subscribe({
                complete: function () {
                    _this.modalDisplay = false;
                    _this.pMessageService.createSuccess();
                    _this.productTypeService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.productTypeService.dataSub$.next(data);
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
    ProductTypeComponent.prototype.update = function () {
        var _this = this;
        var _a, _b;
        (_a = this.name) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var updatePrinterDto = {
                typeId: this.dataId,
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                name: (_b = this.name) === null || _b === void 0 ? void 0 : _b.value
            };
            this.productTypeService.update(updatePrinterDto).subscribe({
                complete: function () {
                    _this.modalEditDisplay = false;
                    _this.pMessageService.updateSuccess();
                    _this.productTypeService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.productTypeService.dataSub$.next(data);
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
    ProductTypeComponent = __decorate([
        core_1.Component({
            selector: 'app-product-type',
            templateUrl: './product-type.component.html',
            styleUrls: ['./product-type.component.css']
        })
    ], ProductTypeComponent);
    return ProductTypeComponent;
}());
exports.ProductTypeComponent = ProductTypeComponent;
