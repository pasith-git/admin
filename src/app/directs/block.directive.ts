import { Directive, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appBlock]'
})
export class BlockDirective {

  constructor(public viewContainerRef: ViewContainerRef) {

  }

}
