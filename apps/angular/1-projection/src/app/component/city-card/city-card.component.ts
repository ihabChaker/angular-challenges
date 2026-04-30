import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemDirective } from '../list-item.directive';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      customClass="bg-light-blue"
      (createEntityEvent)="addNewCity()"
      [deleteItem]="deleteCity">
      <img
        ngSrc="assets/img/city.png"
        width="200"
        height="200"
        alt=""
        class="logo" />
      <ng-template appListItem let-city>
        {{ city.name + ' - ' + city.country }}
      </ng-template>
    </app-card>
  `,
  imports: [NgOptimizedImage, CardComponent, ListItemDirective],
  styles: [
    `
      ::ng-deep .bg-light-blue {
        background-color: rgba(0, 0, 255, 0.1);
      }
    `,
  ],
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.entities;
  addNewCity = () => {
    this.store.addOne(randomCity());
  };
  deleteCity = (id: number) => {
    this.store.deleteOne(id);
  };
  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }
}
