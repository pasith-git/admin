"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UnitComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var unit_model_1 = require("src/app/models/unit.model");
var globalValidators_1 = require("src/app/validators/globalValidators");
var UnitComponent = /** @class */ (function () {
    function UnitComponent(unitService, ngxSpinnerService, route, fb, confirmDialog, authService, pMessageService) {
        this.unitService = unitService;
        this.ngxSpinnerService = ngxSpinnerService;
        this.route = route;
        this.fb = fb;
        this.confirmDialog = confirmDialog;
        this.authService = authService;
        this.pMessageService = pMessageService;
        this.disabled = true;
        this.destroy$ = new rxjs_1.Subject();
        this.data$ = this.unitService.dataObs$;
        this.modalDisplay = false;
        this.modalEditDisplay = false;
        this.icon = free_solid_svg_icons_1.faBalanceScale;
    }
    UnitComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngxSpinnerService.show();
        this.brchId = this.route.snapshot.params['id'];
        this.col = unit_model_1.colUnit;
        this.form = this.fb.group({
            name: ['', [forms_1.Validators.required, globalValidators_1.stringValidator()]]
        });
        this.unitService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                _this.data = data;
                _this.unitService.dataSub$.next(data);
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
    Object.defineProperty(UnitComponent.prototype, "name", {
        get: function () {
            return this.form.get('name');
        },
        enumerable: false,
        configurable: true
    });
    UnitComponent.prototype.dpEditEvent = function (obj) {
        var _this = this;
        this.data.map(function (data) {
            if (data.id === obj.id) {
                _this.dataId = data.id;
                _this.form.setValue({
                    name: data.unitName
                });
            }
        });
        this.modalEditDisplay = !this.modalEditDisplay;
    };
    UnitComponent.prototype.dpRemoveEvent = function (_a) {
        var _this = this;
        var id = _a.id;
        var currentData;
        this.data.map(function (data) {
            if (data.id === id) {
                currentData = data;
            }
        });
        this.confirmDialog.confirm({
            message: "\u0EA2\u0EB7\u0E99\u0EA2\u0EB1\u0E99\u0E81\u0EB2\u0E99\u0EA5\u0EBB\u0E9A\u0EAB\u0EBB\u0EA7\u0EDC\u0EC8\u0EA7\u0E8D <b>" + currentData.unitName + "</b>",
            accept: function () {
                var deletePrinterDto = {
                    unitId: id,
                    restaurantId: parseInt(_this.authService.getRestaurantId()),
                    branchId: _this.brchId
                };
                _this.unitService["delete"](deletePrinterDto).subscribe({
                    complete: function () {
                        _this.ngxSpinnerService.show();
                        _this.pMessageService.deleteSuccess();
                        _this.unitService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                            next: function (data) {
                                _this.data = data;
                                _this.unitService.dataSub$.next(data);
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
    UnitComponent.prototype.onHide = function (e) {
        document.querySelector('body').style.overflowY = 'auto';
        this.modalDisplay = e;
        this.modalEditDisplay = e;
        this.form.reset();
    };
    UnitComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    UnitComponent.prototype.create = function () {
        var _this = this;
        var _a, _b;
        (_a = this.name) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var createPrinterDto = {
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                unitName: (_b = this.name) === null || _b === void 0 ? void 0 : _b.value
            };
            this.unitService.create(createPrinterDto).subscribe({
                complete: function () {
                    _this.modalDisplay = false;
                    _this.pMessageService.createSuccess();
                    _this.unitService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.unitService.dataSub$.next(data);
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
    UnitComponent.prototype.update = function () {
        var _this = this;
        var _a, _b;
        (_a = this.name) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var updatePrinterDto = {
                unitId: this.dataId,
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                unitName: (_b = this.name) === null || _b === void 0 ? void 0 : _b.value
            };
            this.unitService.update(updatePrinterDto).subscribe({
                complete: function () {
                    _this.modalEditDisplay = false;
                    _this.pMessageService.updateSuccess();
                    _this.unitService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.unitService.dataSub$.next(data);
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
    UnitComponent = __decorate([
        core_1.Component({
            selector: 'app-unit',
            templateUrl: './unit.component.html',
            styleUrls: ['./unit.component.css']
        })
    ], UnitComponent);
    return UnitComponent;
}());
exports.UnitComponent = UnitComponent;
