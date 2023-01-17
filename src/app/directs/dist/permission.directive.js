"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PermissionDirective = void 0;
var core_1 = require("@angular/core");
var PermissionDirective = /** @class */ (function () {
    function PermissionDirective(permisionService, viewContainerRef) {
        this.permisionService = permisionService;
        this.viewContainerRef = viewContainerRef;
        this.permissionEvent = new core_1.EventEmitter();
        this.permisionService.getRoles();
    }
    PermissionDirective.prototype.ngAfterContentInit = function () {
    };
    PermissionDirective.prototype.clickEvent = function () {
        this.permissionEvent.emit(this.permisionService.role);
    };
    __decorate([
        core_1.Output()
    ], PermissionDirective.prototype, "permissionEvent");
    __decorate([
        core_1.HostListener('click')
    ], PermissionDirective.prototype, "clickEvent");
    PermissionDirective = __decorate([
        core_1.Directive({
            selector: '[appPermission]'
        })
    ], PermissionDirective);
    return PermissionDirective;
}());
exports.PermissionDirective = PermissionDirective;
