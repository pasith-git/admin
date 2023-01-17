"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var globalValidators_1 = require("../validators/globalValidators");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, authService, route, testService, addressService, userService, ngxSpinnerService, pMessageService) {
        this.fb = fb;
        this.authService = authService;
        this.route = route;
        this.testService = testService;
        this.addressService = addressService;
        this.userService = userService;
        this.ngxSpinnerService = ngxSpinnerService;
        this.pMessageService = pMessageService;
        this.state = false;
        this.district = [];
        this.loginForm = this.fb.group({
            username: ['', [forms_1.Validators.required]],
            password: ['', [forms_1.Validators.required]]
        });
        this.registerForm = this.fb.group({
            firstname: ['', [forms_1.Validators.required, globalValidators_1.stringValidator()]],
            lastname: ['', [forms_1.Validators.required, globalValidators_1.stringValidator()]],
            genderForm: ['', [forms_1.Validators.required]],
            phone: ['', [forms_1.Validators.required, globalValidators_1.numberValidator(), globalValidators_1.minValidator(10)]],
            role: [''],
            username: ['', [forms_1.Validators.required]],
            password: ['', [forms_1.Validators.required]],
            village: ['', [forms_1.Validators.required, globalValidators_1.stringValidator()]],
            province: ['', [forms_1.Validators.required]],
            district: ['', [forms_1.Validators.required]],
            verifyCode: ['']
        });
    }
    Object.defineProperty(LoginComponent.prototype, "username", {
        /* login */
        get: function () {
            var _a;
            return (_a = this.loginForm.get('username')) === null || _a === void 0 ? void 0 : _a.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "password", {
        get: function () {
            var _a;
            return (_a = this.loginForm.get('password')) === null || _a === void 0 ? void 0 : _a.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "rgUsername", {
        /* register */
        get: function () {
            return this.registerForm.get('username');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "rgFirstname", {
        get: function () {
            return this.registerForm.get('firstname');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "rgLastname", {
        get: function () {
            return this.registerForm.get('lastname');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "rgPassword", {
        get: function () {
            return this.registerForm.get('password');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "rgProvince", {
        get: function () {
            return this.registerForm.get('province');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "rgDistrict", {
        get: function () {
            return this.registerForm.get('district');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "rgVillage", {
        get: function () {
            return this.registerForm.get('village');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "rgPhone", {
        get: function () {
            return this.registerForm.get('phone');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "rgGender", {
        get: function () {
            return this.registerForm.get('genderForm');
        },
        enumerable: false,
        configurable: true
    });
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addressService.getProvince().subscribe(function (data) {
            var result = data.provinces.map(function (value) {
                return {
                    name: value.name,
                    code: value.id
                };
            });
            _this.province = result;
        });
        this.gender = [
            { name: 'ຍິງ', code: 'm' },
            { name: 'ຊາຍ', code: 'f' },
        ];
        this.stateRegister = [
            { state: 'register', active: true },
            { state: 'otp', active: false },
        ];
    };
    LoginComponent.prototype.submitForm = function () {
        var _this = this;
        this.ngxSpinnerService.show();
        this.authService.makeCredentials(this.username, this.password).subscribe({
            next: function (_a) {
                var accessToken = _a.accessToken, roles = _a.roles, restaurantId = _a.restaurantId, firstname = _a.firstname, expiresIn = _a.expiresIn;
                _this.authService.setRestaurantId(restaurantId);
                _this.authService.setLSAuth(accessToken);
                _this.authService.setFirstname(firstname);
                _this.authService.setLSexpiredDate(expiresIn);
            },
            error: function (data) {
                var _a, _b;
                _this.ngxSpinnerService.hide();
                (_a = _this.loginForm.get('username')) === null || _a === void 0 ? void 0 : _a.markAsDirty();
                (_b = _this.loginForm.get('password')) === null || _b === void 0 ? void 0 : _b.markAsDirty();
                _this.errMessage = true;
            },
            complete: function () {
                _this.ngxSpinnerService.hide();
                _this.errMessage = false;
                _this.route.navigate(['/']);
            }
        });
    };
    LoginComponent.prototype.showRegisterDialog = function () {
        this.display = true;
    };
    LoginComponent.prototype.register = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (this.state) {
            this.ngxSpinnerService.show();
            var filterOtp = this.otpInput.filter(function (ef) { return ef.nativeElement.value; });
            if (filterOtp.length > 0) {
                var otpResult_1 = '';
                this.otpInput.map(function (ef) {
                    otpResult_1 += ef.nativeElement.value;
                });
                this.userService.register({
                    firstname: (_a = this.rgFirstname) === null || _a === void 0 ? void 0 : _a.value,
                    lastname: (_b = this.rgLastname) === null || _b === void 0 ? void 0 : _b.value,
                    roles: [4, 5],
                    districtId: (_c = this.rgDistrict) === null || _c === void 0 ? void 0 : _c.value,
                    village: (_d = this.rgVillage) === null || _d === void 0 ? void 0 : _d.value,
                    provinceId: (_e = this.rgProvince) === null || _e === void 0 ? void 0 : _e.value,
                    gender: (_f = this.rgGender) === null || _f === void 0 ? void 0 : _f.value,
                    username: (_g = this.rgUsername) === null || _g === void 0 ? void 0 : _g.value,
                    password: (_h = this.rgPassword) === null || _h === void 0 ? void 0 : _h.value,
                    phone: '+856' + ((_j = this.rgPhone) === null || _j === void 0 ? void 0 : _j.value),
                    verifyCode: otpResult_1
                }).subscribe({
                    error: function (data) {
                        console.log(data);
                        _this.ngxSpinnerService.hide();
                        _this.pMessageService.defaultError();
                    },
                    complete: function () {
                        _this.ngxSpinnerService.hide();
                        _this.pMessageService.registerSuccess();
                        _this.display = false;
                    }
                });
            }
        }
        else {
            var formControlsLength = Object.keys(this.registerForm.controls);
            formControlsLength.map(function (data) {
                _this.registerForm.controls[data].markAsDirty();
            });
            if (this.registerForm.valid) {
                this.userService.otp({
                    phone: '+856' + ((_k = this.rgPhone) === null || _k === void 0 ? void 0 : _k.value)
                }).subscribe();
                this.state = true;
            }
        }
    };
    LoginComponent.prototype.activeProvince = function (data) {
        var _this = this;
        this.addressService.getDistrict(data.value).subscribe(function (data) {
            _this.district = data.districts.map(function (value) {
                return {
                    name: value.name,
                    code: value.id
                };
            });
        });
    };
    LoginComponent.prototype.backState = function () {
        this.state = false;
    };
    LoginComponent.prototype.otpKeypress = function (e, index) {
        if (/[0-9]{1}/.test(e.key)) {
            if (this.otpInput.get(5).nativeElement === document.activeElement) {
                this.otpInput.get(0).nativeElement.focus();
            }
            else {
                this.otpInput.get(index + 1).nativeElement.focus();
            }
            this.otpInput.get(index).nativeElement.value = e.key;
        }
        else {
            this.otpInput.get(index).nativeElement.value = 0;
        }
    };
    LoginComponent.prototype.registerDialogHide = function () {
        this.registerForm.reset();
        this.state = false;
    };
    LoginComponent.prototype.closeRegister = function () {
        this.display = false;
    };
    __decorate([
        core_1.ViewChildren('otpInput')
    ], LoginComponent.prototype, "otpInput");
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            animations: [
                animations_1.trigger('openClose', [
                    // ...
                    animations_1.state('open', animations_1.style({
                        transform: 'translateX(-100%)'
                    })),
                    animations_1.state('close', animations_1.style({
                        transform: 'translateX(0%)'
                    })),
                    animations_1.transition('* <=> *', [
                        animations_1.animate('250ms ease-in-out'),
                    ])
                ]),
                animations_1.trigger('hidden', [
                    // ...
                    animations_1.state('hide', animations_1.style({
                        visibility: 'hidden'
                    })),
                    animations_1.transition('* <=> *', [
                        animations_1.animate('250ms ease-in-out'),
                    ])
                ]),
            ]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
