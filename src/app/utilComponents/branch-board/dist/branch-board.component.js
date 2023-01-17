"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BranchBoardComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var BranchBoardComponent = /** @class */ (function () {
    function BranchBoardComponent(userService, router, utilService, menuService, productService, productTypeService, unitService, stockService, stockUnitService, printerService, categoryService, stockinService, stockOutService, couponService, cbr) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this.utilService = utilService;
        this.menuService = menuService;
        this.productService = productService;
        this.productTypeService = productTypeService;
        this.unitService = unitService;
        this.stockService = stockService;
        this.stockUnitService = stockUnitService;
        this.printerService = printerService;
        this.categoryService = categoryService;
        this.stockinService = stockinService;
        this.stockOutService = stockOutService;
        this.couponService = couponService;
        this.cbr = cbr;
        this.branchBoardList = [];
        this.utilService.subChange.subscribe(function (data) {
            _this.getBranchBoard();
        });
    }
    BranchBoardComponent.prototype.ngOnInit = function () {
        this.brchId = parseInt(this.router.url.split('/')[2]);
        this.getBranchBoard();
    };
    BranchBoardComponent.prototype.getBranchBoard = function () {
        var _this = this;
        rxjs_1.zip(this.userService.getDataByBranch(this.brchId), this.menuService.findAll(this.brchId), this.productService.findAll(this.brchId), this.productTypeService.findAll(this.brchId), this.unitService.findAll(this.brchId), this.stockService.findAll(this.brchId), this.stockUnitService.findAll(this.brchId), this.categoryService.findAll(this.brchId), this.printerService.findAll(this.brchId), this.couponService.findAll(this.brchId), this.stockinService.findAll(this.brchId), this.stockOutService.findAll(this.brchId)).subscribe({
            next: function (_a) {
                var user = _a[0], menu = _a[1], product = _a[2], productType = _a[3], unit = _a[4], stock = _a[5], stockUnit = _a[6], category = _a[7], printer = _a[8], coupon = _a[9], stockIn = _a[10], stockOut = _a[11];
                _this.branchBoardList[0] = { name: 'ຜູ້ໃຊ້', value: user.length, type: 'ຄົນ' };
                _this.branchBoardList[1] = { name: 'ເມນູ', value: menu.length, type: 'ລາຍການ' };
                _this.branchBoardList[2] = { name: 'ສິນຄ້າ', value: product.length, type: 'ລາຍການ' };
                _this.branchBoardList[3] = { name: 'ປະເພດສິນຄ້າ', value: productType.length, type: 'ລາຍການ' };
                _this.branchBoardList[4] = { name: 'ຫົວໜ່ວຍ', value: unit.length, type: 'ລາຍການ' };
                _this.branchBoardList[5] = { name: 'ສະຕ໊ອກ', value: stock.length, type: 'ລາຍການ' };
                _this.branchBoardList[6] = { name: 'ສະຕ໊ອກຫົວໜ່ວຍ', value: stockUnit.length, type: 'ລາຍການ' };
                _this.branchBoardList[7] = { name: 'ປະເພດ', value: category.length, type: 'ລາຍການ' };
                _this.branchBoardList[8] = { name: 'ປິ່ນເຕີ້', value: printer.length, type: 'ລາຍການ' };
                _this.branchBoardList[9] = { name: 'ຄູປອງ', value: coupon.length, type: 'ລາຍການ' };
                _this.branchBoardList[10] = { name: 'ຮັບສິນຄ້າເຂົ້າ', value: stockIn.length, type: 'ລາຍການ' };
                _this.branchBoardList[11] = { name: 'ນຳສິນຄ້າອອກ', value: stockOut.length, type: 'ລາຍການ' };
            },
            error: function () {
                _this.branchBoardList = [];
                return;
            }
        });
    };
    BranchBoardComponent = __decorate([
        core_1.Component({
            selector: 'app-branch-board',
            templateUrl: './branch-board.component.html',
            styleUrls: ['./branch-board.component.css']
        })
    ], BranchBoardComponent);
    return BranchBoardComponent;
}());
exports.BranchBoardComponent = BranchBoardComponent;
