import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'temBoards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  @Input() totalData: any;
  @ContentChild('pboard',{static: false}) pboard : TemplateRef<any>;
  constructor() { }

  ngOnInit(): void {
    
  }

}
