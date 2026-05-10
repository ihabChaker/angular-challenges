import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtilNames, PersonUtils } from './person.utils';

@Pipe({
  name: 'wrapFn',
})
export class WrapFnPipe implements PipeTransform {
  transform<FNName extends PersonUtilNames>(
    fnName: FNName,
    ...args: Parameters<(typeof PersonUtils)[FNName]>
  ): ReturnType<(typeof PersonUtils)[FNName]> {
    const fn = PersonUtils[fnName] as (
      ...args: Parameters<(typeof PersonUtils)[FNName]>
    ) => any;

    return fn(...args);
  }
}
