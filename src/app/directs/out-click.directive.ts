import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOutClick]'
})
export class OutClickDirective {
  constructor(private el: ElementRef) { }
  @Output() outClick = new EventEmitter();
  @Output() keyOutClick = new EventEmitter();
  @Output() targetOutClick = new EventEmitter();
  @HostListener('click', ['$event']) clickInSide(e: Event) {
    e.stopPropagation();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.keyOutClick.emit();
  }




  @HostListener('document:click', ['$event']) clickOutside(e: Event) {
    this.outClick.emit();
  }

}
