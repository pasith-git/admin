import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css'],
  animations: [
    trigger('animate', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.5)',
        }),
        animate('0.2s ease-in-out', style({
          opacity: 1,
          transform: 'scale(1)',
        })),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'scale(1)',
        }),
        animate('0.2s ease-in-out', style({
          opacity: 0,
          transform: 'scale(0.5)',
        })),
      ]),
    ]),
  ],
})
export class QrComponent implements OnInit {
  @Input() display: boolean;
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }
  close(){
    this.display = false;
    this.data = undefined;
  }
}
