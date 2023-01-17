"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RolesGuard = void 0;
var core_1 = require("@angular/core");
var RolesGuard = /** @class */ (function () {
    function RolesGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    RolesGuard.prototype.canActivateChild = function (childRoute, state) {
        if (this.auth.checkRoleLS()) {
            return true;
        }
        else {
            this.router.navigate(['/']);
            return false;
        }
    };
    RolesGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RolesGuard);
    return RolesGuard;
}());
exports.RolesGuard = RolesGuard;
