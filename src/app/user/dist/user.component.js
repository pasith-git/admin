"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var globalValidators_1 = require("../validators/globalValidators");
var UserComponent = /** @class */ (function () {
    function UserComponent(rs, fb, userService, ngxSpinner, pmessage) {
        var _this = this;
        this.rs = rs;
        this.fb = fb;
        this.userService = userService;
        this.ngxSpinner = ngxSpinner;
        this.pmessage = pmessage;
        this.userData = new rxjs_1.Subject();
        this.data$ = this.userData.asObservable();
        this.roles = [];
        this.rf = this.fb.group({
            password: ['', forms_1.Validators.required],
            cPassword: ['']
        }, { validators: globalValidators_1.confirmPassword });
        this.rs.getData().subscribe(function (d) {
            _this.userData.next(d);
            var uiRoles = d.roles.map(function (role) {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return {
                    name: role,
                    color: {
                        r: r,
                        g: g,
                        b: b
                    }
                };
            });
            _this.roles = uiRoles;
        });
    }
    Object.defineProperty(UserComponent.prototype, "password", {
        get: function () {
            return this.rf.get('password');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserComponent.prototype, "cPassword", {
        get: function () {
            return this.rf.get('cPassword');
        },
        enumerable: false,
        configurable: true
    });
    UserComponent.prototype.ngOnInit = function () {
    };
    UserComponent.prototype.resetPassword = function () {
        var _this = this;
        var _a, _b;
        (_a = this.password) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.cPassword) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        if (this.rf.valid) {
            this.ngxSpinner.show();
            this.rs.getData().subscribe(function (user) {
                var _a;
                _this.userService.resetPassword({
                    userId: user.id,
                    username: user.username,
                    password: (_a = _this.password) === null || _a === void 0 ? void 0 : _a.value
                }).subscribe({
                    next: function (ata) {
                    },
                    complete: function () {
                        _this.ngxSpinner.hide();
                        _this.pmessage.customMessageSuccess('ການປ່ຽນລະຫັດຜ່ານສຳເລັດ');
                        _this.rf.reset();
                    },
                    error: function (data) {
                    }
                });
            });
        }
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
