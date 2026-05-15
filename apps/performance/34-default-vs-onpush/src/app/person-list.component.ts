import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ListItem } from './list-item.component';
import { PersonNameInput } from './person-name-input.component';

@Component({
  selector: 'app-person-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    CDFlashingDirective,
    TitleCasePipe,
    PersonNameInput,
    ListItem,
  ],
  template: `
    <h1 class="text-center font-semibold" title="Title">
      {{ title() | titlecase }}
    </h1>

    <person-name-input (insertedName)="handleNameInput($event)" />

    <mat-list class="flex w-full">
      @if (names().length === 0) {
        <div class="empty-list-label">Empty list</div>
      }
      @for (name of names(); track name) {
        <list-item cd-flash [name]="name" />
      }
      @if (names().length !== 0) {
        <mat-divider></mat-divider>
      }
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonListComponent {
  names = input<string[]>([]);
  title = input('');

  handleNameInput(name: string) {
    this.names()?.unshift(name);
  }
}
