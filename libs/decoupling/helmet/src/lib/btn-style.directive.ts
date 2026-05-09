/* eslint-disable @angular-eslint/directive-selector */
import { BTN_STATE_TOKEN, injector } from '@angular-challenges/decoupling/core';
import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';
@Directive({
  selector: 'button[hlm]',
  host: {
    class:
      'border border-black p-4 rounded-md bg-white data-[state=disabled]:bg-gray-400 data-[state=disabled]:text-white',
  },
})
export class BtnHelmetDirective {
  btnStateSubject$ = injector.get(BTN_STATE_TOKEN);
  private renderer = inject(Renderer2);
  private element = inject(ElementRef);
  ngOnInit() {
    this.btnStateSubject$.subscribe((state) => {
      this.renderer.setAttribute(
        this.element.nativeElement,
        'data-state',
        state,
      );
    });
  }
}
