/* eslint-disable @angular-eslint/directive-selector */
import { BTN_STATE_TOKEN, injector } from '@angular-challenges/decoupling/core';
import { Directive } from '@angular/core';
export type ButtonState = 'enabled' | 'disabled';

@Directive({
  selector: 'button[btnDisabled]',
  host: {
    '(click)': 'toggleState()',
  },
})
export class BtnDisabledDirective {
  btnStateSubject$ = injector.get(BTN_STATE_TOKEN);

  toggleState() {
    const value = this.btnStateSubject$.value;
    this.btnStateSubject$.next(value === 'enabled' ? 'disabled' : 'enabled');
  }
}
