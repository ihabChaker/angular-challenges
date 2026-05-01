import { Component } from '@angular/core';
import { HeavyCompute } from './heavy-computations.pipe';

@Component({
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      {{ person | heavycompute: $index }}
    }
  `,
  imports: [HeavyCompute],
})
export class AppComponent {
  persons = ['toto', 'jack'];

  heavyComputation(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }
}
