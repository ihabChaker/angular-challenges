import { Directive, ElementRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  delay,
  filter,
  fromEvent,
  interval,
  merge,
  Subscription,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
@Directive({
  selector: '[holdable]',
})
export class HoldableDirective {
  el = inject(ElementRef);
  max = input(100);
  duration = input(2000);
  subscription: Subscription = new Subscription();
  tick = this.duration() / this.max();
  progressVal = output<number>();
  complete = output<void>();
  afterCompleteDelay = input<number>(300);
  constructor() {
    const off$ = merge(
      fromEvent(this.el.nativeElement, 'mouseup'),
      fromEvent(this.el.nativeElement, 'mouseleave'),
    ).pipe(tap(() => this.progressVal.emit(0)));

    fromEvent(this.el.nativeElement, 'mousedown')
      .pipe(
        switchMap(() =>
          interval(this.tick).pipe(
            tap((val) => this.progressVal.emit(val)),
            takeWhile((val) => val <= this.max()),
            takeUntil(off$),
          ),
        ),
        filter((val) => val === this.max()),
        tap(() => this.complete.emit()),
        delay(this.afterCompleteDelay()),
        tap(() => this.progressVal.emit(0)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
