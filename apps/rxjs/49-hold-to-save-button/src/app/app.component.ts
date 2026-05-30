import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HoldableDirective } from './holdable.directive';
@Component({
  imports: [HoldableDirective],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          holdable
          [max]="max"
          [duration]="2000"
          (progressVal)="value.set($event)"
          (complete)="onSend()"
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700">
          Hold me
        </button>

        <progress [value]="value()" [max]="max"></progress>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  value = signal<number>(0);
  max = 100;
  onSend() {
    console.log('Save it!');
  }
}
