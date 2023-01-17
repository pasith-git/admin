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
exports.MenuComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var menu_model_1 = require("src/app/models/menu.model");
var globalValidators_1 = require("src/app/validators/globalValidators");
var animations_1 = require("@angular/animations");
var index_util_1 = require("src/app/utilConstant/index.util");
var MenuComponent = /** @class */ (function () {
    function MenuComponent(menuService, ngxSpinnerService, route, fb, confirmDialog, authService, pMessageService, categoryService, unitService, stockService, menuDetailsService, languageService) {
        this.menuService = menuService;
        this.ngxSpinnerService = ngxSpinnerService;
        this.route = route;
        this.fb = fb;
        this.confirmDialog = confirmDialog;
        this.authService = authService;
        this.pMessageService = pMessageService;
        this.categoryService = categoryService;
        this.unitService = unitService;
        this.stockService = stockService;
        this.menuDetailsService = menuDetailsService;
        this.languageService = languageService;
        this.menuFormData = new FormData();
        this.disabled = true;
        this.destroy$ = new rxjs_1.Subject();
        this.data$ = this.menuService.dataObs$;
        this.modalDisplay = false;
        this.modalEditDisplay = false;
        /* menudetails */
        this.menudetails = [];
        this.languageDataEdit = [];
        this.imagePath = 'assets/images/crud/menu.png';
        this.ml = false;
        this.resizeImageUrl = '';
    }
    MenuComponent.prototype.clickedTable = function ($event) {
        var _this = this;
        /*  const mdElement = document.getElementById('menudetails-table'); */
        var productName = Array.from(document.querySelectorAll('.productName-td'));
        var amountName = Array.from(document.querySelectorAll('.amount-td'));
        var statusName = Array.from(document.querySelectorAll('.status-td'));
        var productNameFilter = productName.filter(function (data) { return data.contains($event); });
        var amountFilter = amountName.filter(function (data) { return data.contains($event); });
        var statusFilter = statusName.filter(function (data) { return data.contains($event); });
        if (productNameFilter.length > 0) {
            productName.map(function (data, index) {
                if (data.contains($event)) {
                    _this.productNameEdit = index;
                }
            });
        }
        else {
            this.productNameEdit = undefined;
        }
        if (amountFilter.length > 0) {
            amountName.map(function (data, index) {
                if (data.contains($event)) {
                    _this.amountEdit = index;
                }
            });
        }
        else {
            this.amountEdit = undefined;
        }
        if (statusFilter.length > 0) {
            statusName.map(function (data, index) {
                if (data.contains($event)) {
                    _this.statusEdit = index;
                }
            });
        }
        else {
            this.statusEdit = undefined;
        }
        /*  const amount = document.querySelector('amount');
         const status = document.querySelector('status'); */
    };
    MenuComponent.prototype.checkMenudetails = function (arrCheck, value) {
        return arrCheck.length > 0 ? null : value;
    };
    MenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.languageService.getData().subscribe(function (data) {
            var result = [];
            var nData = data.filter(function (v) { return v.languageCode !== 'lo'; });
            while (nData.length) {
                result.push(nData.splice(0, 2));
            }
            _this.languageData = result;
        });
        this.ngxSpinnerService.show();
        this.brchId = this.route.snapshot.params['id'];
        this.col = menu_model_1.colMenu;
        this.extraCol = menu_model_1.colMenuDetail;
        this.form = this.fb.group({
            name: ['', [forms_1.Validators.required, globalValidators_1.nationalRegexPatternLaosValidator()]],
            category: ['', [forms_1.Validators.required]],
            unit: ['', [forms_1.Validators.required]],
            price: ['', [forms_1.Validators.min(1), forms_1.Validators.required]],
            image: [''],
            product: [''],
            amount: ['0'],
            status: ['']
        });
        this.menuService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                _this.data = data;
                _this.menuService.dataSub$.next(data);
            },
            error: function () {
                _this.ngxSpinnerService.hide();
            },
            complete: function () {
                _this.ngxSpinnerService.hide();
                _this.disabled = false;
            }
        });
        this.categoryService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                var result = data.map(function (value) {
                    return { name: value.name, code: value.id };
                });
                _this.categoryOptions = result;
            }
        });
        this.unitService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                var result = data.map(function (value) {
                    return { name: value.unitName, code: value.id };
                });
                _this.unitOptions = result;
            }
        });
        this.stockService.findAll(this.brchId).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function (data) {
                var result = data.map(function (value) {
                    return { name: value.productName, code: value.id + "," + value.productName };
                });
                _this.productOptions = result;
            }
        });
        this.menudetailsStatus = [
            { name: 'sale', code: 'sale' },
            { name: 'free', code: 'free' },
        ];
    };
    Object.defineProperty(MenuComponent.prototype, "name", {
        get: function () {
            return this.form.get('name');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuComponent.prototype, "category", {
        get: function () {
            return this.form.get('category');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuComponent.prototype, "unit", {
        get: function () {
            return this.form.get('unit');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuComponent.prototype, "price", {
        get: function () {
            return this.form.get('price');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuComponent.prototype, "image", {
        get: function () {
            return this.form.get('image');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuComponent.prototype, "product", {
        get: function () {
            return this.form.get('product');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuComponent.prototype, "amount", {
        get: function () {
            return this.form.get('amount');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuComponent.prototype, "status", {
        get: function () {
            return this.form.get('status');
        },
        enumerable: false,
        configurable: true
    });
    MenuComponent.prototype.dpEditEvent = function (obj) {
        var _this = this;
        this.ngxSpinnerService.show();
        this.menuService.findAllById(obj.id, this.brchId).subscribe({
            next: function (data) {
                if (data.languages.length > 0) {
                    var result = [];
                    while (data.languages.length) {
                        result.push(data.languages.splice(0, 2));
                    }
                    _this.languageDataEdit = result;
                }
                else {
                    _this.languageDataEdit = [];
                }
                _this.dataId = data.id;
                _this.form.setValue({
                    name: data.name,
                    price: data.price,
                    category: data.categoryId,
                    unit: data.unitId,
                    image: null,
                    product: null,
                    amount: null,
                    status: null
                });
                _this.imageEditData = data.image;
                var menuDetails = data.menudetails.map(function (data) {
                    var _a;
                    return _a = {
                            stockId: data.stockId.toString()
                        },
                        _a[data.stockId] = {
                            id: data.id,
                            stockId: data.stockId.toString(),
                            productName: data.productName,
                            amount: data.amount,
                            status: data.status
                        },
                        _a;
                });
                _this.menudetails = menuDetails;
            },
            complete: function () {
                _this.ngxSpinnerService.hide();
            }
        });
        this.modalEditDisplay = !this.modalEditDisplay;
    };
    MenuComponent.prototype.dpRemoveEvent = function (_a) {
        var _this = this;
        var id = _a.id;
        var currentData;
        this.data.map(function (data) {
            if (data.id === id) {
                currentData = data;
            }
        });
        this.confirmDialog.confirm({
            message: "\u0EA2\u0EB7\u0E99\u0EA2\u0EB1\u0E99\u0E81\u0EB2\u0E99\u0EA5\u0EBB\u0E9A\u0EC0\u0EA1\u0E99\u0EB9 <b>" + currentData.name + "</b>",
            accept: function () {
                var deleteDto = {
                    restaurantId: parseInt(_this.authService.getRestaurantId()),
                    branchId: _this.brchId,
                    menuId: id
                };
                _this.menuService["delete"](deleteDto).subscribe({
                    complete: function () {
                        _this.ngxSpinnerService.show();
                        _this.menuService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                            next: function (data) {
                                _this.pMessageService.deleteSuccess();
                                _this.data = data;
                                _this.menuService.dataSub$.next(data);
                            },
                            complete: function () {
                                _this.ngxSpinnerService.hide();
                            }
                        });
                    }
                });
            },
            reject: function () {
            }
        });
    };
    MenuComponent.prototype.onHide = function (e) {
        document.querySelector('body').style.overflowY = 'auto';
        this.modalDisplay = e;
        this.modalEditDisplay = e;
        this.form.reset();
        this.menudetails = [];
        this.menuFormData = new FormData();
        this.ml = false;
    };
    MenuComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    MenuComponent.prototype.create = function () {
        /*  const languagesData = [
           ...(this.form.controls['nameLa'].value ? [{ languageCode: 'LA', name: this.form.controls['nameLa'].value }] : []),
           ...(this.form.controls['nameTh'].value ? [{ languageCode: 'TH', name: this.form.controls['nameTh'].value }] : [])
         ]; */
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var languagesData = this.mlInput.map(function (d) {
            if (d.nativeElement.value) {
                return {
                    languageCode: d.nativeElement.dataset.code.toUpperCase(),
                    name: d.nativeElement.value
                };
            }
            else {
                return {};
            }
        });
        (_a = this.name) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.category) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        (_c = this.unit) === null || _c === void 0 ? void 0 : _c.markAsDirty();
        (_d = this.price) === null || _d === void 0 ? void 0 : _d.markAsDirty();
        (_e = this.image) === null || _e === void 0 ? void 0 : _e.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var menudetailsData = this.menudetails.map(function (data) {
                return {
                    stockId: data[data.stockId].stockId,
                    amount: data[data.stockId].amount,
                    status: data[data.stockId].status
                };
            });
            /* const createDto: MenuDto = {
              restaurantId: parseInt(<string>this.authService.getRestaurantId()),
              branchId: this.brchId,
              name: this.name?.value,
              categoryId: this.category?.value,
              unitId: this.unit?.value,
              price: this.price?.value,
              languages: [],
              menudetails: menudetailsData.length > 0 ? menudetailsData : [],
              photo: this.imageData ? this.imageData : null,
            }; */
            this.menuFormData.append('restaurantId', this.authService.getRestaurantId());
            this.menuFormData.append('branchId', this.brchId);
            this.menuFormData.append('name', (_f = this.name) === null || _f === void 0 ? void 0 : _f.value);
            this.menuFormData.append('categoryId', (_g = this.category) === null || _g === void 0 ? void 0 : _g.value);
            this.menuFormData.append('unitId', (_h = this.unit) === null || _h === void 0 ? void 0 : _h.value);
            this.menuFormData.append('price', (_j = this.price) === null || _j === void 0 ? void 0 : _j.value);
            for (var index in languagesData) {
                if (languagesData[index].languageCode && languagesData[index].name) {
                    this.menuFormData.append("languages[" + index + "][languageCode]", languagesData[index].languageCode);
                    this.menuFormData.append("languages[" + index + "][name]", languagesData[index].name);
                }
            }
            for (var index in menudetailsData) {
                this.menuFormData.append("menudetails[" + index + "][stockId]", menudetailsData[index].stockId);
                this.menuFormData.append("menudetails[" + index + "][amount]", menudetailsData[index].amount);
                this.menuFormData.append("menudetails[" + index + "][status]", menudetailsData[index].status);
            }
            this.menuService.create(this.menuFormData).subscribe({
                complete: function () {
                    _this.modalDisplay = false;
                    _this.pMessageService.createSuccess();
                    _this.menuService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.menuService.dataSub$.next(data);
                        },
                        complete: function () {
                            _this.ngxSpinnerService.hide();
                        }
                    });
                },
                error: function (data) {
                    _this.pMessageService.dataDuplicate();
                    _this.ngxSpinnerService.hide();
                }
            });
        }
    };
    MenuComponent.prototype.update = function () {
        /* const languagesData = [
          ...(this.form.controls['nameLa'].value ? [{ languageCode: 'LA', name: this.form.controls['nameLa'].value }] : []),
          ...(this.form.controls['nameTh'].value ? [{ languageCode: 'TH', name: this.form.controls['nameTh'].value }] : [])
        ]; */
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var languagesData = this.mlInputEdit.map(function (d) {
            if (d.nativeElement.value) {
                return {
                    id: d.nativeElement.dataset.id,
                    languageCode: d.nativeElement.dataset.code.toUpperCase(),
                    name: d.nativeElement.value
                };
            }
            else {
                return {};
            }
        });
        (_a = this.name) === null || _a === void 0 ? void 0 : _a.markAsDirty();
        (_b = this.category) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        (_c = this.unit) === null || _c === void 0 ? void 0 : _c.markAsDirty();
        (_d = this.price) === null || _d === void 0 ? void 0 : _d.markAsDirty();
        (_e = this.image) === null || _e === void 0 ? void 0 : _e.markAsDirty();
        if (this.form.valid) {
            this.ngxSpinnerService.show();
            var menudetailsData = this.menudetails.map(function (data) {
                return {
                    id: data[data.stockId].id,
                    stockId: data[data.stockId].stockId,
                    amount: data[data.stockId].amount,
                    status: data[data.stockId].status
                };
            });
            /* const createDto: MenuDto = {
              restaurantId: parseInt(<string>this.authService.getRestaurantId()),
              branchId: this.brchId,
              name: this.name?.value,
              categoryId: this.category?.value,
              unitId: this.unit?.value,
              price: this.price?.value,
              languages: [],
              menudetails: menudetailsData.length > 0 ? menudetailsData : [],
              photo: this.imageData ? this.imageData : null,
            }; */
            this.menuFormData.append('menuId', this.dataId.toString());
            this.menuFormData.append('restaurantId', this.authService.getRestaurantId());
            this.menuFormData.append('branchId', this.brchId.toString());
            this.menuFormData.append('name', (_f = this.name) === null || _f === void 0 ? void 0 : _f.value);
            this.menuFormData.append('categoryId', (_g = this.category) === null || _g === void 0 ? void 0 : _g.value);
            this.menuFormData.append('unitId', (_h = this.unit) === null || _h === void 0 ? void 0 : _h.value);
            this.menuFormData.append('price', (_j = this.price) === null || _j === void 0 ? void 0 : _j.value);
            for (var index in languagesData) {
                if (languagesData[index].languageCode && languagesData[index].name) {
                    this.menuFormData.append("languages[" + index + "][id]", languagesData[index].id);
                    this.menuFormData.append("languages[" + index + "][languageCode]", languagesData[index].languageCode);
                    this.menuFormData.append("languages[" + index + "][name]", languagesData[index].name);
                }
            }
            for (var index in menudetailsData) {
                this.menuFormData.append("menudetails[" + index + "][id]", menudetailsData[index].id);
                this.menuFormData.append("menudetails[" + index + "][stockId]", menudetailsData[index].stockId);
                this.menuFormData.append("menudetails[" + index + "][amount]", menudetailsData[index].amount);
                this.menuFormData.append("menudetails[" + index + "][status]", menudetailsData[index].status);
            }
            this.menuService.update(this.menuFormData).subscribe({
                complete: function () {
                    _this.modalEditDisplay = false;
                    _this.pMessageService.updateSuccess();
                    _this.menuService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (data) {
                            _this.data = data;
                            _this.menuService.dataSub$.next(data);
                        },
                        complete: function () {
                            _this.ngxSpinnerService.hide();
                        }
                    });
                },
                error: function () {
                    _this.pMessageService.dataDuplicate();
                    _this.ngxSpinnerService.hide();
                }
            });
        }
    };
    MenuComponent.prototype.addedMenudetails = function () {
        var _a;
        var _this = this;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k;
        (_b = this.amount) === null || _b === void 0 ? void 0 : _b.markAsDirty();
        (_c = this.product) === null || _c === void 0 ? void 0 : _c.markAsDirty();
        (_d = this.status) === null || _d === void 0 ? void 0 : _d.markAsDirty();
        if (((_e = this.product) === null || _e === void 0 ? void 0 : _e.value) && ((_f = this.status) === null || _f === void 0 ? void 0 : _f.value) && ((_g = this.amount) === null || _g === void 0 ? void 0 : _g.value)) {
            var _l = (_h = this.product) === null || _h === void 0 ? void 0 : _h.value.split(','), stockId_1 = _l[0], productName_1 = _l[1];
            /* filter same */
            var filterMenudetails = this.menudetails.filter(function (data) { return stockId_1 === data.stockId; });
            if (filterMenudetails.length > 0) {
                this.menudetails.map(function (data, index) {
                    var _a;
                    var _b, _c, _d;
                    if (data.stockId === stockId_1) {
                        _this.menudetails[index] = (_a = {
                                stockId: stockId_1
                            },
                            _a[stockId_1] = __assign(__assign({}, data[stockId_1]), { productName: productName_1, amount: data[stockId_1].amount + ((_b = _this.amount) === null || _b === void 0 ? void 0 : _b.value) > 100 ? 100 : data[stockId_1].amount + ((_c = _this.amount) === null || _c === void 0 ? void 0 : _c.value), status: (_d = _this.status) === null || _d === void 0 ? void 0 : _d.value }),
                            _a);
                    }
                });
            }
            else {
                this.menudetails.push((_a = {
                        stockId: stockId_1
                    },
                    _a[stockId_1] = {
                        productName: productName_1,
                        stockId: stockId_1,
                        amount: (_j = this.amount) === null || _j === void 0 ? void 0 : _j.value,
                        status: (_k = this.status) === null || _k === void 0 ? void 0 : _k.value
                    },
                    _a));
            }
            /*  */
        }
        else {
            this.pMessageService.empty();
        }
    };
    MenuComponent.prototype.deletedMenudetails = function (index) {
        this.menudetails = this.menudetails.filter(function (_, i) { return i !== index; });
    };
    MenuComponent.prototype.productNameEditEvent = function (event, index, oldStockId) {
        var _a;
        var _b = event.value.split(','), stockId = _b[0], productName = _b[1];
        var filterMenu = this.menudetails.filter(function (data) { return data[data.stockId].productName === productName; });
        if (filterMenu.length > 0) {
            return;
        }
        else {
            this.menudetails[index] = (_a = {
                    stockId: stockId
                },
                _a[stockId] = __assign(__assign({}, this.menudetails[index][oldStockId]), { productName: productName }),
                _a);
        }
    };
    MenuComponent.prototype.amountNameEditEvent = function (event, index, stockId) {
        var _a;
        this.menudetails[index] = (_a = {
                stockId: stockId
            },
            _a[stockId] = __assign(__assign({}, this.menudetails[index][stockId]), { amount: this.amountEditValue ? this.amountEditValue : 1 }),
            _a);
    };
    MenuComponent.prototype.statusEditEvent = function (event, index, stockId) {
        var _a;
        this.menudetails[index] = (_a = {
                stockId: stockId
            },
            _a[stockId] = __assign(__assign({}, this.menudetails[index][stockId]), { status: event.value }),
            _a);
    };
    MenuComponent.prototype.imageUploaded = function (fileInput) {
        this.menuFormData.append('photo', fileInput.files[0], fileInput.files[0].name);
    };
    MenuComponent.prototype.addedMenudetailsEdit = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        if (((_a = this.product) === null || _a === void 0 ? void 0 : _a.value) && ((_b = this.status) === null || _b === void 0 ? void 0 : _b.value) && ((_c = this.amount) === null || _c === void 0 ? void 0 : _c.value)) {
            var _g = (_d = this.product) === null || _d === void 0 ? void 0 : _d.value.split(','), stockId_2 = _g[0], productName = _g[1];
            this.ngxSpinnerService.show();
            var filterMenudetails = this.menudetails.filter(function (data) { return stockId_2 === data.stockId; });
            if (filterMenudetails.length > 0) {
                this.menudetails.map(function (data, index) {
                    var _a, _b;
                    if (data.stockId === stockId_2) {
                        /* editmenu */
                        _this.menuDetailsService.update({
                            menuDetailId: data[data.stockId].id,
                            menuId: _this.dataId,
                            stockId: stockId_2,
                            amount: (_a = _this.amount) === null || _a === void 0 ? void 0 : _a.value,
                            status: (_b = _this.status) === null || _b === void 0 ? void 0 : _b.value
                        }).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                            next: function () {
                                _this.menuService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                                    next: function (data) {
                                        _this.data = data;
                                        _this.menuService.dataSub$.next(data);
                                        _this.data.map(function (data) {
                                            if (data.id === _this.dataId) {
                                                _this.menudetails = data.menudetails.map(function (value) {
                                                    var _a;
                                                    return _a = {
                                                            stockId: value.stockId.toString()
                                                        },
                                                        _a[value.stockId] = {
                                                            id: value.id,
                                                            stockId: value.stockId.toString(),
                                                            productName: value.productName,
                                                            amount: value.amount,
                                                            status: value.status
                                                        },
                                                        _a;
                                                });
                                            }
                                        });
                                    }
                                });
                            },
                            complete: function () {
                                _this.ngxSpinnerService.hide();
                                _this.pMessageService.updateSuccess();
                            },
                            error: function (e) {
                                _this.ngxSpinnerService.hide();
                            }
                        });
                    }
                });
            }
            else {
                /* added new meu */
                this.menuDetailsService.create({
                    menuId: this.dataId,
                    stockId: stockId_2,
                    amount: (_e = this.amount) === null || _e === void 0 ? void 0 : _e.value,
                    status: (_f = this.status) === null || _f === void 0 ? void 0 : _f.value
                }).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
                    next: function () {
                        _this.menuService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                            next: function (data) {
                                _this.data = data;
                                _this.menuService.dataSub$.next(data);
                                _this.data.map(function (data) {
                                    if (data.id === _this.dataId) {
                                        _this.menudetails = data.menudetails.map(function (value) {
                                            var _a;
                                            return _a = {
                                                    stockId: value.stockId.toString()
                                                },
                                                _a[value.stockId] = {
                                                    id: value.id,
                                                    stockId: value.stockId.toString(),
                                                    productName: value.productName,
                                                    amount: value.amount,
                                                    status: value.status
                                                },
                                                _a;
                                        });
                                    }
                                });
                            }
                        });
                    },
                    complete: function () {
                        _this.ngxSpinnerService.hide();
                        _this.pMessageService.deleteSuccess();
                    },
                    error: function (e) {
                        _this.ngxSpinnerService.hide();
                    }
                });
            }
        }
        else {
            this.pMessageService.empty();
        }
    };
    MenuComponent.prototype.deletedMenudetailsEdit = function (_a) {
        var _this = this;
        var menuDetailId = _a.menuDetailId, stockId = _a.stockId;
        this.ngxSpinnerService.show();
        this.menuDetailsService["delete"]({
            menuDetailId: menuDetailId,
            menuId: this.dataId,
            stockId: parseInt(stockId)
        }).pipe(rxjs_1.takeUntil(this.destroy$)).subscribe({
            next: function () {
                _this.menuService.findAll(_this.brchId).pipe(rxjs_1.takeUntil(_this.destroy$)).subscribe({
                    next: function (data) {
                        _this.data = data;
                        _this.menuService.dataSub$.next(data);
                        _this.data.map(function (data) {
                            if (data.id === _this.dataId) {
                                _this.menudetails = data.menudetails.map(function (value) {
                                    var _a;
                                    return _a = {
                                            stockId: value.stockId.toString()
                                        },
                                        _a[value.stockId] = {
                                            id: value.id,
                                            stockId: value.stockId.toString(),
                                            productName: value.productName,
                                            amount: value.amount,
                                            status: value.status
                                        },
                                        _a;
                                });
                            }
                        });
                    }
                });
            },
            complete: function () {
                _this.ngxSpinnerService.hide();
                _this.pMessageService.deleteSuccess();
            },
            error: function (e) {
                _this.ngxSpinnerService.hide();
            }
        });
    };
    MenuComponent.prototype.mlOpen = function () {
        this.ml = !this.ml;
    };
    MenuComponent.prototype.nameLaEvent = function () {
        if (index_util_1.nationalRegexPatternLaos().test(this.form.controls['nameLa'].value)) {
        }
        else {
            this.form.controls['nameLa'].setValue('');
        }
    };
    MenuComponent.prototype.nameThEvent = function () {
        if (index_util_1.nationalRegexPatternThai().test(this.form.controls['nameTh'].value)) {
        }
        else {
            this.form.controls['nameTh'].setValue('');
        }
    };
    MenuComponent.prototype.languagesDropEvent = function () {
        this.ml = false;
    };
    MenuComponent.prototype.tt = function () {
    };
    MenuComponent.prototype.checkMl = function (lcode) {
        this.mlInput.map(function (d) {
            if (d.nativeElement.dataset.code === 'th') {
                if (index_util_1.nationalRegexPatternThai().test(d.nativeElement.value)) {
                }
                else {
                    d.nativeElement.value = '';
                }
            }
            else if (d.nativeElement.dataset.code === 'vn') {
                if (index_util_1.nationalRegexPatternVn().test(d.nativeElement.value)) {
                }
                else {
                    d.nativeElement.value = '';
                }
            }
            else if (d.nativeElement.dataset.code === 'en') {
                if (index_util_1.nationalRegexPatternEn().test(d.nativeElement.value)) {
                }
                else {
                    d.nativeElement.value = '';
                }
            }
        });
    };
    MenuComponent.prototype.checkMlEdit = function (lcode, defaultValue) {
        this.mlInputEdit.map(function (d) {
            var dataSetCode = d.nativeElement.dataset.code.toLowerCase();
            if (dataSetCode == 'th') {
                if (index_util_1.nationalRegexPatternThai().test(d.nativeElement.value)) {
                }
                else {
                    d.nativeElement.value = defaultValue;
                }
            }
            else if (dataSetCode == 'vn') {
                if (index_util_1.nationalRegexPatternVn().test(d.nativeElement.value)) {
                }
                else {
                    d.nativeElement.value = defaultValue;
                }
            }
            else if (dataSetCode == 'en') {
                if (index_util_1.nationalRegexPatternEn().test(d.nativeElement.value)) {
                }
                else {
                    d.nativeElement.value = defaultValue;
                }
            }
        });
    };
    MenuComponent.prototype.resizeFullPic = function (image) {
        document.querySelector('body').style.overflowY = 'hidden';
        this.resizeImageUrl = 'https://rmstest.jlsipos.com/images/' + image;
        this.resizeImageDisplay = true;
    };
    MenuComponent.prototype.closed = function () {
        document.querySelector('body').style.overflowY = 'auto';
        this.resizeImageDisplay = false;
    };
    __decorate([
        core_1.ViewChildren('mlInput')
    ], MenuComponent.prototype, "mlInput");
    __decorate([
        core_1.ViewChildren('mlInputEdit')
    ], MenuComponent.prototype, "mlInputEdit");
    __decorate([
        core_1.HostListener('click', ['$event.target'])
    ], MenuComponent.prototype, "clickedTable");
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'app-menu',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.css'],
            animations: [
                animations_1.trigger('animate', [
                    animations_1.transition(':enter', [
                        animations_1.style({ opacity: 0 }),
                        animations_1.animate('0.2s ease-in-out', animations_1.style({
                            opacity: 1
                        })),
                    ]),
                    animations_1.transition(':leave', [
                        animations_1.style({ opacity: 1 }),
                        animations_1.animate('0.2s ease-in-out', animations_1.style({
                            opacity: 0
                        })),
                    ]),
                ]),
            ]
        })
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
