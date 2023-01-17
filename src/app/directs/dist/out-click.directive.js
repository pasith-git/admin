"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OutClickDirective = void 0;
var core_1 = require("@angular/core");
var OutClickDirective = /** @class */ (function () {
    function OutClickDirective(el) {
        this.el = el;
        this.outClick = new core_1.EventEmitter();
        this.keyOutClick = new core_1.EventEmitter();
        this.targetOutClick = new core_1.EventEmitter();
    }
    OutClickDirective.prototype.clickInSide = function (e) {
        e.stopPropagation();
    };
    OutClickDirective.prototype.onKeydownHandler = function (event) {
        this.keyOutClick.emit();
    };
    OutClickDirective.prototype.clickOutside = function (e) {
        this.outClick.emit();
    };
    __decorate([
        core_1.Output()
    ], OutClickDirective.prototype, "outClick");
    __decorate([
        core_1.Output()
    ], OutClickDirective.prototype, "keyOutClick");
    __decorate([
        core_1.Output()
    ], OutClickDirective.prototype, "targetOutClick");
    __decorate([
        core_1.HostListener('click', ['$event'])
    ], OutClickDirective.prototype, "clickInSide");
    __decorate([
        core_1.HostListener('document:keydown.escape', ['$event'])
    ], OutClickDirective.prototype, "onKeydownHandler");
    __decorate([
        core_1.HostListener('document:click', ['$event'])
    ], OutClickDirective.prototype, "clickOutside");
    OutClickDirective = __decorate([
        core_1.Directive({
            selector: '[appOutClick]'
        })
    ], OutClickDirective);
    return OutClickDirective;
}());
exports.OutClickDirective = OutClickDirective;
