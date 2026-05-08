import {
  Directive,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[role]',
})
export class UserInfosDirective {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  private readonly userStore = inject(UserStore);
  roleHasRoles = input<Role | Role[]>([]);
  roleIsSuperAdmin = input<boolean>(false);
  user$ = this.userStore.user$;
  ngOnInit() {
    this.user$.subscribe((user) => {
      this.viewContainerRef.clear();

      if (this.roleIsSuperAdmin()) {
        if (!user?.isAdmin) {
          return;
        }
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }

      if (this.roleHasRoles().length === 0) {
        return;
      }

      // 1. Handle case where input is a single string
      if (typeof this.roleHasRoles() === 'string') {
        if (!user?.roles.includes(this.roleHasRoles().toString() as Role)) {
          return;
        }
      }
      // 2. Handle case where input is an array of strings
      else if (
        Array.isArray(this.roleHasRoles()) &&
        this.roleHasRoles().length > 0
      ) {
        // Check if the user has EVERY role required
        const hasAllRoles = [this.roleHasRoles()]
          .flat()
          .some((role) => user?.roles.includes(role));
        if (!hasAllRoles) {
          return;
        }
      }
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    });
  }
}
