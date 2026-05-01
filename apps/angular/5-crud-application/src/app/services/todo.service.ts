import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.model';
export const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  public todos = signal<Todo[]>([]);
  public loading = signal(false);
  initTodos() {
    // if (Math.random() < 0.1) {
    //   throw new Error('Simulated error');
    // }
    this.loading.set(true);
    this.getTodosObservable().subscribe((todos) => {
      this.todos.set(todos);
      this.loading.set(false);
    });
  }

  getTodosObservable(): Observable<Todo[]> {
    return this.http.get<Todo[]>(BASE_URL);
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: randText(),
        userId: todo.userId,
      }),
      {
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      },
    );
  }

  delete(todo: Todo): Observable<unknown> {
    return this.http.delete(`${BASE_URL}/${todo.id}`);
  }
}
