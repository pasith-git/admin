"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FirstpermissionGuard = void 0;
var core_1 = require("@angular/core");
var FirstpermissionGuard = /** @class */ (function () {
    function FirstpermissionGuard(auth, route) {
        this.auth = auth;
        this.route = route;
    }
    FirstpermissionGuard.prototype.canActivateChild = function (route, state) {
        if (this.auth.checkLs()) {
            return true;
        }
        else {
            this.route.navigate(['/login']);
            return false;
        }
    };
    FirstpermissionGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FirstpermissionGuard);
    return FirstpermissionGuard;
}());
exports.FirstpermissionGuard = FirstpermissionGuard;
