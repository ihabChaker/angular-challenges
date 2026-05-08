/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  styles: `
    p {
      font-size: var(--font-size, 10px);
      color: var(--color, black);
    }
  `,
  template: `
    <p>
      <ng-content />
    </p>
  `,
})
export class TextComponent {}
