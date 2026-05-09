import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [NgTemplateOutlet],
  template: `
    @if (small()) {
      <ng-container [ngTemplateOutlet]="titletpl" />
      <ng-container [ngTemplateOutlet]="messagetpl" />
    } @else {
      <div class="p-4">
        <div class="text-2xl">
          <ng-container [ngTemplateOutlet]="titletpl" />
        </div>
        <ng-container [ngTemplateOutlet]="messagetpl" />
      </div>
    }
    <ng-template #titletpl>
      <ng-content select="[title]" />
    </ng-template>
    <ng-template #messagetpl>
      <ng-content select="[message]" />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-4 border border-grey rounded-sm flex flex-col w-[200px]',
  },
})
export class CardComponent {
  small = input<boolean>(false);
}
