import { signal } from '@angular/core';

export abstract class AbstractEntityStore<T extends { id: number }> {
  public entities = signal<T[]>([]);

  addAll(entities: T[]) {
    this.entities.set(entities);
  }

  addOne(entitie: T) {
    this.entities.set([...this.entities(), entitie]);
  }

  deleteOne(id: number) {
    this.entities.set(this.entities().filter((e) => e.id !== id));
  }
}
