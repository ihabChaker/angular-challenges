import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Person } from './person.model';
@Component({
  selector: 'app-person-list',
  imports: [ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport
      [itemSize]="36"
      class="absolute relative inset-0 h-[300px] overflow-hidden">
      <div
        *cdkVirtualFor="let person of persons(); trackBy: trackPerson"
        class="flex h-9 items-center justify-between border-b">
        <div class="flex flex-row">
          <h3>{{ person.name }}</h3>
          <p>{{ person.email }}</p>
        </div>
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  host: {
    class: 'w-full flex flex-col',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  persons = input<Person[]>();
  trackPerson = (_: number, person: Person) => person.email;
}
