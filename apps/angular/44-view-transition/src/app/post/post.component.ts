import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { fakeTextChapters, posts } from '../data';
import { PostHeaderComponent } from './post-header.component';

@Component({
  selector: 'post',
  imports: [NgOptimizedImage, PostHeaderComponent, RouterLink],
  styles: `
    .post-image {
      view-transition-name: post-image;
    }
    .post-author {
      view-transition-name: post-author;
    }
  `,
  template: `
    <div class="relative w-full max-w-[800px]">
      <button
        routerLink="/"
        class="absolute top-2 left-2 z-20 rounded-md border bg-white p-2">
        Back
      </button>
      <img
        [ngSrc]="post().image"
        alt=""
        width="960"
        height="540"
        class="post-image"
        priority />
      <h2 class="p-7 text-center text-5xl">{{ post().title }}</h2>
      <post-header [date]="post().date" class="post-author mb-20" />
      @for (chapter of fakeTextChapter; track $index) {
        <p class="mt-6 px-3">{{ chapter }}</p>
      }
    </div>
  `,
  host: {
    class: 'flex h-full justify-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PostComponent {
  id = input.required<string>();
  post = computed(() => posts.filter((p) => p.id === this.id())[0]);

  fakeTextChapter = fakeTextChapters;
}
