import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
@Component({
  selector: 'app-each-board',
  templateUrl: './each-board.component.html',
  styleUrls: ['./each-board.component.css']
})
export class EachBoardComponent implements OnInit {
  @Input() public total: any;
  @Input() public name: any;
  @Input() public icon: any; 
  constructor(private orderService: OrdersService) {

  }

  ngOnInit(): void {
  }

}
