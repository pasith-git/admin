import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
enum CalStatus {
  start = 'start',
  con = 'con'
}

@Component({
  selector: 'p-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('calAnimate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease-in-out', style({
          opacity: 1,
        })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s ease-in-out', style({
          opacity: 0,
        })),
      ]),
    ])
  ],
})


export class CalculatorComponent implements OnInit {
  @Output() calValue = new EventEmitter();
  @Input() display: boolean;
  @Input() calStyle: any;

  public memoryCal: number;
  public mathOperator: string;
  public mathMemory: string;
  public status: CalStatus;
  public calResult: string = '0';

  /* memory operand */

  public lastOperand: string;
  public lastOperator: string;
  public lastStatus: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  calReset() {
    this.mathOperator = '';
    this.mathMemory = '';
    this.calResult = '0';
    this.memoryCal = 0;
    this.lastOperand = '';
    this.lastOperator = '';
    this.lastStatus = false;
  }
  calEvent(e: string | number) {
    if (typeof e === 'number') {
      this.mathMemory = '';
      if (this.memoryCal) {
        if (this.status === CalStatus.start) {
          this.status = CalStatus.con;
          this.calResult = e.toString();
        } else {
          if (this.calResult.includes('.')) {
            const lastNumberPoint = this.calResult.split(".")[1];
            if (lastNumberPoint.length > 2) {
              return;
            }
          }
          this.calResult += e.toString();
        }
        this.lastOperand = this.calResult;
      } else {
        if (this.calResult.includes('.')) {
          const lastNumberPoint = this.calResult.split(".")[1];
          if (lastNumberPoint.length > 2) {
            return;
          }
        }
        this.calResult += e.toString();
      }
    } else {
      if (e === 'clear') {
        this.calReset();
      } else if (e === 'del') {
        if (this.calResult.toString().length === 1) {
          this.calResult = '0';
        } else if (this.calResult.toString().length > 1) {
          this.calResult = this.calResult.toString().slice(0, -1)
        }
        this.mathOperator = '';
        this.mathMemory = '';
        this.memoryCal = 0;
        this.lastOperand = '';
        this.lastOperator = '';
        this.lastStatus = false;
      } else if (e === '=') {

        if (this.lastOperator && this.lastOperand) {
          this.calResult = eval(`${this.memoryCal} ${this.lastOperator} ${this.lastOperand}`);
          this.memoryCal = parseFloat(this.calResult);
          this.lastStatus = true;
        }
      } else if (e === '.') {
        this.calResult = this.calResult + '.';
      } else {
        if (!this.mathMemory) {
          if (this.lastStatus) {
            this.status = CalStatus.start;
            this.memoryCal = parseFloat(this.calResult);
            this.lastOperand = '';
            this.lastOperator = '';
            this.lastStatus = false;
          } else {
            if (this.memoryCal) {
              if (this.mathOperator === e) {
                this.calResult = eval(`${this.memoryCal} ${e} ${this.calResult}`);
                this.memoryCal = parseFloat(this.calResult);
                this.status = CalStatus.start;
                /* this.lastOperand = parseInt(this.calResult);
                this.lastOperator = e; */
              } else {
                this.calResult = eval(`${this.memoryCal} ${this.mathOperator} ${this.calResult}`);
                this.memoryCal = parseFloat(this.calResult);
                this.status = CalStatus.start;
              }
            } else {
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
  }

  keyEvent(e: KeyboardEvent) {
    e.preventDefault();
    if (e.ctrlKey && e.key === "Backspace") {
      this.calReset();
    } else if (!e.ctrlKey && e.key === "Backspace") {
      if (this.calResult.toString().length === 1) {
        this.calResult = '0';
      } else if (this.calResult.toString().length > 1) {
        this.calResult = this.calResult.toString().slice(0, -1)
      }
      this.mathOperator = '';
      this.mathMemory = '';
      this.memoryCal = 0;
      this.lastOperand = '';
      this.lastOperator = '';
      this.lastStatus = false;
    } else if (e.key === ".") {
      this.calResult = this.calResult + '.';
    } else if (/^[0-9]$/.test(e.key)) {
      this.mathMemory = '';
      if (this.memoryCal) {
        if (this.status === CalStatus.start) {
          this.status = CalStatus.con;
          this.calResult = e.key;
        } else {
          if (this.calResult.includes('.')) {
            const lastNumberPoint = this.calResult.split(".")[1];
            if (lastNumberPoint.length > 2) {
              return;
            }
          }
          this.calResult += e.key;
        }
        this.lastOperand = this.calResult;
      } else {
        if (this.calResult.includes('.')) {
          const lastNumberPoint = this.calResult.split(".")[1];
          if (lastNumberPoint.length > 2) {
            return;
          }
        }
        this.calResult += e.key;
      }
    } else if (e.key === "Enter" && !e.ctrlKey) {
      if (this.lastOperator && this.lastOperand) {
        this.calResult = eval(`${this.memoryCal} ${this.lastOperator} ${this.lastOperand}`);
        this.memoryCal = parseFloat(this.calResult);
        this.lastStatus = true;
      }
    } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
      if (!this.mathMemory) {
        if (this.lastStatus) {
          this.status = CalStatus.start;
          this.memoryCal = parseFloat(this.calResult);
          this.lastOperand = '';
          this.lastOperator = '';
          this.lastStatus = false;
        } else {
          if (this.memoryCal) {
            if (this.mathOperator === e.key) {
              this.calResult = eval(`${this.memoryCal} ${e} ${this.calResult}`);
              this.memoryCal = parseFloat(this.calResult);
              this.status = CalStatus.start;
              /* this.lastOperand = parseInt(this.calResult);
              this.lastOperator = e; */
            } else {
              this.calResult = eval(`${this.memoryCal} ${this.mathOperator} ${this.calResult}`);
              this.memoryCal = parseFloat(this.calResult);
              this.status = CalStatus.start;
            }
          } else {
            this.memoryCal = parseFloat(this.calResult); //memoryCal = left side operator
            this.status = CalStatus.start;
          }
        }

      }
      this.mathOperator = e.key;
      this.mathMemory = this.mathOperator;
      this.lastOperator = this.mathOperator;
    }

  }

  getResultByEvent(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "Enter") {
      this.calValue.emit({ calResult: parseFloat(this.calResult) });
    }
  }

  getResult() {
    this.calValue.emit({ calResult: parseFloat(this.calResult) });
  }
}