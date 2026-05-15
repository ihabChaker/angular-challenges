import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'person-name-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-form-field class="w-4/5" cd-flash>
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)" />
    </mat-form-field>
  `,
  imports: [MatFormField, MatInputModule, FormsModule],
})
export class PersonNameInput {
  insertedName = output<string>();
  label = '';

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.insertedName.emit(this.label);
      this.label = '';
    }
  }
}
