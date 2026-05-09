import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { TIMER_TOKEN } from './timer.token';
@Component({
  selector: 'timer',
  template: `
    Timer running {{ timer() }}
  `,
})
export class TimerComponent {
  timerValue = inject(TIMER_TOKEN);
  timer = toSignal(interval(this.timerValue));
}
