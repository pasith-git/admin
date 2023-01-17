import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-resize-image',
  templateUrl: './resize-image.component.html',
  styleUrls: ['./resize-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    trigger('dumbParent', [
      transition('* => void', [
        query('@*', [animateChild()], { optional: true })
      ]),
    ])
  ],
})
export class ResizeImageComponent implements OnInit, OnChanges {
  @Input() display: boolean;
  @Input() urlImage: string;
  @Output() eventClose = new EventEmitter();
  constructor() { }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.eventClose.emit();
  }

  @HostListener('click', ['$event.target']) clickOutSide(target: any) {
    if(!document.querySelector('.image-layout')?.contains(target)){
      this.eventClose.emit();
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.display = changes['display'].currentValue;
  }

  closed() {
    this.eventClose.emit();
  }

}
