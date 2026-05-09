import { InjectionToken } from '@angular/core';
import { DEFAULT_TIMER } from './data';

export const TIMER_TOKEN = new InjectionToken('TIMER', {
  factory: () => DEFAULT_TIMER,
});
