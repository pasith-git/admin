"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DisplayboardsComponent = void 0;
var core_1 = require("@angular/core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var DisplayboardsComponent = /** @class */ (function () {
    function DisplayboardsComponent(branchService, resourceData) {
        this.branchService = branchService;
        this.resourceData = resourceData;
        this.data = [
            { name: 'ສາຂາ', total: this.branchService.totalBranch, icon: free_solid_svg_icons_1.faStore },
        ];
    }
    DisplayboardsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.branchService.getData().subscribe({
            next: function (data) {
                _this.data[0].total = data.length;
            }
        });
    };
    __decorate([
        core_1.ContentChild('pboard')
    ], DisplayboardsComponent.prototype, "pboard");
    DisplayboardsComponent = __decorate([
        core_1.Component({
            selector: 'displayboards',
            templateUrl: './displayboards.component.html',
            styleUrls: ['./displayboards.component.css']
        })
    ], DisplayboardsComponent);
    return DisplayboardsComponent;
}());
exports.DisplayboardsComponent = DisplayboardsComponent;
