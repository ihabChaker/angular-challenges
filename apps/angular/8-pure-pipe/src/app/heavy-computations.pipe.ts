import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavycompute',
})
export class HeavyCompute implements PipeTransform {
  transform(value: string, ...args: any[]) {
    return value + ' - ' + args.join(' - ');
  }
}
