import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserInfosDirective } from './directives/user-info.directive';
import { UserStore } from './user.store';

@Component({
  selector: 'app-information',
  imports: [UserInfosDirective],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div *role="let _; isSuperAdmin: true">visible only for super admin</div>
    <div *role="let _; hasRoles: 'MANAGER'">visible if manager</div>
    <div *role="let _; hasRoles: ['MANAGER', 'READER']">
      visible if manager and/or reader
    </div>
    <div *role="let _; hasRoles: ['MANAGER', 'WRITER']">
      visible if manager and/or writer
    </div>
    <div *role="let _; hasRoles: ['CLIENT']">visible if client</div>
    <div>visible for everyone</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  private readonly userStore = inject(UserStore);

  user$ = this.userStore.user$;
}
