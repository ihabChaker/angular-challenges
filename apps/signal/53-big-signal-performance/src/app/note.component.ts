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
  selector: 'note',
  template: `
    <div cd-flash class="m-4 block border border-gray-500 p-4">
      Note: {{ note() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class NoteComponent {
  userService = inject(UserStore);
  note = computed(() => this.userService.user().note, {
    equal: strEquals,
  });
}
