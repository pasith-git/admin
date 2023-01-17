import { Directive, ElementRef, Host, HostListener, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[pNavButton]'
})
export class NavEventDirective implements OnInit {

  constructor(private el: ElementRef) { }
  ngOnInit(): void {
  }
}
