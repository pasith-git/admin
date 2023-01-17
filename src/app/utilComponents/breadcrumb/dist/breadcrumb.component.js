"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BreadcrumbComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var BreadcrumbComponent = /** @class */ (function () {
    function BreadcrumbComponent(router) {
        var _this = this;
        this.router = router;
        this.breadcrumbs = [];
        this.homeItem = { icon: 'pi pi-home', routerLink: '/' };
        this.router.events
            .pipe(rxjs_1.filter(function (e) { return e instanceof router_1.NavigationEnd; }))
            .subscribe(function (e) {
            var root = _this.router.routerState.snapshot.root;
            var breadcrumb = [];
            _this.breadcrumbs = breadcrumb;
            _this.addBreadcrumb(root, [], breadcrumb);
        });
    }
    BreadcrumbComponent.prototype.ngOnInit = function () {
    };
    BreadcrumbComponent.prototype.addBreadcrumb = function (route, parentUrl, breadcrumbs) {
        if (route) {
            var routeUrl = parentUrl.concat(route.url.map(function (url) { return url.path; }));
            if (route.data['breadcrumb']) {
                var breadcrumb = {
                    label: this.getLabel(route.data),
                    url: routeUrl.join('/')
                };
                breadcrumbs.push(breadcrumb);
            }
            this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
        }
    };
    BreadcrumbComponent.prototype.getLabel = function (data) {
        return typeof data['breadcrumb'] === 'function' ? data['breadcrumb'](data) : data['breadcrumb'];
    };
    BreadcrumbComponent = __decorate([
        core_1.Component({
            selector: 'app-breadcrumb',
            templateUrl: './breadcrumb.component.html',
            styleUrls: ['./breadcrumb.component.css']
        })
    ], BreadcrumbComponent);
    return BreadcrumbComponent;
}());
exports.BreadcrumbComponent = BreadcrumbComponent;
