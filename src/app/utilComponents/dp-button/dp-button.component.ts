import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Host, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { faCaretDown, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'dp-button',
  templateUrl: './dp-button.component.html',
  styleUrls: ['./dp-button.component.css'],
  animations: [
    trigger('dropdown', [
      transition(':enter', [
        style({ height: 0 }),
        animate('0.2s ease-in-out', style({
          height: '*',
        })),
      ]),
      transition(':leave', [
        style({ height: '*' }),
        animate('0.1s ease-in-out', style({
          height: 0,
        })),
      ]),
    ])
  ],
})
export class DpButtonComponent implements OnInit {
  display: boolean = false;
  faCaretDown = faCaretDown;
  faEdit = faEdit;
  faTrash = faTrash;
  @Input() dpId: number;
  @Input() dpIndex: number;
  @Output() toggle = new EventEmitter();
  @Output() dpEdit = new EventEmitter();
  @Output() dpRemove = new EventEmitter();
  @ViewChild('dpToggle') dpToggle: ElementRef;
  constructor() {
  }
  @HostListener('click', ['$event']) clickInSide(e: Event) {
    e.stopPropagation();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.display = false;
  }

  @HostListener('document:click', ['$event']) clickOutside(e: Event) {
    if (e.target !== this.dpToggle.nativeElement) {
      this.display = false;
    }
  }
  ngOnInit(): void {
  }
  toggleDp() {
    this.toggle.emit(this.dpIndex);
  }
}
