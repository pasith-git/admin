import { Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { colPrinter, Printer } from 'src/app/models/printer.model';
import { AuthService } from 'src/app/services/auth.service';
import { PrinterService } from 'src/app/services/printer.service';
import { TestService } from 'src/app/services/test.service';
import { readBook } from './test.action';

@Component({
  selector: 'test-bill',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnChanges, OnDestroy {

  public destroy$: Subject<boolean> = new Subject();
  public data$: Observable<Printer[]> = this.printerService.dataObs$;
  public col: any[];
  public items: MenuItem[];
  public book: Observable<any>;
  constructor(private printerService: PrinterService, private store: Store<{ books: string }>, private testService: TestService, private location: Location) {
  }

  ngOnInit(): void {
    console.log(this.testService.name);
    this.items = [
      {
        label: 'Update', icon: 'pi pi-refresh', command: () => { }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => { }
      },
    ];
    this.col = colPrinter;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  change() {
    this.store.dispatch(readBook());
  }
}
