import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'menu-report-header',
  templateUrl: './menu-report-header.component.html',
  styleUrls: ['./menu-report-header.component.css']
})
export class MenuReportHeaderComponent implements OnInit {
  @Input() menuList: any[];
  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {

  }

}
