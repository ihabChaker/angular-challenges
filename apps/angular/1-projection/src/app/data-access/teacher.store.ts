import { Injectable } from '@angular/core';
import { Teacher } from '../model/teacher.model';
import { AbstractEntityStore } from './abstract-entity.store';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore extends AbstractEntityStore<Teacher> {}
