import { Component, inject, OnInit, Signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { TodoComponent } from './components/todo.component';
import { Todo } from './model/todo.model';
import { TodoService } from './services/todo.service';
import { deleteTodo, initTodos, updateTodo } from './state/todos.actions';

@Component({
  imports: [MatProgressSpinnerModule, TodoComponent],
  selector: 'app-root',
  template: `
    <!-- @if (!loading()) { -->
    <ul>
      @for (todo of todos(); track todo.id) {
        <app-todo
          [todo]="todo"
          (deleteTodo)="delete(todo)"
          (updateTodo)="update(todo)" />
      }
    </ul>
    <!-- } @else {
      <mat-progress-spinner
        style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"
        mode="indeterminate"></mat-progress-spinner>
    } -->
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private readonly store: Store<{ todos: Todo[] }> = inject(Store);
  todos: Signal<Todo[]> = this.store.selectSignal((state) => state.todos);
  private todoService = inject(TodoService);
  // todos = this.todoService.todos;
  // loading = this.todoService.loading;
  ngOnInit(): void {
    this.store.dispatch(initTodos());
  }

  update(todo: Todo): void {
    this.store.dispatch(updateTodo(todo));

    // this.todoService.update(todo);
  }

  delete(todo: Todo): void {
    this.store.dispatch(deleteTodo(todo));

    // this.todoService.delete(todo);
  }
}
