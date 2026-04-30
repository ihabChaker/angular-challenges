import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemDirective } from '../list-item.directive';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      customClass="bg-light-red"
      (createEntityEvent)="addNewTeacher()"
      [deleteItem]="deleteTeacher">
      <img
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        alt=""
        class="logo"
        priority />
      <ng-template appListItem let-teacher>
        {{ teacher.firstName + ' ' + teacher.lastName }}
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemDirective],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.entities;
  addNewTeacher = () => {
    this.store.addOne(randTeacher());
  };
  deleteTeacher = (id: number) => {
    this.store.deleteOne(id);
  };
  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
}
