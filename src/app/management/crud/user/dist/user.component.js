"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var user_model_1 = require("src/app/models/user.model");
var UserComponent = /** @class */ (function () {
    function UserComponent(userService, route, utilService, ngxSpinnerService, fb, confirmDialog, pMessageService, addressService, authService) {
        this.userService = userService;
        this.route = route;
        this.utilService = utilService;
        this.ngxSpinnerService = ngxSpinnerService;
        this.fb = fb;
        this.confirmDialog = confirmDialog;
        this.pMessageService = pMessageService;
        this.addressService = addressService;
        this.authService = authService;
        this.data$ = this.userService.dataObs$;
        this.disabled = true;
        this.modalDisplay = false;
        this.modalEditDisplay = false;
        this.destroy$ = new rxjs_1.Subject();
        this.genderSelection = [];
        this.provinceSelection = [];
        this.districtSelection = [];
        this.imagePath = 'assets/images/crud/users.png';
        this.rolesSelection = [];
        this.roles = [];
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngxSpinnerService.show();
        this.form = this.fb.group({
            username: ['', [forms_1.Validators.required]],
            password: ['', [forms_1.Validators.required]],
            firstname: ['', [forms_1.Validators.required]],
            lastname: ['', [forms_1.Validators.required]],
            gender: ['', [forms_1.Validators.required]],
            phone: ['', [forms_1.Validators.required]],
            provinceId: ['', [forms_1.Validators.required]],
            districtId: ['', [forms_1.Validators.required]],
            village: ['', [forms_1.Validators.required]]
        });
        this.addressService.getProvince().subscribe(function (data) {
            var result = data.provinces.map(function (value) {
                return {
                    name: value.name,
                    code: value.id
                };
            });
            _this.provinceSelection = result;
        });
        this.genderSelection = [
            { name: 'ຍິງ', code: 'm' },
            { name: 'ຊາຍ', code: 'f' },
        ];
        this.rolesSelection = [
            { name: 'cashier', code: { name: 'cashier', value: 7 } },
            { name: 'waiter', code: { name: 'waiter', value: 8 } },
        ];
        this.brchId = this.route.snapshot.params['id'];
        this.col = user_model_1.colUser;
        this.extraCol = user_model_1.colProfile;
        this.userService.getDataByBranch(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                var genData = data.map(function (value) {
                    value['id'] = value['userId'];
                    delete value['userId'];
                    return __assign(__assign({}, value), { profile: [value.profile] });
                });
                _this.data = genData;
                _this.userService.dataSub$.next(genData);
            },
            error: function () {
                _this.ngxSpinnerService.hide();
            },
            complete: function () {
                _this.ngxSpinnerService.hide();
                _this.disabled = false;
            }
        });
    };
    UserComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    Object.defineProperty(UserComponent.prototype, "username", {
        get: function () {
            return this.form.get('username');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserComponent.prototype, "password", {
        get: function () {
            return this.form.get('password');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserComponent.prototype, "firstname", {
        get: function () {
            return this.form.get('firstname');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserComponent.prototype, "lastname", {
        get: function () {
            return this.form.get('lastname');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserComponent.prototype, "gender", {
        get: function () {
            return this.form.get('gender');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserComponent.prototype, "phone", {
        get: function () {
            return this.form.get('phone');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserComponent.prototype, "provinceId", {
        get: function () {
            return this.form.get('provinceId');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserComponent.prototype, "districtId", {
        get: function () {
            return this.form.get('districtId');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserComponent.prototype, "village", {
        get: function () {
            return this.form.get('village');
        },
        enumerable: false,
        configurable: true
    });
    UserComponent.prototype.activeProvince = function (data) {
        var _this = this;
        this.addressService.getDistrict(data.value).subscribe(function (data) {
            _this.districtSelection = data.districts.map(function (value) {
                return {
                    name: value.name,
                    code: value.id
                };
            });
        });
    };
    UserComponent.prototype.create = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var fControls = Object.keys(this.form.controls);
        fControls.map(function (fControl) {
            _this.form.controls[fControl].markAsDirty();
        });
        var roles = this.roles.map(function (role) {
            return role.value;
        });
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var newUser = {
                username: (_a = this.username) === null || _a === void 0 ? void 0 : _a.value,
                password: (_b = this.password) === null || _b === void 0 ? void 0 : _b.value,
                firstname: (_c = this.firstname) === null || _c === void 0 ? void 0 : _c.value,
                lastname: (_d = this.lastname) === null || _d === void 0 ? void 0 : _d.value,
                phone: (_e = this.username) === null || _e === void 0 ? void 0 : _e.value,
                provinceId: (_f = this.provinceId) === null || _f === void 0 ? void 0 : _f.value,
                districtId: (_g = this.districtId) === null || _g === void 0 ? void 0 : _g.value,
                roles: this.roles.length > 0 ? roles : [7, 8],
                village: (_h = this.village) === null || _h === void 0 ? void 0 : _h.value,
                gender: (_j = this.gender) === null || _j === void 0 ? void 0 : _j.value,
                branchId: this.brchId,
                restaurantId: parseInt(this.authService.getRestaurantId())
            };
            this.userService.create(newUser).subscribe({
                complete: function () {
                    _this.modalDisplay = false;
                    _this.pMessageService.createSuccess();
                    _this.userService.getDataByBranch(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            var genData = data.map(function (value) {
                                value['id'] = value['userId'];
                                delete value['userId'];
                                return __assign(__assign({}, value), { profile: [value.profile] });
                            });
                            _this.data = genData;
                            _this.userService.dataSub$.next(genData);
                        },
                        complete: function () {
                            _this.utilService.changeSubEvent();
                            _this.ngxSpinnerService.hide();
                        }
                    });
                },
                error: function (data) {
                    _this.pMessageService.customMessageWarn(data.error.message);
                    _this.ngxSpinnerService.hide();
                }
            });
        }
    };
    UserComponent.prototype.dpEditEvent = function (obj) {
        var _this = this;
        this.form.controls['password'].removeValidators(forms_1.Validators.required);
        this.data.map(function (data) {
            if (data.id === obj.id) {
                _this.roles = _this.rolesSelection.filter(function (role) { return data.roleIds.includes(role.code.value); }).map(function (role) {
                    return {
                        name: role.name,
                        value: role.code.value
                    };
                });
                _this.dataId = data.id;
                _this.form.setValue({
                    username: data.username,
                    password: '',
                    firstname: data.profile[0].firstname,
                    lastname: data.profile[0].lastname,
                    phone: data.profile[0].phone,
                    village: data.profile[0].village,
                    provinceId: data.profile[0].provinceId,
                    districtId: data.profile[0].districtId,
                    gender: data.profile[0].gender
                });
                _this.addressService.getDistrict(data.profile[0].provinceId).subscribe(function (data) {
                    _this.districtSelection = data.districts.map(function (value) {
                        return {
                            name: value.name,
                            code: value.id
                        };
                    });
                });
            }
        });
        this.modalEditDisplay = !this.modalEditDisplay;
    };
    UserComponent.prototype.update = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var fControls = Object.keys(this.form.controls);
        fControls.map(function (fControl) {
            _this.form.controls[fControl].markAsDirty();
        });
        this.form.controls['password'].removeValidators(forms_1.Validators.required);
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var roles = this.roles.map(function (role) {
                return role.value;
            });
            var updateUser = {
                userId: this.dataId,
                username: (_a = this.username) === null || _a === void 0 ? void 0 : _a.value,
                password: (_b = this.password) === null || _b === void 0 ? void 0 : _b.value,
                firstname: (_c = this.firstname) === null || _c === void 0 ? void 0 : _c.value,
                lastname: (_d = this.lastname) === null || _d === void 0 ? void 0 : _d.value,
                phone: (_e = this.username) === null || _e === void 0 ? void 0 : _e.value,
                provinceId: (_f = this.provinceId) === null || _f === void 0 ? void 0 : _f.value,
                districtId: (_g = this.districtId) === null || _g === void 0 ? void 0 : _g.value,
                roles: this.roles.length > 0 ? roles : [7, 8],
                village: (_h = this.village) === null || _h === void 0 ? void 0 : _h.value,
                gender: (_j = this.gender) === null || _j === void 0 ? void 0 : _j.value
            };
            this.userService.update(updateUser).subscribe({
                complete: function () {
                    _this.modalEditDisplay = false;
                    _this.pMessageService.updateSuccess();
                    _this.userService.getDataByBranch(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            var genData = data.map(function (value) {
                                value['id'] = value['userId'];
                                delete value['userId'];
                                return __assign(__assign({}, value), { profile: [value.profile] });
                            });
                            _this.data = genData;
                            _this.userService.dataSub$.next(genData);
                        },
                        complete: function () {
                            _this.ngxSpinnerService.hide();
                        }
                    });
                },
                error: function (data) {
                    console.log(data);
                    _this.ngxSpinnerService.hide();
                }
            });
        }
    };
    UserComponent.prototype.dpRemoveEvent = function (_a) {
        var _this = this;
        var id = _a.id;
        var currentData;
        this.data.map(function (data) {
            if (data.id === id) {
                currentData = data;
            }
        });
        this.confirmDialog.confirm({
            message: "\u0EA2\u0EB7\u0E99\u0EA2\u0EB1\u0E99\u0E81\u0EB2\u0E99\u0EA5\u0EBB\u0E9A\u0E9C\u0EB8\u0EC9\u0EC3\u0E8A\u0EC9 <b>" + currentData.username + "</b>",
            accept: function () {
                var deleteDto = {
                    userId: currentData.id,
                    username: currentData.username
                };
                _this.userService["delete"](deleteDto).subscribe({
                    complete: function () {
                        _this.ngxSpinnerService.show();
                        _this.userService.getDataByBranch(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                            next: function (data) {
                                var genData = data.map(function (value) {
                                    value['id'] = value['userId'];
                                    delete value['userId'];
                                    return __assign(__assign({}, value), { profile: [value.profile] });
                                });
                                _this.pMessageService.deleteSuccess();
                                _this.data = genData;
                                _this.userService.dataSub$.next(genData);
                            },
                            complete: function () {
                                _this.utilService.changeSubEvent();
                                _this.ngxSpinnerService.hide();
                            }
                        });
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            },
            reject: function () {
            }
        });
    };
    UserComponent.prototype.onHide = function (e) {
        this.form.controls['password'].addValidators(forms_1.Validators.required);
        document.querySelector('body').style.overflowY = 'auto';
        this.modalDisplay = e;
        this.modalEditDisplay = e;
        this.form.reset();
    };
    UserComponent.prototype.activeRoles = function (role) {
        if (this.roles.length < 1) {
            this.roles.push(role);
        }
        else {
            var filterRoles = this.roles.filter(function (roleM) { return roleM.value === role.value; });
            if (filterRoles.length === 0) {
                this.roles.push(role);
            }
        }
    };
    UserComponent.prototype.removeRoleSelection = function (index) {
        this.roles = this.roles.filter(function (d, i) { return i !== index; });
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css']
        })
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
