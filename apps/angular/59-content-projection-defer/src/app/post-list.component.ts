import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Component({
  selector: 'data-list',
  template: `
    <div>
      @if (postResource.isLoading()) {
        Loading...
      } @else if (postResource.status() === 'error') {
        Error...
      } @else {
        @for (post of postResource.value(); track post.id) {
          <div>{{ post.title }}</div>
        }
      }
    </div>
  `,
})
export class DataList {
  public postResource = httpResource<Post[]>(
    () => 'https://jsonplaceholder.typicode.com/posts',
  );
}
