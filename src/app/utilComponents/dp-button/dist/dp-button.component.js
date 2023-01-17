"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DpButtonComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var DpButtonComponent = /** @class */ (function () {
    function DpButtonComponent() {
        this.display = false;
        this.faCaretDown = free_solid_svg_icons_1.faCaretDown;
        this.faEdit = free_solid_svg_icons_1.faEdit;
        this.faTrash = free_solid_svg_icons_1.faTrash;
        this.toggle = new core_1.EventEmitter();
        this.dpEdit = new core_1.EventEmitter();
        this.dpRemove = new core_1.EventEmitter();
    }
    DpButtonComponent.prototype.clickInSide = function (e) {
        e.stopPropagation();
    };
    DpButtonComponent.prototype.onKeydownHandler = function (event) {
        this.display = false;
    };
    DpButtonComponent.prototype.clickOutside = function (e) {
        if (e.target !== this.dpToggle.nativeElement) {
            this.display = false;
        }
    };
    DpButtonComponent.prototype.ngOnInit = function () {
    };
    DpButtonComponent.prototype.toggleDp = function () {
        this.toggle.emit(this.dpIndex);
    };
    __decorate([
        core_1.Input()
    ], DpButtonComponent.prototype, "dpId");
    __decorate([
        core_1.Input()
    ], DpButtonComponent.prototype, "dpIndex");
    __decorate([
        core_1.Output()
    ], DpButtonComponent.prototype, "toggle");
    __decorate([
        core_1.Output()
    ], DpButtonComponent.prototype, "dpEdit");
    __decorate([
        core_1.Output()
    ], DpButtonComponent.prototype, "dpRemove");
    __decorate([
        core_1.ViewChild('dpToggle')
    ], DpButtonComponent.prototype, "dpToggle");
    __decorate([
        core_1.HostListener('click', ['$event'])
    ], DpButtonComponent.prototype, "clickInSide");
    __decorate([
        core_1.HostListener('document:keydown.escape', ['$event'])
    ], DpButtonComponent.prototype, "onKeydownHandler");
    __decorate([
        core_1.HostListener('document:click', ['$event'])
    ], DpButtonComponent.prototype, "clickOutside");
    DpButtonComponent = __decorate([
        core_1.Component({
            selector: 'dp-button',
            templateUrl: './dp-button.component.html',
            styleUrls: ['./dp-button.component.css'],
            animations: [
                animations_1.trigger('dropdown', [
                    animations_1.transition(':enter', [
                        animations_1.style({ height: 0 }),
                        animations_1.animate('0.2s ease-in-out', animations_1.style({
                            height: '*'
                        })),
                    ]),
                    animations_1.transition(':leave', [
                        animations_1.style({ height: '*' }),
                        animations_1.animate('0.1s ease-in-out', animations_1.style({
                            height: 0
                        })),
                    ]),
                ])
            ]
        })
    ], DpButtonComponent);
    return DpButtonComponent;
}());
exports.DpButtonComponent = DpButtonComponent;
