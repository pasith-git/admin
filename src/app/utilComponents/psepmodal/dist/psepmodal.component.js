"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PsepmodalComponent = void 0;
var core_1 = require("@angular/core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var index_util_1 = require("src/app/utilConstant/index.util");
var PsepmodalComponent = /** @class */ (function () {
    function PsepmodalComponent(pMessageService, bankService, couponNgrx) {
        this.pMessageService = pMessageService;
        this.bankService = bankService;
        this.couponNgrx = couponNgrx;
        this.visible = false;
        this.select = false;
        this.selectDebit = false;
        this.selectMoney = false;
        /* calculator */
        this.isCalDisplay = false;
        this.faMoneyBill = free_solid_svg_icons_1.faMoneyBill;
        this.faCreditCard = free_solid_svg_icons_1.faCreditCard;
        this.faCalculator = free_solid_svg_icons_1.faCalculator;
        this.moneyReceive = new core_1.EventEmitter();
        this.payResult = new core_1.EventEmitter();
        this.paymentType = new core_1.EventEmitter();
        this.sepModalHide = new core_1.EventEmitter();
        this.sepPrintBill = new core_1.EventEmitter();
        this.freeMoneyChangeInput = null && 0;
        this.moneyOptions = [
            { amount: 500 },
            { amount: 1000 },
            { amount: 2000 },
            { amount: 5000 },
            { amount: 10000 },
            { amount: 20000 },
            { amount: 50000 },
            { amount: 100000 },
        ];
        this.moneyInput = null;
        this.moneyChange = 0;
        this.moneyBalance = 0;
        this.rnBankInput = null && 0;
        this.moneySepSelfPay = 0;
        this.findCouponEmit = new core_1.EventEmitter();
        this.couponInput = null;
        this.setDefaultCoupon = new core_1.EventEmitter();
        this.calModalEvent = new core_1.EventEmitter();
        this.calModalHide = new core_1.EventEmitter();
    }
    PsepmodalComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        this.bankService.findIdAndName().subscribe(function (data) {
            _this.bankOptions = data;
        });
        this.moneyBalance = (_a = this.data) === null || _a === void 0 ? void 0 : _a.moneyBalance;
    };
    PsepmodalComponent.prototype.ngAfterContentInit = function () {
    };
    PsepmodalComponent.prototype.selectedDebit = function () {
        this.paymentType.emit('bank');
        this.rnBankInput = null;
        this.bankNameInput = '';
        this.select = true;
        this.selectMoney = false;
        this.selectDebit = !this.selectDebit;
        this.moneyChange = 0;
        this.moneyInput = null;
        this.freeMoneyChange = null;
        this.moneyPickerStatus = '';
        this.freeMoneyChangeInput = null;
        this.paymentTypeCheck = 'bank';
        /* coupon default */
        this.couponInput = null;
        this.couponPercent = 0;
        this.setDefaultCouponState();
    };
    PsepmodalComponent.prototype.selectedMoney = function () {
        this.paymentType.emit('cash');
        this.rnBankInput = null;
        this.bankNameInput = '';
        this.select = true;
        this.selectDebit = false;
        this.selectMoney = !this.selectMoney;
        this.moneyChange = 0;
        this.moneyInput = null;
        this.freeMoneyChange = null;
        this.moneyPickerStatus = '';
        this.freeMoneyChangeInput = null;
        this.paymentTypeCheck = 'cash';
        /* coupon default */
        this.couponInput = null;
        this.couponPercent = 0;
        this.setDefaultCouponState();
    };
    PsepmodalComponent.prototype.modalHide = function () {
        this.select = false;
        this.rnBankInput = null;
        this.bankNameInput = '';
        this.selectDebit = false;
        this.selectMoney = false;
        this.moneyInput = null;
        this.moneyChange = 0;
        this.sepModalHide.emit();
        this.moneyPickerStatus = '';
        this.freeMoneyChangeInput = null;
        this.paymentTypeCheck = '';
        /* coupon default */
        this.couponInput = null;
        this.couponPercent = 0;
        this.setDefaultCouponState();
        this.calModalHide.emit();
    };
    PsepmodalComponent.prototype.setDefaultCouponState = function () {
        this.setDefaultCoupon.emit();
    };
    PsepmodalComponent.prototype.moneyPicker = function (mp) {
        if (this.sepTotalPay) {
            this.moneyInput += mp;
            this.moneyChange = Math.abs(this.sepTotalPay - this.moneyInput);
        }
        else {
            if (this.moneyPickerStatus === index_util_1.MPSTATUS.rec) {
                this.moneyInput += mp;
                this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
                this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
            }
            else if (this.moneyPickerStatus === index_util_1.MPSTATUS.cha) {
                this.freeMoneyChangeInput += mp;
                this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
                this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
            }
            else {
                this.moneyInput += mp;
                this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
                this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
            }
        }
    };
    PsepmodalComponent.prototype.moneyInputEvent = function (e) {
        this.moneyInput = e.value;
        if (this.sepTotalPay) {
            this.moneyChange = Math.abs(this.sepTotalPay - this.moneyInput);
        }
        else {
            this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
            this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
        }
        if (e.value === null) {
        }
    };
    PsepmodalComponent.prototype.freeMoneyChangeInputEvent = function (_a) {
        var value = _a.value;
        this.freeMoneyChangeInput = value;
        if (this.sepTotalPay) {
            this.moneyChange = Math.abs(this.sepTotalPay - this.moneyInput);
        }
        else {
            this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
            this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
        }
        if (value === null) {
            this.moneyChange = 0;
        }
    };
    PsepmodalComponent.prototype.payByCash = function (data) {
        if (this.paymentTypeCheck === 'cash') {
            if (this.sepTotalPay) {
                this.payResult.emit({
                    freeMoneyChangeInput: this.freeMoneyChangeInput, order: this.data, moneyChange: this.moneyChange,
                    status: 'cash', op: { sepTotalPay: this.sepTotalPay, moneyInput: this.moneyInput, bankName: this.bankNameInput, rnBank: this.rnBankInput }
                });
                this.calModalHide.emit();
            }
            else {
                if (this.freeMoneyChangeInput && this.moneyInput) {
                    if (this.freeMoneyChangeInput <= this.moneyInput) {
                        if (this.freeMoneyChangeInput <= this.moneyBalance) {
                            this.payResult.emit({
                                freeMoneyChangeInput: this.freeMoneyChangeInput, order: this.data, moneyChange: this.moneyChange,
                                status: 'cash', op: { sepTotalPay: this.moneySepSelfPay, moneyInput: this.moneyInput, bankName: this.bankNameInput, rnBank: this.rnBankInput }
                            });
                            this.calModalHide.emit();
                        }
                        else {
                            /* needPay lower then freemoney */
                            this.pMessageService.defaultError();
                        }
                    }
                    else {
                        this.pMessageService.defaultError();
                    }
                }
                else {
                    this.pMessageService.emptyBillpayment();
                }
            }
        }
        else {
            if (this.sepTotalPay) {
                this.payResult.emit({
                    freeMoneyChangeInput: this.freeMoneyChangeInput, order: this.data, moneyChange: this.moneyChange,
                    status: 'bank', op: { sepTotalPay: this.sepTotalPay, moneyInput: this.moneyInput, bankName: this.bankNameInput, rnBank: this.rnBankInput }
                });
                this.calModalHide.emit();
            }
            else {
                if (this.freeMoneyChangeInput && this.moneyInput && this.rnBankInput) {
                    if (this.freeMoneyChangeInput <= this.moneyInput) {
                        if (this.freeMoneyChangeInput <= this.moneyBalance) {
                            this.payResult.emit({
                                freeMoneyChangeInput: this.freeMoneyChangeInput, order: this.data, moneyChange: this.moneyChange,
                                status: 'bank', op: { sepTotalPay: this.moneySepSelfPay, moneyInput: this.moneyInput, bankName: this.bankNameInput, rnBank: this.rnBankInput }
                            });
                            this.calModalHide.emit();
                        }
                        else {
                            /* needPay lower then freemoney */
                            this.pMessageService.defaultError();
                        }
                    }
                    else {
                        this.pMessageService.defaultError();
                    }
                }
                else {
                    this.pMessageService.emptyBillpayment();
                }
            }
        }
    };
    PsepmodalComponent.prototype.sepPrint = function () {
        if (this.paymentTypeCheck === 'cash') {
            if (this.sepTotalPay) {
                if (this.moneyInput) {
                    this.sepPrintBill.emit({ freeMoneyChangeInput: this.freeMoneyChangeInput, moneyChange: this.moneyChange, moneyInput: this.moneyInput, op: { sepTotalPay: this.sepTotalPay } });
                }
                else {
                    this.pMessageService.emptyBillpayment();
                }
            }
            else {
                if (this.freeMoneyChangeInput && this.moneyInput) {
                    if (this.freeMoneyChangeInput <= this.moneyInput) {
                        if (this.freeMoneyChangeInput <= this.moneyBalance) {
                            this.sepPrintBill.emit({ freeMoneyChangeInput: this.freeMoneyChangeInput, moneyChange: this.moneyChange, moneyInput: this.moneyInput, op: { moneySepSelfPay: this.moneySepSelfPay } });
                        }
                        else {
                            /* needPay lower then freemoney */
                            this.pMessageService.defaultError();
                        }
                    }
                    else {
                        this.pMessageService.defaultError();
                    }
                }
                else {
                    this.pMessageService.emptyBillpayment();
                }
            }
        }
        else {
            if (this.sepTotalPay) {
                if (this.moneyInput && this.rnBankInput) {
                    this.sepPrintBill.emit({ freeMoneyChangeInput: this.freeMoneyChangeInput, moneyChange: this.moneyChange, moneyInput: this.moneyInput, op: { sepTotalPay: this.sepTotalPay } });
                }
                else {
                    this.pMessageService.emptyBillpayment();
                }
            }
            else {
                if (this.freeMoneyChangeInput && this.moneyInput) {
                    if (this.freeMoneyChangeInput <= this.moneyInput) {
                        if (this.freeMoneyChangeInput <= this.moneyBalance) {
                            this.sepPrintBill.emit({ freeMoneyChangeInput: this.freeMoneyChangeInput, moneyChange: this.moneyChange, moneyInput: this.moneyInput, op: { moneySepSelfPay: this.moneySepSelfPay } });
                        }
                        else {
                            /* needPay lower then freemoney */
                            this.pMessageService.defaultError();
                        }
                    }
                    else {
                        this.pMessageService.defaultError();
                    }
                }
                else {
                    this.pMessageService.emptyBillpayment();
                }
            }
        }
    };
    PsepmodalComponent.prototype.focusRec = function () {
        this.moneyPickerStatus = index_util_1.MPSTATUS.rec;
    };
    PsepmodalComponent.prototype.focusCha = function () {
        this.moneyPickerStatus = index_util_1.MPSTATUS.cha;
    };
    PsepmodalComponent.prototype.ngOnChanges = function (_a) {
        var couponPercent = _a.couponPercent;
        if (this.sepTotalPay) {
            if ((couponPercent === null || couponPercent === void 0 ? void 0 : couponPercent.currentValue) > 0) {
                if (this.moneyInput > 0) {
                    this.sepTotalPay = this.defaultSepTotalPay - this.couponMoney;
                    this.moneyChange = Math.abs(this.moneyInput - this.sepTotalPay);
                }
                else {
                    this.sepTotalPay = this.defaultSepTotalPay - this.couponMoney;
                }
            }
            else {
                this.sepTotalPay = this.defaultSepTotalPay;
                this.moneyChange = Math.abs(this.moneyChange ? this.moneyInput - this.sepTotalPay : 0);
            }
        }
        else {
            this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
            this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
        }
    };
    /* find coupon code*/
    PsepmodalComponent.prototype.findCoupon = function () {
        if (this.sepTotalPay) {
            if (this.couponInput === '') {
                this.findCouponEmit.emit({ couponInput: null });
            }
            else {
                this.couponNgrx.update({
                    couponCode: this.couponInput
                });
                this.findCouponEmit.emit({ couponInput: this.couponInput, mb: this.defaultSepTotalPay });
            }
        }
        else {
            if (!this.couponInput) {
                this.findCouponEmit.emit({ couponInput: null });
            }
            else {
                if (this.freeMoneyChangeInput) {
                    if (this.freeMoneyChangeInput <= this.moneyBalance) {
                        this.couponNgrx.update({
                            couponCode: this.couponInput
                        });
                        this.findCouponEmit.emit({ couponInput: this.couponInput, mb: this.freeMoneyChangeInput });
                    }
                    else {
                        this.pMessageService.overflowPayment();
                    }
                }
                else {
                    this.pMessageService.customMessageWarn("ກະລຸນາປ້ອນຈຳນວນເງິນທີ່ຕ້ອງການຈ່າຍ");
                }
            }
        }
    };
    PsepmodalComponent.prototype.calGenerate = function (data) {
        if (data > 0) {
            if (this.sepTotalPay) {
                this.moneyInput = data;
                this.moneyChange = Math.abs(this.sepTotalPay - this.moneyInput);
            }
            else {
                if (this.moneyPickerStatus === index_util_1.MPSTATUS.rec) {
                    this.moneyInput = data;
                    this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
                    this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
                }
                else if (this.moneyPickerStatus === index_util_1.MPSTATUS.cha) {
                    this.freeMoneyChangeInput = data;
                    this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
                    this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
                }
                else {
                    this.moneyInput = data;
                    this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
                    this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
                }
            }
        }
        else {
            if (this.moneyPickerStatus === index_util_1.MPSTATUS.rec) {
                this.moneyInput = null;
                this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
                this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
            }
            else if (this.moneyPickerStatus === index_util_1.MPSTATUS.cha) {
                this.freeMoneyChangeInput = null;
                this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
                this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
            }
            else {
                this.moneyInput = null;
                this.moneySepSelfPay = Math.abs(this.freeMoneyChangeInput - this.couponMoney);
                this.moneyChange = Math.abs(this.moneyInput - this.moneySepSelfPay);
            }
        }
    };
    PsepmodalComponent.prototype.calModal = function () {
        this.calModalEvent.emit();
    };
    __decorate([
        core_1.Input()
    ], PsepmodalComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], PsepmodalComponent.prototype, "index");
    __decorate([
        core_1.Output()
    ], PsepmodalComponent.prototype, "moneyReceive");
    __decorate([
        core_1.Output()
    ], PsepmodalComponent.prototype, "payResult");
    __decorate([
        core_1.Output()
    ], PsepmodalComponent.prototype, "paymentType");
    __decorate([
        core_1.Output()
    ], PsepmodalComponent.prototype, "sepModalHide");
    __decorate([
        core_1.Output()
    ], PsepmodalComponent.prototype, "sepPrintBill");
    __decorate([
        core_1.Input()
    ], PsepmodalComponent.prototype, "sepTotal");
    __decorate([
        core_1.Input()
    ], PsepmodalComponent.prototype, "sepVat");
    __decorate([
        core_1.Input()
    ], PsepmodalComponent.prototype, "sepTotalPay");
    __decorate([
        core_1.Input()
    ], PsepmodalComponent.prototype, "defaultSepTotalPay");
    __decorate([
        core_1.Input()
    ], PsepmodalComponent.prototype, "freeMoneyChange");
    __decorate([
        core_1.Input()
    ], PsepmodalComponent.prototype, "needPay");
    __decorate([
        core_1.Input()
    ], PsepmodalComponent.prototype, "couponPercent");
    __decorate([
        core_1.Input()
    ], PsepmodalComponent.prototype, "couponMoney");
    __decorate([
        core_1.Output()
    ], PsepmodalComponent.prototype, "findCouponEmit");
    __decorate([
        core_1.Input()
    ], PsepmodalComponent.prototype, "couponInput");
    __decorate([
        core_1.Output()
    ], PsepmodalComponent.prototype, "setDefaultCoupon");
    __decorate([
        core_1.Output()
    ], PsepmodalComponent.prototype, "calModalEvent");
    __decorate([
        core_1.Output()
    ], PsepmodalComponent.prototype, "calModalHide");
    PsepmodalComponent = __decorate([
        core_1.Component({
            selector: 'p-sepmodal',
            templateUrl: './psepmodal.component.html',
            styleUrls: ['./psepmodal.component.css']
        })
    ], PsepmodalComponent);
    return PsepmodalComponent;
}());
exports.PsepmodalComponent = PsepmodalComponent;
