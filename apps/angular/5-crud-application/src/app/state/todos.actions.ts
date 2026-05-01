import { createAction, props } from '@ngrx/store';
import { Todo } from '../model/todo.model';

// Init
export const initTodos = createAction('[App component] init Todos');
export const initTodosSuccess = createAction(
  '[App component] init Todos Success',
  props<{ todos: Todo[] }>(),
);

// Delete
export const deleteTodo = createAction(
  '[App component] delete Todo',
  props<Todo>(),
);
export const deleteTodoSuccess = createAction(
  '[App component] delete Todo Success',
  props<{ id: number }>(), // We only need the ID to remove it from the state
);

// Update
export const updateTodo = createAction(
  '[App component] update Todo',
  props<Todo>(),
);
export const updateTodoSuccess = createAction(
  '[App component] update Todo Success',
  props<Todo>(),
);
