import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatListItem } from '@angular/material/list';

@Component({
  selector: 'list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-list-item cd-flash class="text-orange-500">
      <div class="flex justify-between">
        <h3 title="Name">
          {{ name() }}
        </h3>
      </div>
    </mat-list-item>
  `,
  imports: [MatListItem],
})
export class ListItem {
  name = input.required<string>();
}
