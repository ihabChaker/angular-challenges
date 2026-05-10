import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtilNames, PersonUtils } from './person.utils';

@Pipe({
  name: 'wrapFn',
})
export class WrapFnPipe implements PipeTransform {
  transform(fnName: PersonUtilNames, ...args: any[]): any {
    const fn = PersonUtils[fnName] as (...args: any[]) => any;

    return fn(...args);
  }
}
