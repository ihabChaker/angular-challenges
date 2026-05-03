import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AdminPage } from './admin-page';
import { App } from './app';
import { Dashboard } from './dashboard';
import { ProfilePage } from './profile-page';
import { UserPage } from './user-page';
import { UserProfileService } from './user-profile.service';

export const routes: Routes = [
  {
    path: '',
    component: App,
    children: [
      { path: '', pathMatch: 'full', component: Dashboard },
      { path: 'profile', component: ProfilePage },
      { path: 'admin', component: AdminPage },
      { path: 'user', component: UserPage },
      {
        path: 'redirect',
        redirectTo: async (activatedRouteSnapshot) => {
          let userProfile = inject(UserProfileService);
          const value = await firstValueFrom(userProfile.getProfile());

          return value;
        },
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
