import { AfterViewInit, Component, ContentChild, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import * as _ from 'lodash';
import { PmodalComponent } from 'src/app/utilComponents/pmodal/pmodal.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'table-box',
  templateUrl: './table-box.component.html',
  styleUrls: ['./table-box.component.css']
})
export class TableBoxComponent implements OnInit, AfterViewInit {
  public bchParam: string;
  private _value: Order[] = [];
  @Input() get data() {
    return this._value;
  }
  set data(value: Order[]) {
    const sort = _.sortBy(value, ({ tableName }) => tableName)
    this._value = sort;
  }
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.bchParam = this.route.snapshot.params['id'];
  }
  ngAfterViewInit(): void {
  }

}
