"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DynamicCrudComponent = void 0;
var core_1 = require("@angular/core");
var index_util_1 = require("src/app/utilConstant/index.util");
var dp_button_component_1 = require("../dp-button/dp-button.component");
var DynamicCrudComponent = /** @class */ (function () {
    function DynamicCrudComponent(el, permissonService, np) {
        this.el = el;
        this.permissonService = permissonService;
        this.np = np;
        this.col = [];
        this.modalShow = new core_1.EventEmitter();
        this.dpEdit = new core_1.EventEmitter();
        this.dpRemove = new core_1.EventEmitter();
        this.eventFullPic = new core_1.EventEmitter();
        this.roles = [];
    }
    ;
    DynamicCrudComponent.prototype.onWindowScroll = function (e) {
        var _a;
        var offSetTable = (_a = this.el.nativeElement.getElementsByClassName('p-datatable')[0]) === null || _a === void 0 ? void 0 : _a.offsetTop;
        var headerTable = this.el.nativeElement.getElementsByClassName('crud-header')[0];
        var theadTable = this.el.nativeElement.getElementsByClassName('p-datatable-thead')[0];
        var windowScroll = e.target.scrollingElement.scrollTop;
        if (headerTable) {
            if (windowScroll > offSetTable) {
                theadTable.style.cssText = "\n        position: sticky;\n        z-index: 1011;\n        top: 55px;\n        ";
                headerTable.style.cssText = "\n        position: sticky;\n        z-index: 1011;\n        margin-bottom: 0px;\n        padding: 5px 0 !important;\n        top: 0;\n        ";
                return;
            }
            headerTable.style.cssText = "\n      padding: 5px 0 !important;\n      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;\n      margin-bottom: 0.5em; \n      ";
        }
    };
    DynamicCrudComponent.prototype.ngOnInit = function () {
    };
    DynamicCrudComponent.prototype.showDialog = function (bool) {
        document.querySelector('body').style.overflowY = 'hidden';
        this.dpButtons.map(function (dpButtonComponent, index) {
            dpButtonComponent.display = false;
        });
        this.modalShow.emit(bool);
    };
    DynamicCrudComponent.prototype.toggleDp = function (dpId) {
        this.dpButtons.map(function (dpButtonComponent, index) {
            if (dpId === dpButtonComponent.dpId) {
                dpButtonComponent.display = dpButtonComponent.display === false ? true : false;
            }
            else {
                dpButtonComponent.display = false;
            }
        });
    };
    DynamicCrudComponent.prototype.dpEditEvent = function (id, dpIndex) {
        this.dpEdit.emit({ id: id, dpIndex: dpIndex });
        this.dpButtons.map(function (dpButtonComponent) {
            if (dpButtonComponent.dpId === id) {
                dpButtonComponent.display = false;
            }
        });
    };
    DynamicCrudComponent.prototype.dpRemoveEvent = function (id) {
        this.dpRemove.emit({ id: id });
    };
    DynamicCrudComponent.prototype.checkRoles = function (_roles) {
        if (_roles) {
            var roles = _roles.split(',');
            var filter = roles.filter(function (data) { return data === index_util_1.Roles.RESTAURANTADMIN || index_util_1.Roles.BRANCHMANAGER; });
            if (filter.length > 0) {
                this.roles = filter;
            }
        }
    };
    DynamicCrudComponent.prototype.permissionFailedAlert = function () {
        this.permissonService.showModal();
    };
    DynamicCrudComponent.prototype.resizeFullPic = function (data) {
        this.eventFullPic.emit(data);
    };
    __decorate([
        core_1.Input()
    ], DynamicCrudComponent.prototype, "extraColKey");
    __decorate([
        core_1.Input()
    ], DynamicCrudComponent.prototype, "data$");
    __decorate([
        core_1.Input()
    ], DynamicCrudComponent.prototype, "col");
    __decorate([
        core_1.Input()
    ], DynamicCrudComponent.prototype, "items");
    __decorate([
        core_1.Output()
    ], DynamicCrudComponent.prototype, "modalShow");
    __decorate([
        core_1.ViewChildren(dp_button_component_1.DpButtonComponent)
    ], DynamicCrudComponent.prototype, "dpButtons");
    __decorate([
        core_1.Output()
    ], DynamicCrudComponent.prototype, "dpEdit");
    __decorate([
        core_1.Output()
    ], DynamicCrudComponent.prototype, "dpRemove");
    __decorate([
        core_1.Input()
    ], DynamicCrudComponent.prototype, "disabled");
    __decorate([
        core_1.Input()
    ], DynamicCrudComponent.prototype, "extraColCheck");
    __decorate([
        core_1.Input()
    ], DynamicCrudComponent.prototype, "extraColProfile");
    __decorate([
        core_1.Input()
    ], DynamicCrudComponent.prototype, "extraCol");
    __decorate([
        core_1.Output()
    ], DynamicCrudComponent.prototype, "eventFullPic");
    __decorate([
        core_1.HostListener("window:scroll", ['$event'])
    ], DynamicCrudComponent.prototype, "onWindowScroll");
    DynamicCrudComponent = __decorate([
        core_1.Component({
            selector: 'dynamic-crud',
            templateUrl: './dynamic-crud.component.html',
            styleUrls: ['./dynamic-crud.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], DynamicCrudComponent);
    return DynamicCrudComponent;
}());
exports.DynamicCrudComponent = DynamicCrudComponent;
