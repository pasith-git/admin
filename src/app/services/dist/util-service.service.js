"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UtilServiceService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var UtilServiceService = /** @class */ (function () {
    function UtilServiceService() {
        var _this = this;
        this.subChange = new rxjs_1.Subject();
        this.subChange.subscribe(function (value) {
            _this.subValue = value;
        });
    }
    UtilServiceService.prototype.changeSubEvent = function () {
        this.subChange.next(!this.subValue);
    };
    UtilServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UtilServiceService);
    return UtilServiceService;
}());
exports.UtilServiceService = UtilServiceService;
