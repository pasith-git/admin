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
exports.CheckoutComponent = void 0;
var core_1 = require("@angular/core");
var ngx_print_1 = require("ngx-print");
var rxjs_1 = require("rxjs");
var order_model_1 = require("src/app/models/order.model");
var pmodal_component_1 = require("src/app/utilComponents/pmodal/pmodal.component");
var moment = require("moment");
var psepmodal_component_1 = require("src/app/utilComponents/psepmodal/psepmodal.component");
var checkout_reducers_1 = require("./checkout.reducers");
var checkout_actions_1 = require("./checkout.actions");
var order_dto_1 = require("src/app/dto/order.dto");
var index_util_1 = require("src/app/utilConstant/index.util");
var CheckoutComponent = /** @class */ (function () {
    function CheckoutComponent(orderService, route, router, pMessage, ngxSpinService, confirmDialog, couponService, store, couponNgrx, cd, testService, resourcesService) {
        this.orderService = orderService;
        this.route = route;
        this.router = router;
        this.pMessage = pMessage;
        this.ngxSpinService = ngxSpinService;
        this.confirmDialog = confirmDialog;
        this.couponService = couponService;
        this.store = store;
        this.couponNgrx = couponNgrx;
        this.cd = cd;
        this.testService = testService;
        this.resourcesService = resourcesService;
        this.hidden = true;
        this.cols = order_model_1.billCheckOrderCol;
        this.dataSub = new rxjs_1.Subject();
        this.billMenu = [
            { name: 'ລວມເງິນ', label: 'subtotal', value: 0 },
            { name: 'ສ່ວນຫຼຸດ', label: 'discount', value: 0 },
            { name: "\u0EA1\u0EB9\u0E99\u0E84\u0EC8\u0EB2\u0EAD\u0EB2\u0E81\u0EAD\u0E99", label: 'tax', value: 0 },
            { name: 'ລວມເງິນທັງໝົດ', label: 'total', value: 0 },
        ];
        /* coupon */
        this.couponPercent = 0;
        this.couponPercentDisplay = 0;
        this.couponMoney = 0;
        this.couponMoneyDisplay = 0;
        this.moneyReceive = 0;
        this.moneyChange = 0;
        /* bank */
        this.rnBank = 'ວ່າງ';
        this.bankName = 'ວ່າງ';
        this.currencyM = [
            { name: "ບາດ", rate: 0, value: 0, code: "THB" },
            { name: "ດອນລ່າ", rate: 0, value: 0, code: "USD" },
        ];
        this.total = 0;
        this.discount = 0;
        this.vat = 0;
        this.totalVat = 0;
        this.paidMoney = 0;
        this.needPay = 0;
        this.selectedData = [];
        /* for cal function */
        this.calDisplay = false;
        this.calDisplaySep = false;
        this.test = new rxjs_1.Subject();
        this.spBill$ = this.store.select(checkout_reducers_1.getSpBill);
    }
    CheckoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        this.sp = this.store.select(checkout_reducers_1.getSpBill);
        this.ngxSpinService.show();
        this.tableId = (_a = this.route.firstChild) === null || _a === void 0 ? void 0 : _a.snapshot.params['tid'];
        this.bchId = this.route.snapshot.params['id'];
        this.dataSub.subscribe({
            next: function (data) {
                var result = [data].map(function (value) {
                    [];
                    var orderdetails = value.orderdetails.map(function (ordValue) {
                        return __assign(__assign({}, ordValue), { read: false });
                    });
                    return __assign(__assign({}, value), { orderdetails: orderdetails });
                });
                _this.data = result;
            },
            error: function (err) {
            }
        });
        this.orderService.getOrderById(this.bchId, this.tableId, 'pending').subscribe({
            next: function (data) {
                _this.dataSub.next(data);
                _this.dataVAT = data.tariff;
                _this.currencyM[0].rate = data.excTHB;
                _this.currencyM[1].rate = data.excUSD;
                _this.currencyM[0].value = data.moneyBalance / _this.currencyM[0].rate;
                _this.currencyM[1].value = data.moneyBalance / _this.currencyM[1].rate;
                _this.total = data.total;
                _this.vat = data.moneyVat;
                _this.tariff = data.tariff;
                _this.totalVat = data.totalVat;
                _this.paidMoney = data.moneyUpfrontPay;
                _this.needPay = data.moneyBalance;
            },
            error: function (data) {
                _this.router.navigate(['checkout', _this.bchId]);
            },
            complete: function () {
                _this.hidden = false;
                _this.ngxSpinService.hide();
            }
        });
    };
    CheckoutComponent.prototype.ngAfterContentInit = function () {
    };
    CheckoutComponent.prototype.payment = function () {
        this.pmodal.visible = true;
    };
    /* get coupon state */
    CheckoutComponent.prototype.paymentConfirm = function (_a) {
        var moneyInput = _a.moneyInput, moneyChange = _a.moneyChange, rnBankInput = _a.rnBankInput, bankNameInput = _a.bankNameInput, couponMoney = _a.couponMoney;
        var needPay = this.couponNgrx.couponState.couponMoney ? this.needPay - couponMoney : this.needPay;
        if (this.paymentType === 'cash') {
            if (moneyInput >= needPay) {
                this.billTotal = needPay;
                this.couponPercentDisplay = couponMoney ? this.couponPercent : 0;
                this.couponMoneyDisplay = couponMoney ? this.couponMoney : 0;
                this.pmodal.visible = false;
                this.moneyReceive = moneyInput;
                this.moneyChange = moneyChange;
                this.orderService.setLocalMoneyReceive(this.moneyReceive.toString());
                this.orderService.setLocalMoneyChange(this.moneyChange.toString());
                this.pMessage.putMoneySuccess();
            }
            else {
                this.pMessage.moneyIsNotEnough();
            }
        }
        else {
            if (moneyInput >= needPay && rnBankInput) {
                this.pmodal.visible = false;
                /* bank info */
                this.billTotal = needPay;
                this.couponPercentDisplay = this.couponPercent;
                this.couponMoneyDisplay = this.couponMoney;
                this.rnBank = rnBankInput;
                this.bankName = bankNameInput.name;
                this.bankId = bankNameInput.id;
                this.moneyReceive = moneyInput;
                this.moneyChange = moneyChange;
                this.orderService.setLocalMoneyReceive(this.moneyReceive.toString());
                this.orderService.setLocalMoneyChange(this.moneyChange.toString());
                this.pMessage.putMoneySuccess();
            }
            else if (moneyInput < this.needPay && !rnBankInput) {
                this.pMessage.emptyBillpayment();
            }
            else if (rnBankInput === null) {
                this.pMessage.rnBankFailed();
            }
            else {
                this.pMessage.moneyIsNotEnough();
            }
        }
    };
    CheckoutComponent.prototype.payBillgetMoney = function () {
        this.todayDate = moment().format('l');
        this.todayTime = moment().format('LTS');
    };
    CheckoutComponent.prototype.payBillPaymentT = function () {
        this.todayDate = moment().format('l');
        this.todayTime = moment().format('LTS');
    };
    CheckoutComponent.prototype.payBillPaymentF = function () {
        this.pMessage.billPaymentWarn();
    };
    CheckoutComponent.prototype.orderPayment = function () {
        var _this = this;
        if (this.paymentType) {
            if (this.paymentType === 'cash') {
                if (this.moneyReceive && this.moneyChange) {
                    this.confirmDialog.confirm({
                        message: 'ຢືນຢັນການຊຳລະ',
                        accept: function () {
                            _this.ngxSpinService.show();
                            var putData;
                            _this.data.map(function (data) {
                                var mdData = {
                                    orderId: data.id,
                                    restaurantId: data.restaurantId,
                                    branchId: data.branchId,
                                    tableId: data.tableId,
                                    total: data.total,
                                    amount: data.amount,
                                    moneyCoupon: _this.couponNgrx.couponState.couponMoney || 0,
                                    moneyDiscount: _this.couponNgrx.couponState.couponPercent || 0,
                                    moneyUpfrontPay: 0,
                                    moneyReceived: _this.moneyReceive,
                                    moneyChange: _this.moneyChange,
                                    tariff: data.tariff,
                                    moneyVat: data.moneyVat,
                                    totalVat: data.totalVat,
                                    isStatus: index_util_1.Status.success,
                                    paymentType: _this.paymentType,
                                    couponCode: _this.couponNgrx.couponState.couponCode || undefined
                                };
                                putData = mdData;
                                ;
                            });
                            _this.orderService.orderPayment(putData).subscribe({
                                next: function () {
                                    _this.pMessage.paymentSuccess();
                                    _this.router.navigate(['checkout', _this.bchId]);
                                },
                                complete: function () {
                                    _this.ngxSpinService.hide();
                                }
                            });
                        }
                    });
                }
                else {
                    this.pMessage.billPaymentWarn();
                }
            }
            else {
                /* bank */
                if (this.moneyReceive && this.moneyChange && this.rnBank) {
                    this.confirmDialog.confirm({
                        message: 'ຢືນຢັນການຊຳລະ',
                        accept: function () {
                            _this.ngxSpinService.show();
                            var putData;
                            _this.data.map(function (data) {
                                var mdData = {
                                    orderId: data.id,
                                    restaurantId: data.restaurantId,
                                    branchId: data.branchId,
                                    tableId: data.tableId,
                                    bankId: _this.bankId,
                                    total: data.total,
                                    amount: data.amount,
                                    moneyCoupon: _this.couponNgrx.couponState.couponMoney || 0,
                                    moneyDiscount: _this.couponNgrx.couponState.couponPercent || 0,
                                    moneyUpfrontPay: 0,
                                    moneyReceived: _this.moneyReceive,
                                    moneyChange: _this.moneyChange,
                                    tariff: data.tariff,
                                    moneyVat: data.moneyVat,
                                    totalVat: data.totalVat,
                                    isStatus: index_util_1.Status.success,
                                    paymentType: _this.paymentType,
                                    referenceNumber: _this.rnBank
                                };
                                putData = mdData;
                            });
                            _this.orderService.orderPayment(putData).subscribe({
                                next: function () {
                                    _this.pMessage.paymentSuccess();
                                    _this.router.navigate(['checkout', _this.bchId]);
                                },
                                complete: function () {
                                    _this.ngxSpinService.hide();
                                }
                            });
                        }
                    });
                }
                else {
                    this.pMessage.billPaymentWarn();
                }
            }
        }
        else {
            this.pMessage.billPaymentWarn();
        }
    };
    /* sep modal function */
    CheckoutComponent.prototype.sepPayment = function () {
        var _this = this;
        this.selectedData = [];
        this.orderDetailQuery.map(function (data) {
            var _a;
            if (data.model) {
                (_a = _this.selectedData).push.apply(_a, data.model);
            }
        });
        this.sepTotal = 0;
        this.sepVat = 0;
        this.sepTotalPay = 0;
        this.selectedData.map(function (data) {
            _this.sepTotal += data.total;
            _this.sepVat += data.total * (_this.tariff / 100);
            _this.sepTotalPay += data.total + data.total * (_this.tariff / 100);
        });
        this.sepVat = Math.floor(this.sepVat);
        if (this.sepTotalPay <= this.needPay) {
            this.psepmodal.visible = true;
        }
        else {
            this.pMessage.defaultError();
        }
    };
    /* sep payment from payResult */
    CheckoutComponent.prototype.sepPaymentConfirm = function (_a) {
        var _this = this;
        var freeMoneyChangeInput = _a.freeMoneyChangeInput, status = _a.status, rnBankInput = _a.rnBankInput, order = _a.order, moneyChange = _a.moneyChange, op = _a.op;
        if (status === 'cash') {
            if (this.sepTotalPay) {
                /* sep cash */
                if (op.moneyInput >= op.sepTotalPay) {
                    this.selectedData = [];
                    this.orderDetailQuery.map(function (data, index) {
                        if (data.model.length) {
                            _this.selectedData[index] = data.model[0];
                            return;
                        }
                        _this.selectedData[index] = false;
                    });
                    var localDtoUpdateOd_1 = [];
                    this.selectedData.map(function (data, index) {
                        if (_this.selectedData[index]) {
                            localDtoUpdateOd_1.push(data);
                            return;
                        }
                    });
                    var dtoUpdateOd = localDtoUpdateOd_1.map(function (_a) {
                        var id = _a.id, orderId = _a.orderId, restaurantId = _a.restaurantId, branchId = _a.branchId, bankId = _a.bankId, tableId = _a.tableId, menuId = _a.menuId, price = _a.price, amount = _a.amount, total = _a.total;
                        return {
                            orderDetailId: id,
                            orderId: orderId,
                            restaurantId: restaurantId,
                            branchId: branchId,
                            tableId: tableId,
                            menuId: menuId,
                            bankId: bankId,
                            price: price,
                            amount: amount,
                            total: total,
                            isStatus: 'paid',
                            paymentType: 'cash',
                            comment: "that's my favvority food",
                            reason: "Best food or healthy",
                            referenceNumber: null
                        };
                    });
                    /* order data dto */
                    var id = order.id, branchId = order.branchId, restaurantId = order.restaurantId, tableId = order.tableId, moneyCoupon = order.moneyCoupon, moneyDiscount = order.moneyDiscount;
                    var resultDto = {
                        orderId: id,
                        bankId: null,
                        restaurantId: restaurantId,
                        branchId: branchId,
                        tableId: tableId,
                        moneyCoupon: this.couponMoney ? this.couponMoney : 0,
                        moneyDiscount: this.couponPercent ? this.couponPercent : 0,
                        moneyUpfrontPay: this.sepTotalPay,
                        moneyReceived: op.moneyInput,
                        moneyChange: moneyChange,
                        isStatus: order_dto_1.OrderStatus.pending,
                        paymentType: order_dto_1.PaymentType.cash,
                        referenceNumber: null,
                        orderdetails: dtoUpdateOd
                    };
                    this.orderService.orderPayment(resultDto).subscribe({
                        next: function () {
                            _this.ngxSpinService.show();
                            _this.orderService.getOrderById(_this.bchId, _this.tableId, 'pending').subscribe({
                                next: function (data) {
                                    _this.dataSub.next(data);
                                    _this.dataVAT = data.tariff;
                                    _this.currencyM[0].rate = data.excTHB;
                                    _this.currencyM[1].rate = data.excUSD;
                                    _this.currencyM[0].value = data.moneyBalance / _this.currencyM[0].rate;
                                    _this.currencyM[1].value = data.moneyBalance / _this.currencyM[1].rate;
                                    _this.total = data.total;
                                    _this.vat = data.moneyVat;
                                    _this.tariff = data.tariff;
                                    _this.totalVat = data.totalVat;
                                    _this.paidMoney = data.moneyUpfrontPay;
                                    _this.needPay = data.moneyBalance;
                                },
                                error: function () {
                                    _this.router.navigate(['checkout', _this.bchId]);
                                }
                            });
                        },
                        complete: function () {
                            _this.ngxSpinService.hide();
                            _this.psepmodal.visible = false;
                            _this.pMessage.success();
                        }
                    });
                }
                else {
                    this.pMessage.defaultError();
                }
            }
            else {
                var result = this.data.map(function (value) {
                    var orderUpdate = {
                        orderId: value.id,
                        restaurantId: value.restaurantId,
                        branchId: value.branchId,
                        tableId: value.tableId,
                        total: value.total,
                        amount: value.amount,
                        moneyCoupon: _this.couponMoney || 0,
                        moneyDiscount: _this.couponPercent || 0,
                        moneyUpfrontPay: op.sepTotalPay + _this.couponMoney,
                        moneyReceived: op.moneyInput,
                        moneyChange: moneyChange,
                        tariff: value.tariff,
                        moneyVat: value.moneyVat,
                        totalVat: value.totalVat,
                        isStatus: order_dto_1.OrderStatus.pending,
                        paymentType: order_dto_1.PaymentType.cash,
                        referenceNumber: null,
                        orderdetails: null
                    };
                    return orderUpdate;
                });
                this.orderService.orderPayment(result[0]).subscribe({
                    next: function () {
                        _this.ngxSpinService.show();
                        _this.orderService.getOrderById(_this.bchId, _this.tableId, 'pending').subscribe({
                            next: function (data) {
                                _this.dataSub.next(data);
                                _this.dataVAT = data.tariff;
                                _this.currencyM[0].rate = data.excTHB;
                                _this.currencyM[1].rate = data.excUSD;
                                _this.currencyM[0].value = data.moneyBalance / _this.currencyM[0].rate;
                                _this.currencyM[1].value = data.moneyBalance / _this.currencyM[1].rate;
                                _this.total = data.total;
                                _this.vat = data.moneyVat;
                                _this.tariff = data.tariff;
                                _this.totalVat = data.totalVat;
                                _this.paidMoney = data.moneyUpfrontPay;
                                _this.needPay = data.moneyBalance;
                            },
                            error: function () {
                                _this.pMessage.success();
                                _this.router.navigate(['checkout', _this.bchId]);
                            }
                        });
                    },
                    error: function () {
                    },
                    complete: function () {
                        _this.ngxSpinService.hide();
                        _this.psepmodal.visible = false;
                        _this.pMessage.success();
                    }
                });
            }
        }
        else {
            if (this.sepTotalPay) {
                if (op.moneyInput >= op.sepTotalPay && op.rnBank) {
                    this.selectedData = [];
                    this.orderDetailQuery.map(function (data, index) {
                        if (data.model.length) {
                            _this.selectedData[index] = data.model[0];
                            return;
                        }
                        _this.selectedData[index] = false;
                    });
                    var localDtoUpdateOd_2 = [];
                    this.selectedData.map(function (data, index) {
                        if (_this.selectedData[index]) {
                            localDtoUpdateOd_2.push(data);
                            return;
                        }
                    });
                    var dtoUpdateOd = localDtoUpdateOd_2.map(function (_a) {
                        var id = _a.id, orderId = _a.orderId, restaurantId = _a.restaurantId, branchId = _a.branchId, bankId = _a.bankId, tableId = _a.tableId, menuId = _a.menuId, price = _a.price, amount = _a.amount, total = _a.total;
                        return {
                            orderDetailId: id,
                            orderId: orderId,
                            restaurantId: restaurantId,
                            branchId: branchId,
                            tableId: tableId,
                            menuId: menuId,
                            bankId: bankId,
                            price: price,
                            amount: amount,
                            total: total,
                            isStatus: 'pending',
                            paymentType: 'bank',
                            comment: "that's my favvority food",
                            reason: "Best food or healthy",
                            referenceNumber: op.rnBank
                        };
                    });
                    /* order data dto */
                    var id = order.id, branchId = order.branchId, restaurantId = order.restaurantId, tableId = order.tableId, moneyCoupon = order.moneyCoupon, moneyDiscount = order.moneyDiscount;
                    var resultDto = {
                        orderId: id,
                        bankId: null,
                        restaurantId: restaurantId,
                        branchId: branchId,
                        tableId: tableId,
                        moneyCoupon: this.couponMoney ? this.couponMoney : 0,
                        moneyDiscount: this.couponPercent ? this.couponPercent : 0,
                        moneyUpfrontPay: this.sepTotalPay,
                        moneyReceived: op.moneyInput,
                        moneyChange: moneyChange,
                        isStatus: order_dto_1.OrderStatus.pending,
                        paymentType: order_dto_1.PaymentType.bank,
                        referenceNumber: null,
                        orderdetails: dtoUpdateOd
                    };
                    this.orderService.orderPayment(resultDto).subscribe({
                        next: function () {
                            _this.ngxSpinService.show();
                            _this.orderService.getOrderById(_this.bchId, _this.tableId, 'pending').subscribe({
                                next: function (data) {
                                    if (data) {
                                        _this.dataSub.next(data);
                                        _this.dataVAT = data.tariff;
                                        _this.currencyM[0].rate = data.excTHB;
                                        _this.currencyM[1].rate = data.excUSD;
                                        _this.currencyM[0].value = data.moneyBalance / _this.currencyM[0].rate;
                                        _this.currencyM[1].value = data.moneyBalance / _this.currencyM[1].rate;
                                        _this.total = data.total;
                                        _this.vat = data.moneyVat;
                                        _this.tariff = data.tariff;
                                        _this.totalVat = data.totalVat;
                                        _this.paidMoney = data.moneyUpfrontPay;
                                        _this.needPay = data.moneyBalance;
                                    }
                                    else {
                                        _this.router.navigate(['checkout', _this.bchId]);
                                    }
                                },
                                error: function () {
                                    _this.router.navigate(['checkout', _this.bchId]);
                                }
                            });
                        },
                        complete: function () {
                            _this.ngxSpinService.hide();
                            _this.psepmodal.visible = false;
                            _this.pMessage.success();
                        }
                    });
                }
                else {
                    this.pMessage.defaultError();
                }
            }
            else {
                var result = this.data.map(function (value) {
                    var orderUpdate = {
                        orderId: value.id,
                        restaurantId: value.restaurantId,
                        branchId: value.branchId,
                        bankId: op.bankName.code,
                        tableId: value.tableId,
                        total: value.total,
                        amount: value.amount,
                        moneyCoupon: _this.couponMoney || 0,
                        moneyDiscount: _this.couponPercent || 0,
                        moneyUpfrontPay: op.sepTotalPay + _this.couponMoney,
                        moneyReceived: op.moneyInput,
                        moneyChange: moneyChange,
                        tariff: value.tariff,
                        moneyVat: value.moneyVat,
                        totalVat: value.totalVat,
                        isStatus: order_dto_1.OrderStatus.pending,
                        paymentType: order_dto_1.PaymentType.bank,
                        referenceNumber: rnBankInput,
                        orderdetails: op.rnBank
                    };
                    return orderUpdate;
                });
                this.orderService.orderPayment(result[0]).subscribe({
                    next: function () {
                        _this.ngxSpinService.show();
                        _this.orderService.getOrderById(_this.bchId, _this.tableId, 'pending').subscribe({
                            next: function (data) {
                                _this.dataSub.next(data);
                                _this.dataVAT = data.tariff;
                                _this.currencyM[0].rate = data.excTHB;
                                _this.currencyM[1].rate = data.excUSD;
                                _this.currencyM[0].value = data.moneyBalance / _this.currencyM[0].rate;
                                _this.currencyM[1].value = data.moneyBalance / _this.currencyM[1].rate;
                                _this.total = data.total;
                                _this.vat = data.moneyVat;
                                _this.tariff = data.tariff;
                                _this.totalVat = data.totalVat;
                                _this.paidMoney = data.moneyUpfrontPay;
                                _this.needPay = data.moneyBalance;
                            },
                            error: function () {
                                _this.pMessage.success();
                                _this.router.navigate(['checkout', _this.bchId]);
                            }
                        });
                    },
                    error: function () {
                    },
                    complete: function () {
                        _this.ngxSpinService.hide();
                        _this.psepmodal.visible = false;
                        _this.pMessage.success();
                    }
                });
            }
        }
    };
    /* put data to sep bill */
    CheckoutComponent.prototype.genBillData = function (moneyInput, freeMoneyChange, change, sepMoneyTotal) {
        var _this = this;
        this.data.map(function (value) {
            _this.store.dispatch(checkout_actions_1.spCheckout({
                billName: value.billNumber,
                tableName: value.tableName,
                total: value.moneyBalance,
                tariff: value.tariff,
                orderCount: value.orderdetails.length,
                totalVat: value.totalVat,
                vat: value.moneyVat,
                change: change,
                received: moneyInput,
                sepMoney: freeMoneyChange,
                needPay: sepMoneyTotal ? sepMoneyTotal : value.totalVat - _this.paidMoney,
                paidMoney: value.moneyUpfrontPay,
                bath: sepMoneyTotal && sepMoneyTotal / value.excTHB,
                usd: sepMoneyTotal && sepMoneyTotal / value.excUSD,
                excBath: value.excTHB,
                excUSD: value.excUSD,
                sepMoneyChange: freeMoneyChange
            }));
        });
    };
    /* print bill */
    CheckoutComponent.prototype.printBill = function (id) {
        this.todayDate = moment().format('l');
        this.todayTime = moment().format('LTS');
        this.printer.printSectionId = id;
        this.printer.print();
        this.printer.printSectionId = '';
        this.printer.printSectionId = 'bill-getMoney-print';
    };
    CheckoutComponent.prototype.sepPrintBill = function (_a) {
        var _this = this;
        var freeMoneyChangeInput = _a.freeMoneyChangeInput, moneyChange = _a.moneyChange, moneyInput = _a.moneyInput, op = _a.op;
        if (this.paymentType === 'cash') {
            if (freeMoneyChangeInput && moneyInput) {
                if (freeMoneyChangeInput <= moneyInput) {
                    setTimeout(function () {
                        _this.genBillData(moneyInput, freeMoneyChangeInput, moneyChange, op.moneySepSelfPay);
                    }, 0);
                    setTimeout(function () {
                        _this.printBill("sep-bill-payment-print");
                    }, 0);
                }
                else {
                    this.pMessage.billPaymentWarn();
                }
                /* ປິ້ນບິນຕາມລາຍການ */
            }
            else if (moneyInput) {
                this.selectedData = [];
                this.orderDetailQuery.map(function (data, index) {
                    if (data.model.length) {
                        _this.selectedData[index] = data.model[0];
                    }
                    else {
                        _this.selectedData[index] = false;
                    }
                });
                /* filter two arrays */
                var resultSep_1 = 0;
                this.selectedData.map(function (data) {
                    if (data) {
                        resultSep_1 += data.price + (data.price * _this.tariff / 100);
                    }
                });
                var result_1 = [];
                this.data[0].orderdetails.map(function (data, index) {
                    var match = false;
                    _this.selectedData.map(function (od) {
                        if (data.id === od.id) {
                            result_1.push(__assign(__assign({}, data), { cb: true }));
                            match = true;
                            return;
                        }
                    });
                    if (!match) {
                        result_1.push(data);
                    }
                });
                /* const resultSepCoupon = this.couponMoney ? resultSep - this.couponMoney : resultSep; */
                if (moneyInput >= op.sepTotalPay) {
                    setTimeout(function () {
                        _this.genBillData(moneyInput, moneyChange, undefined, op.sepTotalPay);
                        _this.sepBillData = result_1;
                    }, 0);
                    setTimeout(function () {
                        _this.printBill("sep-bill-menu-payment-print");
                    }, 0);
                }
                else {
                    this.pMessage.defaultError();
                }
            }
            else {
                this.pMessage.emptyBillpayment();
            }
        }
        else {
            if (freeMoneyChangeInput && moneyInput) {
                if (freeMoneyChangeInput <= moneyInput) {
                    setTimeout(function () {
                        _this.genBillData(moneyInput, freeMoneyChangeInput, moneyChange, op.moneySepSelfPay);
                    }, 0);
                    setTimeout(function () {
                        _this.printBill("sep-bill-payment-print");
                    }, 0);
                }
                else {
                    this.pMessage.billPaymentWarn();
                }
            }
            else if (moneyInput) {
                this.selectedData = [];
                this.orderDetailQuery.map(function (data, index) {
                    if (data.model.length) {
                        _this.selectedData[index] = data.model[0];
                    }
                    else {
                        _this.selectedData[index] = false;
                    }
                });
                /* filter two arrays */
                var resultSep_2 = 0;
                this.selectedData.map(function (data) {
                    if (data) {
                        resultSep_2 += data.price + (data.price * _this.tariff / 100);
                    }
                });
                var result_2 = [];
                this.data[0].orderdetails.map(function (data) {
                    var match = false;
                    _this.selectedData.map(function (od) {
                        if (data.id === od.id) {
                            result_2.push(__assign(__assign({}, data), { cb: true }));
                            match = true;
                            return;
                        }
                    });
                    if (!match) {
                        result_2.push(data);
                    }
                });
                if (moneyInput >= op.sepTotalPay) {
                    setTimeout(function () {
                        _this.genBillData(moneyInput, moneyChange, undefined, op.sepTotalPay);
                        _this.sepBillData = result_2;
                    }, 0);
                    setTimeout(function () {
                        _this.printBill("sep-bill-menu-payment-print");
                    }, 0);
                }
                else {
                    this.pMessage.defaultError();
                }
            }
            else {
                this.pMessage.emptyBillpayment();
            }
        }
    };
    CheckoutComponent.prototype.setDefaultCoupon = function () {
        this.couponPercent = 0;
        this.couponMoney = 0;
        this.cd.detectChanges();
    };
    CheckoutComponent.prototype.findCoupon = function (_a) {
        var _this = this;
        var couponInput = _a.couponInput, moneyBalance = _a.mb;
        this.couponService.findCoupon(this.bchId, couponInput).subscribe({
            next: function (data) {
                if (data.message) {
                    _this.pMessage.couponExpired();
                }
                else {
                    _this.couponNgrx.update({
                        couponPercent: data.percentAmount,
                        couponMoney: moneyBalance * (data.percentAmount / 100)
                    });
                    _this.couponPercent = _this.couponNgrx.couponState.couponPercent;
                    _this.couponMoney = _this.couponNgrx.couponState.couponMoney;
                    _this.pMessage.couponAdded();
                }
            },
            error: function () {
                _this.couponPercent = 0;
                _this.couponMoney = 0;
                _this.couponInput = null;
                _this.pMessage.couponNotFound();
            }
        });
    };
    CheckoutComponent.prototype.getResultFromCal = function (_a) {
        var calResult = _a.calResult;
        if (this.calDisplay) {
            this.pmodalChild.calGenerate(calResult);
        }
        else {
            this.pSepModalChild.calGenerate(calResult);
        }
    };
    CheckoutComponent.prototype.calModal = function () {
        this.calChild1.calReset();
        this.calDisplay = !this.calDisplay;
    };
    CheckoutComponent.prototype.calModalSep = function () {
        this.calChild2.calReset();
        this.calDisplaySep = !this.calDisplaySep;
    };
    CheckoutComponent.prototype.calModalHide = function () {
        if (this.calDisplay) {
            this.calDisplay = false;
        }
        else {
            this.calDisplaySep = false;
        }
    };
    __decorate([
        core_1.ViewChildren('cbod')
    ], CheckoutComponent.prototype, "orderDetailQuery");
    __decorate([
        core_1.ViewChild('dt')
    ], CheckoutComponent.prototype, "dt");
    __decorate([
        core_1.ViewChild(pmodal_component_1.PmodalComponent)
    ], CheckoutComponent.prototype, "pmodal");
    __decorate([
        core_1.ViewChild(psepmodal_component_1.PsepmodalComponent)
    ], CheckoutComponent.prototype, "psepmodal");
    __decorate([
        core_1.ViewChild(ngx_print_1.NgxPrintDirective)
    ], CheckoutComponent.prototype, "printer");
    __decorate([
        core_1.ViewChild(pmodal_component_1.PmodalComponent)
    ], CheckoutComponent.prototype, "pmodalChild");
    __decorate([
        core_1.ViewChild(psepmodal_component_1.PsepmodalComponent)
    ], CheckoutComponent.prototype, "pSepModalChild");
    __decorate([
        core_1.ViewChild('calChild1')
    ], CheckoutComponent.prototype, "calChild1");
    __decorate([
        core_1.ViewChild('calChild2')
    ], CheckoutComponent.prototype, "calChild2");
    CheckoutComponent = __decorate([
        core_1.Component({
            selector: 'app-checkout',
            templateUrl: './checkout.component.html',
            styleUrls: ['./checkout.component.css']
        })
    ], CheckoutComponent);
    return CheckoutComponent;
}());
exports.CheckoutComponent = CheckoutComponent;
