"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TestComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var printer_model_1 = require("src/app/models/printer.model");
var test_action_1 = require("./test.action");
var TestComponent = /** @class */ (function () {
    function TestComponent(printerService, store, testService, location) {
        this.printerService = printerService;
        this.store = store;
        this.testService = testService;
        this.location = location;
        this.destroy$ = new rxjs_1.Subject();
        this.data$ = this.printerService.dataObs$;
    }
    TestComponent.prototype.ngOnInit = function () {
        console.log(this.testService.name);
        this.items = [
            {
                label: 'Update', icon: 'pi pi-refresh',
                command: function () { }
            },
            {
                label: 'Delete', icon: 'pi pi-times',
                command: function () { }
            },
        ];
        this.col = printer_model_1.colPrinter;
    };
    TestComponent.prototype.ngOnChanges = function (changes) {
    };
    TestComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    };
    TestComponent.prototype.change = function () {
        this.store.dispatch(test_action_1.readBook());
    };
    TestComponent = __decorate([
        core_1.Component({
            selector: 'test-bill',
            templateUrl: './test.component.html',
            styleUrls: ['./test.component.css']
        })
    ], TestComponent);
    return TestComponent;
}());
exports.TestComponent = TestComponent;
