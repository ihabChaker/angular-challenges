// todos.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, mergeMap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';
import * as TodoActions from './todos.actions';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private todoService = inject(TodoService);

  // 1. Load Todos
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.initTodos),
      exhaustMap(() =>
        this.todoService
          .getTodosObservable()
          .pipe(map((todos) => TodoActions.initTodosSuccess({ todos }))),
      ),
    ),
  );

  // 2. Delete Todo
  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap((todo) =>
        this.todoService.delete(todo).pipe(
          // Once the HTTP delete succeeds, tell the reducer to remove it from state
          map(() => TodoActions.deleteTodoSuccess({ id: todo.id })),
        ),
      ),
    ),
  );

  // 3. Update Todo
  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap((todo) =>
        this.todoService.update(todo).pipe(
          // Once HTTP update succeeds, pass the updated item to the reducer
          map((updatedTodo) => TodoActions.updateTodoSuccess(updatedTodo)),
        ),
      ),
    ),
  );
}
