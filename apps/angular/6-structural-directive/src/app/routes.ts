import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { map } from 'rxjs';
import { Role } from './user.model';
import { UserStore } from './user.store';

const canMatchAdmin = (isAdmin: boolean) => {
  const userStore = inject(UserStore);

  return userStore.user$.pipe(
    map((user) => {
      return user?.isAdmin === isAdmin;
    }),
  );
};
export const canMatchRole = (role: Role): CanMatchFn => {
  return () => {
    const userStore = inject(UserStore); // This works because Angular calls the guard in context

    return userStore.user$.pipe(map((user) => !!user?.roles.includes(role)));
  };
};

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [canMatchRole('MANAGER')],
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [canMatchRole('CLIENT')],
    loadComponent: () =>
      import('./dashboard/client.component').then(
        (m) => m.ClientDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [canMatchRole('READER')],
    loadComponent: () =>
      import('./dashboard/reader.component').then(
        (m) => m.ReaderDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [canMatchRole('WRITER')],
    loadComponent: () =>
      import('./dashboard/writer.component').then(
        (m) => m.WriterDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => canMatchAdmin(true)],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/everyone.component').then(
        (m) => m.EveryoneDashboardComponent,
      ),
  },
];
