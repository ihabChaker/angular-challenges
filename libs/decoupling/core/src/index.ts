import { InjectionToken, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export const BTN_STATE_TOKEN = new InjectionToken<BehaviorSubject<string>>(
  'A boolean value that tracks the enabled status of the helm btn componenet',
  {
    providedIn: 'root',
    factory: () => new BehaviorSubject('enabled'),
  },
);

const providers = [
  {
    provide: BTN_STATE_TOKEN,
    useValue: new BehaviorSubject('enabled'),
  },
];

export const injector = Injector.create({
  providers: providers,
});
