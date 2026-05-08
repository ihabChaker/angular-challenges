import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn',
})
export class WrapFnPipe implements PipeTransform {
  transform<R, ARG1>(fn: (arg: ARG1) => R, arg: ARG1): R;
  transform<R, ARG1, ARG2>(
    fn: (arg: ARG1, arg2: ARG2) => R,
    arg: ARG1,
    arg2: ARG2,
  ): R;
  transform<R, ARG1, ARG2>(
    fn: (arg: ARG1, arg2: ARG2, ...args: any) => R,
    arg: ARG1,
    arg2: ARG2,
    ...args: any
  ): R;
  transform<R>(fn: (...args: any) => R, ...args: any): R {
    return fn(...args);
  }
}
