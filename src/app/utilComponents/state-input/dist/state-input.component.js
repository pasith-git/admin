"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StateInputComponent = void 0;
var core_1 = require("@angular/core");
var StateInputComponent = /** @class */ (function () {
    function StateInputComponent() {
    }
    StateInputComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], StateInputComponent.prototype, "form");
    __decorate([
        core_1.Input()
    ], StateInputComponent.prototype, "control");
    __decorate([
        core_1.Input()
    ], StateInputComponent.prototype, "boxControl");
    __decorate([
        core_1.Input()
    ], StateInputComponent.prototype, "errControl");
    __decorate([
        core_1.Input()
    ], StateInputComponent.prototype, "errMessage");
    StateInputComponent = __decorate([
        core_1.Component({
            selector: 'state-input',
            templateUrl: './state-input.component.html',
            styleUrls: ['./state-input.component.css']
        })
    ], StateInputComponent);
    return StateInputComponent;
}());
exports.StateInputComponent = StateInputComponent;
