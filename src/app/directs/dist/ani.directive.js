"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AniDirective = void 0;
var core_1 = require("@angular/core");
var AniDirective = /** @class */ (function () {
    function AniDirective(el, ren) {
        this.el = el;
        this.ren = ren;
        this.prevSibling = this.el.nativeElement.previousElementSibling;
    }
    AniDirective.prototype.onFocus = function () {
        this.ren.addClass(this.prevSibling, 'onfocus');
        this.ren.removeClass(this.prevSibling, 'onblur');
    };
    AniDirective.prototype.onBlur = function () {
        if (this.el.nativeElement.value !== '') {
            this.ren.addClass(this.prevSibling, 'onfocus');
            this.ren.removeClass(this.prevSibling, 'onblur');
        }
        else {
            this.ren.addClass(this.prevSibling, 'onblur');
            this.ren.removeClass(this.prevSibling, 'onfocus');
        }
    };
    AniDirective.prototype.directOnblur = function () {
        var currentLabel = this.el.nativeElement.querySelectorAll('.pLabel');
        for (var _i = 0, currentLabel_1 = currentLabel; _i < currentLabel_1.length; _i++) {
            var eLabel = currentLabel_1[_i];
            this.ren.removeClass(eLabel, 'onfocus');
            this.ren.removeClass(eLabel, 'onblur');
        }
    };
    __decorate([
        core_1.HostListener('focus')
    ], AniDirective.prototype, "onFocus");
    __decorate([
        core_1.HostListener('blur')
    ], AniDirective.prototype, "onBlur");
    AniDirective = __decorate([
        core_1.Directive({
            selector: '[aInput]'
        })
    ], AniDirective);
    return AniDirective;
}());
exports.AniDirective = AniDirective;
