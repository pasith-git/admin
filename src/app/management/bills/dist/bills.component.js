"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BillsComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var BillsComponent = /** @class */ (function () {
    function BillsComponent(orderService, route, router, ngxSpinService, pMsgService) {
        this.orderService = orderService;
        this.route = route;
        this.router = router;
        this.ngxSpinService = ngxSpinService;
        this.pMsgService = pMsgService;
        this.dataSub = new rxjs_1.Subject();
        this.data = [];
        this.defaultData = [];
        this.loading = false;
    }
    BillsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngxSpinService.show();
        this.paramId = this.route.snapshot.params['id'];
        this.dataSub.subscribe({
            next: function (data) {
                _this.data = data;
                _this.defaultData = data;
            },
            complete: function () {
                _this.ngxSpinService.hide();
            }
        });
        this.orderService.getOrderDataStatus('pending', this.paramId).subscribe({
            next: function (data) {
                _this.dataSub.next(data);
            },
            error: function (err) {
                if (err.status === 404) {
                    _this.ngxSpinService.hide();
                    _this.loading = true;
                }
                else {
                    _this.ngxSpinService.hide();
                }
            },
            complete: function () {
                _this.loading = true;
                _this.ngxSpinService.hide();
            }
        });
    };
    BillsComponent.prototype.tableSearchEvent = function (tableSearch) {
        var _this = this;
        var tableSearchEle = document.getElementById('tableSearch');
        if (tableSearchEle) {
            tableSearchEle.onkeyup = function (e) {
                var filterData = _this.defaultData.filter(function (value) {
                    return value.tableName.includes(tableSearch);
                });
                _this.data = filterData;
            };
        }
    };
    BillsComponent.prototype.ngOnChanges = function (changes) {
    };
    BillsComponent.prototype.ngAfterContentInit = function () {
    };
    BillsComponent = __decorate([
        core_1.Component({
            selector: 'app-bills',
            templateUrl: './bills.component.html',
            styleUrls: ['./bills.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.Default
        })
    ], BillsComponent);
    return BillsComponent;
}());
exports.BillsComponent = BillsComponent;
