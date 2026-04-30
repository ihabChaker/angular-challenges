import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemDirective } from '../../component/list-item.directive';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="img" />
      <section>
        @for (item of list(); track item) {
          <app-list-item
            [id]="item.id"
            (deleteEntityEvent)="deleteItem($event)">
            <ng-container
              *ngTemplateOutlet="
                list_item;
                context: { $implicit: item }
              "></ng-container>
          </app-list-item>
        }
      </section>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2 hover:bg-blue-500 hover:text-white"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  @Input() deleteItem!: (id: number) => void;
  @Output() createEntityEvent = new EventEmitter<void>();

  @ContentChild(ListItemDirective, { read: TemplateRef })
  list_item!: TemplateRef<any>;

  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
  addNewItem() {
    this.createEntityEvent.emit();
  }
}
