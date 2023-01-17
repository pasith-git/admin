"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TableBoxComponent = void 0;
var core_1 = require("@angular/core");
var _ = require("lodash");
var pmodal_component_1 = require("src/app/utilComponents/pmodal/pmodal.component");
var TableBoxComponent = /** @class */ (function () {
    function TableBoxComponent(router, route) {
        this.router = router;
        this.route = route;
        this._value = [];
    }
    Object.defineProperty(TableBoxComponent.prototype, "data", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            var sort = _.sortBy(value, function (_a) {
                var tableName = _a.tableName;
                return tableName;
            });
            this._value = sort;
        },
        enumerable: false,
        configurable: true
    });
    TableBoxComponent.prototype.ngOnInit = function () {
        this.bchParam = this.route.snapshot.params['id'];
    };
    TableBoxComponent.prototype.ngAfterViewInit = function () {
    };
    __decorate([
        core_1.Input()
    ], TableBoxComponent.prototype, "data");
    __decorate([
        core_1.ViewChildren(pmodal_component_1.PmodalComponent)
    ], TableBoxComponent.prototype, "pmodal");
    TableBoxComponent = __decorate([
        core_1.Component({
            selector: 'table-box',
            templateUrl: './table-box.component.html',
            styleUrls: ['./table-box.component.css']
        })
    ], TableBoxComponent);
    return TableBoxComponent;
}());
exports.TableBoxComponent = TableBoxComponent;
