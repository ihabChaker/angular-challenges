import { inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

export abstract class AbstractActionComponent {
  readonly #dialog = inject(MatDialog);
  public isOpen = signal<boolean>(false);
  constructor() {
    this.#dialog.afterOpened.subscribe(() => {
      this.isOpen.set(true);
    });
    this.#dialog.afterAllClosed.subscribe(() => {
      this.isOpen.set(false);
    });
  }
  closeDialog() {
    this.#dialog.closeAll();
  }
  openDialog(): void {
    this.#dialog.open(DialogComponent, {
      width: '250px',
      closeOnNavigation: false,
    });
  }
}
