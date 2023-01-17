"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CouponComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var moment = require("moment");
var rxjs_1 = require("rxjs");
var coupon_model_1 = require("src/app/models/coupon.model");
var globalValidators_1 = require("src/app/validators/globalValidators");
var CouponComponent = /** @class */ (function () {
    function CouponComponent(couponService, fb, pMessageService, confirmDialog, ngxSpinnerService, route, resourceService, authService, utilService) {
        this.couponService = couponService;
        this.fb = fb;
        this.pMessageService = pMessageService;
        this.confirmDialog = confirmDialog;
        this.ngxSpinnerService = ngxSpinnerService;
        this.route = route;
        this.resourceService = resourceService;
        this.authService = authService;
        this.utilService = utilService;
        this.disabled = true;
        this.destroy$ = new rxjs_1.Subject();
        this.data$ = this.couponService.dataObs$;
        this.modalDisplay = false;
        this.modalEditDisplay = false;
        this.gcodes = [];
        this.imagePath = 'assets/images/crud/voucher.png';
        this.amount = 1;
    }
    CouponComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resourceService.getData().subscribe({
            next: function (data) {
                _this.info = data;
            }
        });
        this.form = this.fb.group({
            percentCoupon: ['', [forms_1.Validators.required]],
            expiredDate: ['', [forms_1.Validators.required, globalValidators_1.dateValidators()]],
            code: ['']
        });
        this.ngxSpinnerService.show();
        this.brchId = this.route.snapshot.params['id'];
        this.col = coupon_model_1.colCoupon;
        this.couponService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                _this.data = data;
                _this.couponService.dataSub$.next(data);
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
    Object.defineProperty(CouponComponent.prototype, "percentCoupon", {
        get: function () {
            return this.form.get('percentCoupon');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CouponComponent.prototype, "expiredDate", {
        get: function () {
            return this.form.get('expiredDate');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CouponComponent.prototype, "code", {
        get: function () {
            return this.form.get('code');
        },
        enumerable: false,
        configurable: true
    });
    CouponComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    CouponComponent.prototype.dpEditEvent = function (obj) {
        var _this = this;
        var _a;
        (_a = this.code) === null || _a === void 0 ? void 0 : _a.addValidators(forms_1.Validators.required);
        this.data.map(function (data) {
            if (data.id === obj.id) {
                _this.dataId = data.id;
                _this.form.setValue({
                    percentCoupon: data.percentAmount,
                    expiredDate: moment(data.dateExit).format('yyyy-MM-DD'),
                    code: data.generatedCode
                });
            }
        });
        this.modalEditDisplay = !this.modalEditDisplay;
    };
    CouponComponent.prototype.onHide = function (e) {
        var _a;
        (_a = this.code) === null || _a === void 0 ? void 0 : _a.removeValidators(forms_1.Validators.required);
        document.querySelector('body').style.overflowY = 'auto';
        this.modalDisplay = e;
        this.modalEditDisplay = e;
        this.form.reset();
        this.gcodes = [];
    };
    CouponComponent.prototype.removeCodeSelection = function (i) {
        this.gcodes = this.gcodes.filter(function (d, index) { return index !== i; });
    };
    CouponComponent.prototype.generateCode = function () {
        var _this = this;
        if (this.amount && this.amount !== 1) {
            this.couponService.generateCode(this.info.restaurantName, this.amount).subscribe({
                next: function (data) {
                    data.map(function (value) {
                        _this.gcodes.push(value);
                    });
                }
            });
        }
        else {
            this.couponService.generateCode(this.info.restaurantName, 1).subscribe({
                next: function (data) {
                    data.map(function (value) {
                        _this.gcodes.push(value);
                    });
                }
            });
        }
    };
    CouponComponent.prototype.create = function () {
        var _this = this;
        var _a, _b;
        /* check if date before current */
        var fControls = Object.keys(this.form.controls);
        fControls.map(function (fControl) {
            _this.form.controls[fControl].markAsDirty();
        });
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var newUser = {
                branchId: this.brchId,
                percentAmount: (_a = this.percentCoupon) === null || _a === void 0 ? void 0 : _a.value,
                generatedCode: this.gcodes,
                dateExit: (_b = this.expiredDate) === null || _b === void 0 ? void 0 : _b.value,
                restaurantId: parseInt(this.authService.getRestaurantId())
            };
            this.couponService.create(newUser).subscribe({
                complete: function () {
                    _this.modalDisplay = false;
                    _this.pMessageService.createSuccess();
                    _this.couponService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.couponService.dataSub$.next(data);
                        },
                        complete: function () {
                            _this.utilService.changeSubEvent();
                            _this.ngxSpinnerService.hide();
                        }
                    });
                },
                error: function (data) {
                    _this.pMessageService.customMessageWarn(data.error.message);
                    _this.ngxSpinnerService.hide();
                }
            });
        }
    };
    CouponComponent.prototype.dpRemoveEvent = function (_a) {
        var _this = this;
        var id = _a.id;
        var currentData;
        this.data.map(function (data) {
            if (data.id === id) {
                currentData = data;
            }
        });
        this.confirmDialog.confirm({
            message: "\u0EA2\u0EB7\u0E99\u0EA2\u0EB1\u0E99\u0E81\u0EB2\u0E99\u0EA5\u0EBB\u0E9A\u0E84\u0EB9\u0E9B\u0EAD\u0E87 <b>" + currentData.generatedCode + "</b>",
            accept: function () {
                var deleteDto = {
                    branchId: _this.brchId,
                    couponId: currentData.id,
                    restaurantId: parseInt(_this.authService.getRestaurantId())
                };
                _this.couponService.deleteCoupon(deleteDto).subscribe({
                    complete: function () {
                        _this.ngxSpinnerService.show();
                        _this.couponService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                            next: function (data) {
                                _this.pMessageService.deleteSuccess();
                                _this.data = data;
                                _this.couponService.dataSub$.next(data);
                            },
                            complete: function () {
                                _this.utilService.changeSubEvent();
                                _this.ngxSpinnerService.hide();
                            }
                        });
                    },
                    error: function (data) {
                    }
                });
            },
            reject: function () {
            }
        });
    };
    CouponComponent.prototype.update = function () {
        var _this = this;
        var _a, _b, _c;
        var fControls = Object.keys(this.form.controls);
        fControls.map(function (fControl) {
            _this.form.controls[fControl].markAsDirty();
        });
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var update = {
                branchId: this.brchId,
                couponId: this.dataId,
                generatedCode: (_a = this.code) === null || _a === void 0 ? void 0 : _a.value,
                isUsed: false,
                percentAmount: (_b = this.percentCoupon) === null || _b === void 0 ? void 0 : _b.value,
                dateExit: (_c = this.expiredDate) === null || _c === void 0 ? void 0 : _c.value,
                restaurantId: parseInt(this.authService.getRestaurantId())
            };
            this.couponService.updateCoupon(update).subscribe({
                complete: function () {
                    _this.modalEditDisplay = false;
                    _this.pMessageService.updateSuccess();
                    _this.couponService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.couponService.dataSub$.next(data);
                        },
                        complete: function () {
                            _this.ngxSpinnerService.hide();
                        }
                    });
                },
                error: function (data) {
                    console.log(data);
                    _this.ngxSpinnerService.hide();
                }
            });
        }
    };
    CouponComponent = __decorate([
        core_1.Component({
            selector: 'app-coupon',
            templateUrl: './coupon.component.html',
            styleUrls: ['./coupon.component.css']
        })
    ], CouponComponent);
    return CouponComponent;
}());
exports.CouponComponent = CouponComponent;
