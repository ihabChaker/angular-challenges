import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { AbstractEntityStore } from './abstract-entity.store';

@Injectable({
  providedIn: 'root',
})
export class StudentStore extends AbstractEntityStore<Student> {}
