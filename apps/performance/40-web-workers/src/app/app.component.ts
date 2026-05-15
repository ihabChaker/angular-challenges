import { Component, OnDestroy, signal } from '@angular/core';
import { HeavyCalculationService } from './heavy-calculation.service';
import { UnknownPersonComponent } from './unknown-person/unknown-person.component';

@Component({
  imports: [UnknownPersonComponent],
  providers: [HeavyCalculationService],
  selector: 'app-root',
  template: `
    <unknown-person [step]="loadingPercentage()" class="relative grow" />
    <button
      class="my-3 w-fit self-center rounded-md border border-white px-4 py-2 text-2xl text-white"
      (click)="discover()">
      Discover
    </button>
    <div class="p-1 text-white">Progress: {{ loadingPercentage() }}%</div>
  `,
  host: {
    class: `flex flex-col h-screen w-screen bg-[#1f75c0]`,
  },
})
export class AppComponent implements OnDestroy {
  readonly loadingPercentage = signal<number>(0);

  private worker: Worker;

  constructor() {
    // if (typeof Worker === 'undefined') {
    //   alert('Web workers are not supported in your browser');
    //   return;
    // }
    this.worker = new Worker(new URL('./app.worker', import.meta.url));
  }
  ngOnDestroy(): void {
    this.worker.terminate();
  }
  discover() {
    this.worker.onmessage = ({ data }) => {
      this.loadingPercentage.set(data.percentage);
    };
    this.worker.postMessage('Start');
  }
}
