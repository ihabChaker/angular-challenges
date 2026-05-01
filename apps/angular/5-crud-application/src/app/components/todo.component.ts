import { Component, EventEmitter, input, Output } from '@angular/core';
import { Todo } from '../model/todo.model';
@Component({
  selector: 'app-todo',
  template: `
    <li>
      {{ todo().title }}
      <button (click)="updateTodo.emit()">Update</button>
      <button (click)="deleteTodo.emit()">Delete</button>
    </li>
  `,
})
export class TodoComponent {
  todo = input.required<Todo>();
  @Output() deleteTodo = new EventEmitter<void>();
  @Output() updateTodo = new EventEmitter<void>();
}
