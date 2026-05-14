import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { posts } from '../data';
import { ThumbnailComponent } from './thumbnail.component';

@Component({
  selector: 'blog',
  imports: [ThumbnailComponent],
  styles: `
    .active-blog .post-image {
      view-transition-name: post-image;
    }
    .active-blog .post-author {
      view-transition-name: post-author;
    }
  `,
  template: `
    <div
      class="fixed top-0 right-0 left-0 z-50 flex h-20 items-center justify-center border-b-2 bg-white text-4xl shadow-md">
      Blog List
    </div>
    <div class="my-20 flex h-screen flex-col items-center gap-10 border p-10">
      @for (post of posts; track post.id) {
        <blog-thumbnail
          [post]="post"
          [class.active-blog]="activePostId() === post.id"
          (click)="setPostId(post.id)"
          [activePostId]="activePostId()" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BlogComponent {
  posts = posts;
  activePostId = signal<string>('');
  setPostId(postId: string) {
    this.activePostId.set(postId);
  }
}
