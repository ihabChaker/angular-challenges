import { Component, EventEmitter, input, Output } from '@angular/core';
import { ReactComponentDirective } from './react-component.directive';
import ReactPost from './ReactPost';

type Post = { title: string; description: string; pictureLink: string };

@Component({
  selector: 'app-post',
  imports: [ReactComponentDirective],
  template: `
    <div
      [reactComponent]="ReactPost"
      [props]="{...post(), selected: isSelected (),handleClick:
      ()=>selectPost.emit()
    }"></div>
  `,
  styles: [''],
})
export class PostComponent {
  post = input<Post | undefined>(undefined);
  isSelected = input<boolean>(false);
  ReactPost = ReactPost;
  @Output() selectPost = new EventEmitter<void>();
}
