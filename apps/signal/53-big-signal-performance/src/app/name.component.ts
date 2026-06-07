import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { UserStore } from './user.service';
import { strEquals } from './utils';

@Component({
  selector: 'name',
  template: `
    <div cd-flash class="m-4 block border border-gray-500 p-4">
      Name: {{ name() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class NameComponent {
  userService = inject(UserStore);
  name = computed(() => this.userService.user().name, {
    equal: strEquals,
  });
}
