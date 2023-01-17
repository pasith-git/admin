import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[aInput]'
})
export class AniDirective {
  prevSibling: ElementRef;
  constructor(private el: ElementRef, private ren: Renderer2) {
    this.prevSibling = this.el.nativeElement.previousElementSibling;
  }
  @HostListener('focus') onFocus() {
    this.ren.addClass(this.prevSibling, 'onfocus')
    this.ren.removeClass(this.prevSibling, 'onblur')
  }
  @HostListener('blur') onBlur() {
    if (this.el.nativeElement.value !== '') {
      this.ren.addClass(this.prevSibling, 'onfocus')
      this.ren.removeClass(this.prevSibling, 'onblur')
    } else {
      this.ren.addClass(this.prevSibling, 'onblur')
      this.ren.removeClass(this.prevSibling, 'onfocus')
    }
  }
  public directOnblur() {
    const currentLabel = this.el.nativeElement.querySelectorAll('.pLabel'); 
    for(let eLabel of currentLabel){
      this.ren.removeClass(eLabel, 'onfocus');
      this.ren.removeClass(eLabel, 'onblur');
    }
  }
}
