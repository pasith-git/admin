"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PmodalCrudComponent = void 0;
var core_1 = require("@angular/core");
var PmodalCrudComponent = /** @class */ (function () {
    function PmodalCrudComponent() {
        this.modalHide = new core_1.EventEmitter();
    }
    PmodalCrudComponent.prototype.ngOnInit = function () {
    };
    PmodalCrudComponent.prototype.ngOnChanges = function (changes) {
    };
    PmodalCrudComponent.prototype.onHide = function (e) {
        this.modalHide.emit(e);
    };
    PmodalCrudComponent.prototype.onClose = function (bool) {
        this.modalHide.emit(bool);
    };
    PmodalCrudComponent.prototype.ngAfterContentInit = function () {
    };
    __decorate([
        core_1.Input()
    ], PmodalCrudComponent.prototype, "modalDisplay");
    __decorate([
        core_1.Input()
    ], PmodalCrudComponent.prototype, "modalEditDisplay");
    __decorate([
        core_1.Input()
    ], PmodalCrudComponent.prototype, "modalHeaderName");
    __decorate([
        core_1.Input()
    ], PmodalCrudComponent.prototype, "clIcon");
    __decorate([
        core_1.Input()
    ], PmodalCrudComponent.prototype, "clText");
    __decorate([
        core_1.Input()
    ], PmodalCrudComponent.prototype, "modalDefault");
    __decorate([
        core_1.Input()
    ], PmodalCrudComponent.prototype, "imagePath");
    __decorate([
        core_1.Output()
    ], PmodalCrudComponent.prototype, "modalHide");
    __decorate([
        core_1.ContentChild('body', { static: false })
    ], PmodalCrudComponent.prototype, "body");
    PmodalCrudComponent = __decorate([
        core_1.Component({
            selector: 'pmodal-crud',
            templateUrl: './pmodal-crud.component.html',
            styleUrls: ['./pmodal-crud.component.css']
        })
    ], PmodalCrudComponent);
    return PmodalCrudComponent;
}());
exports.PmodalCrudComponent = PmodalCrudComponent;
;
