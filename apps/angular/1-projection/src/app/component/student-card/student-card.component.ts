import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemDirective } from '../list-item.directive';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      customClass="bg-light-green"
      (createEntityEvent)="addNewStudent()"
      [deleteItem]="deleteStudent">
      >
      <img
        ngSrc="assets/img/student.webp"
        width="200"
        height="200"
        alt=""
        class="logo" />
      <ng-template appListItem let-student>
        {{ student.firstName + ' ' + student.lastName }}
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.entities;
  addNewStudent = () => {
    this.store.addOne(randStudent());
  };
  deleteStudent = (id: number) => {
    this.store.deleteOne(id);
  };
  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
}
