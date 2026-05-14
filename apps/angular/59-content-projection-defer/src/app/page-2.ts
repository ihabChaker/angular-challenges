import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ExpandableCard } from './expandable-card';
import { DataList } from './post-list.component';

@Component({
  selector: 'app-page-2',
  template: `
    page2
    <app-expandable-card (expanded)="expanded.set($event)">
      <div title>Load Post</div>
      @defer (when expanded()) {
        <data-list></data-list>
      }
    </app-expandable-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExpandableCard, DataList],
})
export class Page2 {
  expanded = signal<boolean>(false);
}
