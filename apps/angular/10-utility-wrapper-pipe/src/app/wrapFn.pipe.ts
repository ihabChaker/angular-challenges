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
    return (PersonUtils[fnName] as Function)(...args);
  }
}
