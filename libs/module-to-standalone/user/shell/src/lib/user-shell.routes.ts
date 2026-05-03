import { Route } from '@angular/router';

export const userShellRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./user-shell.component').then((m) => m.UserShellComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('@angular-challenges/module-to-standalone/user/home').then(
            (m) => m.UserHomeComponent,
          ),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('@angular-challenges/module-to-standalone/user/contact').then(
            (m) => m.contactRoutes,
          ),
      },
    ],
  },
];
