import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[person]',
})
export class PersonDirective {
  static ngTemplateContextGuard(
    directive: TemplateRef<any>,
    context: unknown,
  ): context is { $implicit: string; age: number } {
    return true;
  }
}
