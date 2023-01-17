"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CalculatorComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var CalStatus;
(function (CalStatus) {
    CalStatus["start"] = "start";
    CalStatus["con"] = "con";
})(CalStatus || (CalStatus = {}));
var CalculatorComponent = /** @class */ (function () {
    function CalculatorComponent() {
        this.calValue = new core_1.EventEmitter();
        this.calResult = '0';
    }
    CalculatorComponent.prototype.ngOnInit = function () {
    };
    CalculatorComponent.prototype.calReset = function () {
        this.mathOperator = '';
        this.mathMemory = '';
        this.calResult = '0';
        this.memoryCal = 0;
        this.lastOperand = '';
        this.lastOperator = '';
        this.lastStatus = false;
    };
    CalculatorComponent.prototype.calEvent = function (e) {
        if (typeof e === 'number') {
            this.mathMemory = '';
            if (this.memoryCal) {
                if (this.status === CalStatus.start) {
                    this.status = CalStatus.con;
                    this.calResult = e.toString();
                }
                else {
                    if (this.calResult.includes('.')) {
                        var lastNumberPoint = this.calResult.split(".")[1];
                        if (lastNumberPoint.length > 2) {
                            return;
                        }
                    }
                    this.calResult += e.toString();
                }
                this.lastOperand = this.calResult;
            }
            else {
                if (this.calResult.includes('.')) {
                    var lastNumberPoint = this.calResult.split(".")[1];
                    if (lastNumberPoint.length > 2) {
                        return;
                    }
                }
                this.calResult += e.toString();
            }
        }
        else {
            if (e === 'clear') {
                this.calReset();
            }
            else if (e === 'del') {
                if (this.calResult.length === 1) {
                    this.calResult = '0';
                }
                else {
                    this.calResult = this.calResult.slice(0, -1);
                }
                this.mathOperator = '';
                this.mathMemory = '';
                this.memoryCal = 0;
                this.lastOperand = '';
                this.lastOperator = '';
                this.lastStatus = false;
            }
            else if (e === '=') {
                if (this.lastOperator && this.lastOperand) {
                    this.calResult = eval(this.memoryCal + " " + this.lastOperator + " " + this.lastOperand);
                    this.memoryCal = parseFloat(this.calResult);
                    this.lastStatus = true;
                }
            }
            else if (e === '.') {
                this.calResult = this.calResult + '.';
            }
            else {
                if (!this.mathMemory) {
                    if (this.lastStatus) {
                        this.status = CalStatus.start;
                        this.memoryCal = parseFloat(this.calResult);
                        this.lastOperand = '';
                        this.lastOperator = '';
                        this.lastStatus = false;
                    }
                    else {
                        if (this.memoryCal) {
                            if (this.mathOperator === e) {
                                this.calResult = eval(this.memoryCal + " " + e + " " + this.calResult);
                                this.memoryCal = parseFloat(this.calResult);
                                this.status = CalStatus.start;
                                /* this.lastOperand = parseInt(this.calResult);
                                this.lastOperator = e; */
                            }
                            else {
                                this.calResult = eval(this.memoryCal + " " + this.mathOperator + " " + this.calResult);
                                this.memoryCal = parseFloat(this.calResult);
                                this.status = CalStatus.start;
                            }
                        }
                        else {
                            this.memoryCal = parseFloat(this.calResult); //memoryCal = left side operator
                            this.status = CalStatus.start;
                        }
                    }
                }
                this.mathOperator = e;
                this.mathMemory = this.mathOperator;
                this.lastOperator = this.mathOperator;
            }
        }
    };
    CalculatorComponent.prototype.getResult = function () {
        this.calValue.emit({ calResult: parseFloat(this.calResult) });
    };
    __decorate([
        core_1.Output()
    ], CalculatorComponent.prototype, "calValue");
    __decorate([
        core_1.Input()
    ], CalculatorComponent.prototype, "display");
    __decorate([
        core_1.Input()
    ], CalculatorComponent.prototype, "calStyle");
    CalculatorComponent = __decorate([
        core_1.Component({
            selector: 'p-calculator',
            templateUrl: './calculator.component.html',
            styleUrls: ['./calculator.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            animations: [
                animations_1.trigger('calAnimate', [
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
                ])
            ]
        })
    ], CalculatorComponent);
    return CalculatorComponent;
}());
exports.CalculatorComponent = CalculatorComponent;
