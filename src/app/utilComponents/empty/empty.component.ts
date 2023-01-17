import { Component, Input, OnInit } from '@angular/core';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'data-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {
  @Input() message: string;
  faExclamationCircle = faExclamationCircle;
  constructor() { }

  ngOnInit(): void {
  }

}
