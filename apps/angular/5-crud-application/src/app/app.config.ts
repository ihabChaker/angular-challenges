import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { GlobalErrorHandler } from './errors/global-error-handler';
import { TodoEffects } from './state/todo.effects';
import { todosReducer } from './state/todos.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideStore({ todos: todosReducer }),
    provideEffects([TodoEffects]),
  ],
};
