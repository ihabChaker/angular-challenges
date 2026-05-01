import { createReducer, on } from '@ngrx/store';
import { Todo } from '../model/todo.model';
import * as TodoActions from './todos.actions';

export const initialState: Todo[] = [];

export const todosReducer = createReducer<Todo[]>(
  initialState,

  // When initialization succeeds, completely replace the state with the new array
  on(TodoActions.initTodosSuccess, (state, { todos }) => [...todos]),

  // When deletion succeeds, filter out the deleted item
  on(TodoActions.deleteTodoSuccess, (state, { id }) =>
    state.filter((todo) => todo.id !== id),
  ),

  // When update succeeds, map over the array and replace the updated item
  on(TodoActions.updateTodoSuccess, (state, todo) =>
    state.map((t) => (t.id === todo.id ? todo : t)),
  ),
);
