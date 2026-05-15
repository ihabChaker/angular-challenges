import {
  Component,
  DestroyRef,
  inject,
  NgZone,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div>Top</div>
    <div>Middle</div>
    <div>Bottom</div>
    @if (displayButton()) {
      <button (click)="goToTop()">Top</button>
    }
  `,
  styles: [
    `
      :host {
        height: 1500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        button {
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          z-index: 1;
          padding: 1rem;
        }
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  title = 'scroll-cd';

  public displayButton = signal(false);
  ngZone = inject(NgZone);
  destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.displayButton.set(window.scrollY > 50);
        });
    });
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
