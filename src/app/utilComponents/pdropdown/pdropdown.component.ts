import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'pdropdown',
  templateUrl: './pdropdown.component.html',
  styleUrls: ['./pdropdown.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PdropdownComponent implements OnInit {
  @Input() options : any[];
  @Input() control: AbstractControl;
  @Input() placeholder: string;
  constructor() { }

  ngOnInit(): void {
  }

}
