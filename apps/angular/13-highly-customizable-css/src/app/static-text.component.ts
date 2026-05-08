/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  imports: [TextComponent],
  styles: `
    :host-context(.warning) {
      text {
        --font-size: 25px;
        --color: orange;
      }
    }
    :host-context(.error) {
      text {
        --font-size: 30px;
        --color: red;
      }
    }
  `,
  template: `
    <text>This is a static text</text>
  `,
})
export class TextStaticComponent {}
