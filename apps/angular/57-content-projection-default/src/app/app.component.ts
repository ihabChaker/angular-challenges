import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-title',
  template: `
    <div><ng-content /></div>
  `,
})
class AppTitle {}

@Component({
  selector: 'app-message',
  template: `
    <div><ng-content /></div>
  `,
})
class AppMessage {}

@Component({
  imports: [CardComponent, AppTitle, AppMessage, AppTitle],
  selector: 'app-root',
  template: `
    <app-card>
      <app-title>Titre 1</app-title>
      <app-message>Message1</app-message>
    </app-card>
    <app-card><app-title>Titre 2</app-title></app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
