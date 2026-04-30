import { Injectable } from '@angular/core';
import { City } from '../model/city.model';
import { AbstractEntityStore } from './abstract-entity.store';

@Injectable({
  providedIn: 'root',
})
export class CityStore extends AbstractEntityStore<City> {}
