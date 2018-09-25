import { Directive, Renderer, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFade]'
})
export class FadeDirective {

  constructor(private el: ElementRef, private renderer: Renderer) {
    el.nativeElement.style.opacity = '.6'
    el.nativeElement.style.transition = '.4s opacity'
  }

  @HostListener('mouseover') mouseover() {
    this.renderer.setElementStyle(this.el.nativeElement, 'opacity', '1');
  }
  
  @HostListener('mouseout') mouseout() {
    this.renderer.setElementStyle(this.el.nativeElement, 'opacity', '.6');
  }


}
