"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PmodalComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var PmodalComponent = /** @class */ (function () {
    function PmodalComponent(bankService, checkoutService, couponService, route, orderService, pMessageService, fb) {
        this.bankService = bankService;
        this.checkoutService = checkoutService;
        this.couponService = couponService;
        this.route = route;
        this.orderService = orderService;
        this.pMessageService = pMessageService;
        this.fb = fb;
        this.visible = false;
        this.select = false;
        this.selectDebit = false;
        this.selectMoney = false;
        this.faMoneyBill = free_solid_svg_icons_1.faMoneyBill;
        this.faCreditCard = free_solid_svg_icons_1.faCreditCard;
        this.faCalculator = free_solid_svg_icons_1.faCalculator;
        /* cal functions */
        this.calModalEvent = new core_1.EventEmitter();
        this.calModalHide = new core_1.EventEmitter();
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
        this.rnBankInput = null && 0;
        this.moneyBalance = 0;
    }
    PmodalComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        this.form = this.fb.group({
            money: [undefined, forms_1.Validators.required],
            coupon: [''],
            discount: ['', forms_1.Validators.required]
        });
        this.tableId = (_a = this.route.firstChild) === null || _a === void 0 ? void 0 : _a.snapshot.params['tid'];
        this.brchId = this.route.snapshot.params['id'];
        this.checkoutData = this.checkoutService.data$;
        console.log(this.checkoutData);
        this.orderService.getOrderById(this.brchId.toString(), this.tableId, 'pending').subscribe({
            next: function (order) {
                _this.moneyBalance = order.moneyBalance;
                _this.checkoutService.dataSubject.next(__assign(__assign({}, _this.checkoutService.data), { total: _this.moneyBalance }));
            }
        });
        this.bankService.findIdAndName().subscribe(function (data) {
            _this.bankOptions = data;
        });
    };
    Object.defineProperty(PmodalComponent.prototype, "moneyInput", {
        get: function () {
            return this.form.get('money');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PmodalComponent.prototype, "couponInput", {
        get: function () {
            return this.form.get('coupon');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PmodalComponent.prototype, "discount", {
        get: function () {
            return this.form.get('discount');
        },
        enumerable: false,
        configurable: true
    });
    PmodalComponent.prototype.ngAfterContentInit = function () {
    };
    PmodalComponent.prototype.selectedDebit = function () {
        this.rnBankInput = null;
        this.bankNameInput = '';
        this.select = true;
        this.selectMoney = false;
        this.selectDebit = !this.selectDebit;
        this.checkoutService.dataSubject.next(__assign(__assign({}, this.checkoutService.defaultValue), { total: this.moneyBalance }));
        this.form.reset();
    };
    PmodalComponent.prototype.selectedMoney = function () {
        this.rnBankInput = null;
        this.bankNameInput = '';
        this.select = true;
        this.selectDebit = false;
        this.selectMoney = !this.selectMoney;
        this.checkoutService.dataSubject.next(__assign(__assign({}, this.checkoutService.defaultValue), { total: this.moneyBalance }));
        this.form.reset();
    };
    PmodalComponent.prototype.modalHide = function () {
        this.select = false;
        this.rnBankInput = null;
        this.bankNameInput = '';
        this.selectDebit = false;
        this.selectMoney = false;
        this.selectedValue = '';
        this.calModalHide.emit();
        this.checkoutService.dataSubject.next(__assign(__assign({}, this.checkoutService.defaultValue), { total: this.moneyBalance }));
        this.form.reset();
    };
    PmodalComponent.prototype.moneyPicker = function (mp) {
        var _a, _b;
        (_a = this.moneyInput) === null || _a === void 0 ? void 0 : _a.setValue(this.moneyInput ? this.moneyInput.value + mp : mp);
        var coData = this.checkoutService.data;
        this.checkoutService.dataSubject.next(__assign(__assign({}, this.checkoutService.data), { moneyReceive: (((_b = this.moneyInput) === null || _b === void 0 ? void 0 : _b.value) + coData.moneyCoupon) || 0, moneyChange: this.moneyInput ? Math.abs(coData.total - (this.moneyInput.value + coData.moneyCoupon)) : 0 }));
    };
    PmodalComponent.prototype.getMoneyR = function (e) {
        var coData = this.checkoutService.data;
        this.checkoutService.dataSubject.next(__assign(__assign({}, this.checkoutService.data), { moneyReceive: (e.value + coData.moneyCoupon) || 0, moneyChange: e.value ? Math.abs(coData.total - (e.value + coData.moneyCoupon)) : 0 }));
    };
    PmodalComponent.prototype.payByCash = function () {
        if (this.form.valid) {
        }
    };
    /* find coupon code*/
    PmodalComponent.prototype.findCoupon = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        if (((_a = this.discount) === null || _a === void 0 ? void 0 : _a.value) && ((_b = this.couponInput) === null || _b === void 0 ? void 0 : _b.value)) {
            var coData_1 = this.checkoutService.data;
            if (((_c = this.discount) === null || _c === void 0 ? void 0 : _c.value) === 'discountMoney') {
                this.checkoutService.dataSubject.next(__assign(__assign({}, this.checkoutService.data), { couponPercent: 0, moneyCoupon: this.couponInput.value, moneyChange: this.moneyInput ? Math.abs(coData_1.total - (this.moneyInput.value + this.couponInput.value)) : 0 }));
            }
            else if (((_d = this.discount) === null || _d === void 0 ? void 0 : _d.value) === 'discountPercent') {
            }
            else if (((_e = this.discount) === null || _e === void 0 ? void 0 : _e.value) === 'discountMember') {
            }
            else if (((_f = this.discount) === null || _f === void 0 ? void 0 : _f.value) === 'discountCode' || !((_g = this.discount) === null || _g === void 0 ? void 0 : _g.value)) {
                this.couponService.findCoupon(this.brchId.toString(), this.discount.value).subscribe({
                    next: function (coupon) {
                        var moneyCoupon = coData_1.total * (coupon.percentAmount / 100);
                        _this.checkoutService.dataSubject.next(__assign(__assign({}, _this.checkoutService.data), { couponPercent: coupon.percentAmount, moneyCoupon: moneyCoupon, moneyChange: _this.moneyInput ? Math.abs(coData_1.total - (_this.moneyInput.value + moneyCoupon)) : 0 }));
                    },
                    error: function () {
                        _this.pMessageService.couponNotFound();
                        return;
                    }
                });
            }
        }
    };
    PmodalComponent.prototype.calGenerate = function (data) {
    };
    PmodalComponent.prototype.calModal = function () {
        this.calModalEvent.emit();
    };
    __decorate([
        core_1.Output()
    ], PmodalComponent.prototype, "calModalEvent");
    __decorate([
        core_1.Output()
    ], PmodalComponent.prototype, "calModalHide");
    PmodalComponent = __decorate([
        core_1.Component({
            selector: 'p-modal',
            templateUrl: './pmodal.component.html',
            styleUrls: ['./pmodal.component.css']
        })
    ], PmodalComponent);
    return PmodalComponent;
}());
exports.PmodalComponent = PmodalComponent;
