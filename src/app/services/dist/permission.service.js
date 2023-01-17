"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PermissionService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var PermissionService = /** @class */ (function () {
    function PermissionService() {
        this._role = '';
        this.modalP = new rxjs_1.BehaviorSubject(false);
    }
    PermissionService.prototype.getRolesFromLocal = function () {
        return localStorage.getItem('roles');
    };
    PermissionService.prototype.setRole = function (data) {
        localStorage.setItem('roles', data);
    };
    PermissionService.prototype.getRoles = function () {
        this._role = this.getRolesFromLocal();
    };
    Object.defineProperty(PermissionService.prototype, "role", {
        get: function () {
            return this._role;
        },
        enumerable: false,
        configurable: true
    });
    PermissionService.prototype.showModal = function () {
        this.modalP.next(true);
    };
    PermissionService.prototype.hideModal = function () {
        this.modalP.next(false);
    };
    PermissionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PermissionService);
    return PermissionService;
}());
exports.PermissionService = PermissionService;
