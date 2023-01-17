"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenuListComponent = void 0;
var core_1 = require("@angular/core");
var MenuListComponent = /** @class */ (function () {
    function MenuListComponent(route, router, rs, np) {
        this.route = route;
        this.router = router;
        this.rs = rs;
        this.np = np;
        this.data = [];
        this.currentSize = 0;
        this.modalDisplay = false;
        this.modalEvent = new core_1.EventEmitter();
    }
    MenuListComponent.prototype.ngOnInit = function () {
        this.calMenuList = this.data.length / 8;
        this.floorList = Math.floor(this.data.length / 8);
        this.calSize = this.data.length % 8 == 0 ? this.floorList : this.floorList + 1;
        /*  */
        this.fullMenuSize = this.calSize;
    };
    MenuListComponent.prototype.slide = function (n) {
        this.currentSize += n;
        var result = this.currentSize * 80;
        this.setStyle(this.menulist, 'transform', "translateX(-" + result + "vw)");
        this.setStyle(this.menulist, 'transition', "0.2s");
        var csCheck = this.currentSize;
        if (csCheck == 0) {
            this.setStyle(this.btnprev, 'display', 'none');
            this.setStyle(this.btnnext, 'display', 'block');
        }
        if (csCheck > 0 && csCheck < this.fullMenuSize) {
            this.setStyle(this.btnprev, 'display', 'block');
            this.setStyle(this.btnnext, 'display', 'block');
        }
        if (csCheck > 0 && csCheck == this.fullMenuSize - 1) {
            this.setStyle(this.btnprev, 'display', 'block');
            this.setStyle(this.btnnext, 'display', 'none');
        }
    };
    MenuListComponent.prototype.ngAfterViewInit = function () {
        if (this.fullMenuSize == 1 || this.fullMenuSize == 0) {
            this.setStyle(this.btnprev, 'display', "none");
            this.setStyle(this.btnnext, 'display', "none");
        }
        else {
            this.setStyle(this.btnprev, 'display', "none");
            this.setStyle(this.btnnext, 'display', "block");
        }
    };
    MenuListComponent.prototype.setStyle = function (el, styleName, value) {
        el.nativeElement.style[styleName] = value;
    };
    MenuListComponent.prototype.navReport = function (bid) {
        this.router.navigate(['/ordersreport'], { state: { bid: bid } });
    };
    MenuListComponent.prototype.modalShow = function (id) {
        this.modalEvent.emit(id);
    };
    __decorate([
        core_1.Input()
    ], MenuListComponent.prototype, "data");
    __decorate([
        core_1.Input()
    ], MenuListComponent.prototype, "menuItems");
    __decorate([
        core_1.Input()
    ], MenuListComponent.prototype, "rbid");
    __decorate([
        core_1.Input()
    ], MenuListComponent.prototype, "rbname");
    __decorate([
        core_1.Output()
    ], MenuListComponent.prototype, "modalEvent");
    __decorate([
        core_1.ViewChild('id')
    ], MenuListComponent.prototype, "id");
    __decorate([
        core_1.ViewChild('btnprev')
    ], MenuListComponent.prototype, "btnprev");
    __decorate([
        core_1.ViewChild('btnnext')
    ], MenuListComponent.prototype, "btnnext");
    __decorate([
        core_1.ViewChild('menulist')
    ], MenuListComponent.prototype, "menulist");
    __decorate([
        core_1.ContentChild('menu-list')
    ], MenuListComponent.prototype, "menuList");
    __decorate([
        core_1.ViewChildren('dialog')
    ], MenuListComponent.prototype, "dialog");
    MenuListComponent = __decorate([
        core_1.Component({
            selector: 'menu-list',
            templateUrl: './menu-list.component.html',
            styleUrls: ['./menu-list.component.css']
        })
    ], MenuListComponent);
    return MenuListComponent;
}());
exports.MenuListComponent = MenuListComponent;
