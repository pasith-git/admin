"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResourcesService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var index_util_1 = require("../utilConstant/index.util");
var ResourcesService = /** @class */ (function () {
    function ResourcesService(http, pPermissionService, np) {
        this.http = http;
        this.pPermissionService = pPermissionService;
        this.np = np;
        this.resources = new rxjs_1.BehaviorSubject(null);
    }
    ResourcesService_1 = ResourcesService;
    ResourcesService.prototype.getResources = function () {
        var _this = this;
        return rxjs_1.firstValueFrom(this.http.get(index_util_1.Util.Api + index_util_1.ApiPath.user + '/info')).then(function (data) {
            var _a;
            var roles = data.roles.map(function (role) {
                return role.toUpperCase();
            });
            _this.data = data;
            var containRoles = roles.join(",");
            _this.pPermissionService.setRole(containRoles);
            var permissions = (_a = _this.pPermissionService.getRolesFromLocal()) === null || _a === void 0 ? void 0 : _a.split(",");
            _this.np.loadPermissions(permissions);
        })["catch"](function (e) {
            return;
        });
    };
    ResourcesService.prototype.getData = function () {
        return this.http.get(index_util_1.Util.Api + index_util_1.ApiPath.user + '/info');
    };
    var ResourcesService_1;
    ResourcesService = ResourcesService_1 = __decorate([
        core_1.Injectable({
            providedIn: 'root',
            useClass: ResourcesService_1
        })
    ], ResourcesService);
    return ResourcesService;
}());
exports.ResourcesService = ResourcesService;
