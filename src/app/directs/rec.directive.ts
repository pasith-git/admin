import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[recInput]'
})
export class RecDirective {
  @Output() status = new EventEmitter();
  constructor() { }
  @HostListener('click') onBlur(){
    this.status.emit();
  }
}

