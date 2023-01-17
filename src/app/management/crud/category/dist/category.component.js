"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoryComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var globalValidators_1 = require("src/app/validators/globalValidators");
var category_model_1 = require("src/app/models/category.model");
var CategoryComponent = /** @class */ (function () {
    function CategoryComponent(categoryService, ngxSpinnerService, utilService, printerService, route, fb, confirmDialog, authService, pMessageService) {
        this.categoryService = categoryService;
        this.ngxSpinnerService = ngxSpinnerService;
        this.utilService = utilService;
        this.printerService = printerService;
        this.route = route;
        this.fb = fb;
        this.confirmDialog = confirmDialog;
        this.authService = authService;
        this.pMessageService = pMessageService;
        this.disabled = true;
        this.destroy$ = new rxjs_1.Subject();
        this.data$ = this.categoryService.dataObs$;
        this.modalDisplay = false;
        this.modalEditDisplay = false;
        this.imagePath = 'assets/images/crud/grocery.png';
    }
    CategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngxSpinnerService.show();
        this.brchId = this.route.snapshot.params['id'];
        this.col = category_model_1.colCategory;
        this.form = this.fb.group({
            name: ['', [forms_1.Validators.required, globalValidators_1.stringValidator()]],
            printer: ['', [forms_1.Validators.required]]
        });
        this.printerService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                var result = data.map(function (value) {
                    return { name: value.ipAddress, code: value.id };
                });
                _this.printerOptions = result;
            }
        });
        this.categoryService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                _this.data = data;
                _this.categoryService.dataSub$.next(data);
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
    Object.defineProperty(CategoryComponent.prototype, "name", {
        get: function () {
            return this.form.get('name');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CategoryComponent.prototype, "printer", {
        get: function () {
            return this.form.get('printer');
        },
        enumerable: false,
        configurable: true
    });
    CategoryComponent.prototype.dpEditEvent = function (obj) {
        var _this = this;
        this.data.map(function (data) {
            if (data.id === obj.id) {
                _this.dataId = data.id;
                _this.form.setValue({
                    name: data.name,
                    printer: data.printerId
                });
            }
        });
        this.modalEditDisplay = !this.modalEditDisplay;
    };
    CategoryComponent.prototype.dpRemoveEvent = function (_a) {
        var _this = this;
        var id = _a.id;
        var currentData;
        this.data.map(function (data) {
            if (data.id === id) {
                currentData = data;
            }
        });
        this.confirmDialog.confirm({
            message: "\u0EA2\u0EB7\u0E99\u0EA2\u0EB1\u0E99\u0E81\u0EB2\u0E99\u0EA5\u0EBB\u0E9A\u0E9B\u0EB0\u0EC0\u0E9E\u0E94 <b>" + currentData.name + "</b>",
            accept: function () {
                var deleteDto = {
                    categoryId: id,
                    restaurantId: parseInt(_this.authService.getRestaurantId()),
                    branchId: _this.brchId
                };
                _this.categoryService["delete"](deleteDto).subscribe({
                    complete: function () {
                        _this.ngxSpinnerService.show();
                        _this.pMessageService.deleteSuccess();
                        _this.categoryService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                            next: function (data) {
                                _this.data = data;
                                _this.categoryService.dataSub$.next(data);
                            },
                            complete: function () {
                                _this.utilService.changeSubEvent();
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
    CategoryComponent.prototype.onHide = function (e) {
        document.querySelector('body').style.overflowY = 'auto';
        this.modalDisplay = e;
        this.modalEditDisplay = e;
        this.form.reset();
    };
    CategoryComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    CategoryComponent.prototype.create = function () {
        var _this = this;
        var _a, _b, _c, _d;
        (_a = this.name) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.printer) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var createDto = {
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                name: (_c = this.name) === null || _c === void 0 ? void 0 : _c.value,
                printerId: (_d = this.printer) === null || _d === void 0 ? void 0 : _d.value
            };
            this.categoryService.create(createDto).subscribe({
                complete: function () {
                    _this.modalDisplay = false;
                    _this.pMessageService.createSuccess();
                    _this.categoryService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.categoryService.dataSub$.next(data);
                        },
                        complete: function () {
                            _this.utilService.changeSubEvent();
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
    CategoryComponent.prototype.update = function () {
        var _this = this;
        var _a, _b, _c, _d;
        (_a = this.name) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.printer) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var updateDto = {
                categoryId: this.dataId,
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                name: (_c = this.name) === null || _c === void 0 ? void 0 : _c.value,
                printerId: (_d = this.printer) === null || _d === void 0 ? void 0 : _d.value
            };
            this.categoryService.update(updateDto).subscribe({
                complete: function () {
                    _this.modalEditDisplay = false;
                    _this.pMessageService.updateSuccess();
                    _this.categoryService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.categoryService.dataSub$.next(data);
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
    CategoryComponent = __decorate([
        core_1.Component({
            selector: 'app-category',
            templateUrl: './category.component.html',
            styleUrls: ['./category.component.css']
        })
    ], CategoryComponent);
    return CategoryComponent;
}());
exports.CategoryComponent = CategoryComponent;
