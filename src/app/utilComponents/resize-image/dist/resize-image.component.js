"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResizeImageComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var ResizeImageComponent = /** @class */ (function () {
    function ResizeImageComponent() {
        this.eventClose = new core_1.EventEmitter();
    }
    ResizeImageComponent.prototype.onKeydownHandler = function (event) {
        this.eventClose.emit();
    };
    ResizeImageComponent.prototype.clickOutSide = function (target) {
        var _a;
        if (!((_a = document.querySelector('.image-layout')) === null || _a === void 0 ? void 0 : _a.contains(target))) {
            this.eventClose.emit();
        }
    };
    ResizeImageComponent.prototype.ngOnInit = function () {
    };
    ResizeImageComponent.prototype.ngOnChanges = function (changes) {
        this.display = changes['display'].currentValue;
    };
    ResizeImageComponent.prototype.closed = function () {
        this.eventClose.emit();
    };
    __decorate([
        core_1.Input()
    ], ResizeImageComponent.prototype, "display");
    __decorate([
        core_1.Input()
    ], ResizeImageComponent.prototype, "urlImage");
    __decorate([
        core_1.Output()
    ], ResizeImageComponent.prototype, "eventClose");
    __decorate([
        core_1.HostListener('document:keydown.escape', ['$event'])
    ], ResizeImageComponent.prototype, "onKeydownHandler");
    __decorate([
        core_1.HostListener('click', ['$event.target'])
    ], ResizeImageComponent.prototype, "clickOutSide");
    ResizeImageComponent = __decorate([
        core_1.Component({
            selector: 'app-resize-image',
            templateUrl: './resize-image.component.html',
            styleUrls: ['./resize-image.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            animations: [
                animations_1.trigger('animate', [
                    animations_1.transition(':enter', [
                        animations_1.style({
                            opacity: 0,
                            transform: 'scale(0.5)'
                        }),
                        animations_1.animate('0.2s ease-in-out', animations_1.style({
                            opacity: 1,
                            transform: 'scale(1)'
                        })),
                    ]),
                    animations_1.transition(':leave', [
                        animations_1.style({
                            opacity: 1,
                            transform: 'scale(1)'
                        }),
                        animations_1.animate('0.2s ease-in-out', animations_1.style({
                            opacity: 0,
                            transform: 'scale(0.5)'
                        })),
                    ]),
                ]),
                animations_1.trigger('dumbParent', [
                    animations_1.transition('* => void', [
                        animations_1.query('@*', [animations_1.animateChild()], { optional: true })
                    ]),
                ])
            ]
        })
    ], ResizeImageComponent);
    return ResizeImageComponent;
}());
exports.ResizeImageComponent = ResizeImageComponent;
