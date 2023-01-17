"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PrinterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var printer_model_1 = require("src/app/models/printer.model");
var globalValidators_1 = require("src/app/validators/globalValidators");
var PrinterComponent = /** @class */ (function () {
    function PrinterComponent(printerService, fb, route, authService, pMessageService, confirmDialog, ngxSpinnerService) {
        this.printerService = printerService;
        this.fb = fb;
        this.route = route;
        this.authService = authService;
        this.pMessageService = pMessageService;
        this.confirmDialog = confirmDialog;
        this.ngxSpinnerService = ngxSpinnerService;
        this.disabled = true;
        this.destroy$ = new rxjs_1.Subject();
        this.data$ = this.printerService.dataObs$;
        this.modalDisplay = false;
        this.modalEditDisplay = false;
        this.validatorsBox = false;
        this.imagePath = 'assets/images/crud/printer.png';
    }
    PrinterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngxSpinnerService.show();
        this.placementSelection = [
            { name: 'other', code: 'other' },
            { name: 'kitchen', code: 'kitchen' },
            { name: 'counter', code: 'counter' },
            { name: 'bar', code: 'bar' },
        ];
        this.brchId = this.route.snapshot.params['id'];
        this.form = this.fb.group({
            ipAddress: ['', [forms_1.Validators.required, globalValidators_1.ipAddressValidator()]],
            port: ['', [forms_1.Validators.required, globalValidators_1.portValidator()]],
            placement: ['', [forms_1.Validators.required, globalValidators_1.stringValidator()]]
        });
        this.items = [
            {
                label: 'Update', icon: 'pi pi-refresh',
                command: function () { }
            },
            {
                label: 'Delete', icon: 'pi pi-times',
                command: function () { }
            },
        ];
        this.col = printer_model_1.colPrinter;
        this.printerService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                _this.data = data;
                _this.printerService.dataSub$.next(data);
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
    Object.defineProperty(PrinterComponent.prototype, "ipAddress", {
        get: function () {
            return this.form.get('ipAddress');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PrinterComponent.prototype, "port", {
        get: function () {
            return this.form.get('port');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PrinterComponent.prototype, "placement", {
        get: function () {
            return this.form.get('placement');
        },
        enumerable: false,
        configurable: true
    });
    PrinterComponent.prototype.create = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        (_a = this.ipAddress) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.port) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        (_c = this.placement) === null || _c === void 0 ? void 0 : _c.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var createPrinterDto = {
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                ipAddress: (_d = this.ipAddress) === null || _d === void 0 ? void 0 : _d.value,
                portNumber: (_e = this.port) === null || _e === void 0 ? void 0 : _e.value,
                placement: (_f = this.placement) === null || _f === void 0 ? void 0 : _f.value
            };
            this.printerService.create(createPrinterDto).subscribe({
                complete: function () {
                    _this.modalDisplay = false;
                    _this.pMessageService.createSuccess();
                    _this.printerService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.printerService.dataSub$.next(data);
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
    PrinterComponent.prototype.update = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        (_a = this.ipAddress) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.port) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        (_c = this.placement) === null || _c === void 0 ? void 0 : _c.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var updatePrinterDto = {
                printerId: this.dataId,
                restaurantId: parseInt(this.authService.getRestaurantId()),
                branchId: this.brchId,
                ipAddress: (_d = this.ipAddress) === null || _d === void 0 ? void 0 : _d.value,
                portNumber: (_e = this.port) === null || _e === void 0 ? void 0 : _e.value,
                placement: (_f = this.placement) === null || _f === void 0 ? void 0 : _f.value
            };
            this.printerService.update(updatePrinterDto).subscribe({
                complete: function () {
                    _this.modalEditDisplay = false;
                    _this.pMessageService.updateSuccess();
                    _this.printerService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.printerService.dataSub$.next(data);
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
    PrinterComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    PrinterComponent.prototype.ngAfterViewInit = function () {
    };
    PrinterComponent.prototype.onHide = function (e) {
        document.querySelector('body').style.overflowY = 'auto';
        this.modalDisplay = e;
        this.modalEditDisplay = e;
        this.form.reset();
    };
    PrinterComponent.prototype.dpEditEvent = function (obj) {
        var _this = this;
        this.data.map(function (data) {
            if (data.id === obj.id) {
                _this.dataId = data.id;
                _this.form.setValue({
                    ipAddress: data.ipAddress,
                    port: data.portNumber,
                    placement: data.placement
                });
            }
        });
        this.modalEditDisplay = !this.modalEditDisplay;
    };
    PrinterComponent.prototype.dpRemoveEvent = function (_a) {
        var _this = this;
        var id = _a.id;
        var currentData;
        this.data.map(function (data) {
            if (data.id === id) {
                currentData = data;
            }
        });
        this.confirmDialog.confirm({
            message: "\u0EA2\u0EB7\u0E99\u0EA2\u0EB1\u0E99\u0E81\u0EB2\u0E99\u0EA5\u0EBB\u0E9A\u0EC4\u0EAD\u0E9E\u0EB5 <b>" + currentData.ipAddress + "</b>",
            accept: function () {
                var deletePrinterDto = {
                    printerId: id,
                    restaurantId: parseInt(_this.authService.getRestaurantId()),
                    branchId: _this.brchId
                };
                _this.printerService["delete"](deletePrinterDto).subscribe({
                    complete: function () {
                        _this.ngxSpinnerService.show();
                        _this.pMessageService.deleteSuccess();
                        _this.printerService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                            next: function (data) {
                                _this.data = data;
                                _this.printerService.dataSub$.next(data);
                            },
                            complete: function () {
                                _this.ngxSpinnerService.hide();
                            }
                        });
                    }
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild('dynamic')
    ], PrinterComponent.prototype, "dpButton");
    PrinterComponent = __decorate([
        core_1.Component({
            selector: 'app-printer',
            templateUrl: './printer.component.html',
            styleUrls: ['./printer.component.css']
        })
    ], PrinterComponent);
    return PrinterComponent;
}());
exports.PrinterComponent = PrinterComponent;
