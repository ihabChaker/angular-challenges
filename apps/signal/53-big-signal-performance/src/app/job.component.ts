import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { UserStore } from './user.service';
import { numberEquals, strEquals } from './utils';

@Component({
  selector: 'job',
  template: `
    <div cd-flash class="m-4 block border border-gray-500 p-4">
      Job:
      <div>title: {{ title() }}</div>
      <div>salary: {{ salary() }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class JobComponent {
  userService = inject(UserStore);
  title = computed(() => this.userService.user().title, {
    equal: strEquals,
  });
  salary = computed(() => this.userService.user().salary, {
    equal: numberEquals,
  });
}
