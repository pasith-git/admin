"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BillComponent = void 0;
var core_1 = require("@angular/core");
var moment = require("moment");
var BillComponent = /** @class */ (function () {
    function BillComponent(branchService, authService, orderService, rs, route) {
        this.branchService = branchService;
        this.authService = authService;
        this.orderService = orderService;
        this.rs = rs;
        this.route = route;
        this.getId = new core_1.EventEmitter();
        this.billStatus = 'billPayment';
        this.moneyR = 0;
        this.moneyC = 0;
        this.status = false;
        this.ip = '';
    }
    BillComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.image = this.orderService.getImage();
        this.todayDate = moment().format('l');
        this.todayTime = moment().format('LTS');
        this.firstname = this.authService.getFirstname();
        this.branchService.getData().subscribe(function (data) {
            data.map(function (data) {
                _this.loading = true;
                if (data.id.toString() === _this.route.snapshot.params['id']) {
                    _this.branches = data;
                }
                _this.splitAddress = data.address.split(',');
            });
        });
    };
    BillComponent.prototype.ngOnChanges = function (_a) {
        var todayDate = _a.todayDate, todayTime = _a.todayTime;
        this.todayDate = moment().format('l');
        this.todayTime = moment().format('LTS');
    };
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "sepData");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "billHeader");
    __decorate([
        core_1.Output()
    ], BillComponent.prototype, "getId");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "showBillmoney");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "showBillpayment");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "billStatus");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "todayDate");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "todayTime");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "moneyR");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "moneyC");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "billId");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "billTotal");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "couponMoney");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "couponPercent");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "sepTotalPay");
    __decorate([
        core_1.Input()
    ], BillComponent.prototype, "sepBillData");
    BillComponent = __decorate([
        core_1.Component({
            selector: 'bill-for-print',
            templateUrl: './bill.component.html',
            styleUrls: ['./bill.component.css']
        })
    ], BillComponent);
    return BillComponent;
}());
exports.BillComponent = BillComponent;
