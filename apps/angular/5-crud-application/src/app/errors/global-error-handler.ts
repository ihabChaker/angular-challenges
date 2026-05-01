import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    alert('An error occurred. Please try again.');
    console.error('Global Error Handler:', error);
  }
}
