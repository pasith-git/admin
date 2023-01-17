import { Component, ContentChild, Input, OnInit} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'state-input',
  templateUrl: './state-input.component.html',
  styleUrls: ['./state-input.component.css']
})
export class StateInputComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() control: AbstractControl;
  @Input() boxControl: boolean;
  @Input() errControl: string;
  @Input() errMessage: string;
  constructor() { }

  ngOnInit(): void {
  }

}
