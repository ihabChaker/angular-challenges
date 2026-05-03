/* eslint-disable @angular-eslint/component-selector */
import { Component, input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
@Component({
  selector: 'nav-button',
  template: `
    <a [routerLink]="href()" [fragment]="fragment()">
      <ng-content />
    </a>
  `,
  imports: [RouterLinkWithHref],
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  href = input('');
  fragment = input<string | undefined>(undefined);
}
