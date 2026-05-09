import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {
  closeOpenDialogueStrategy,
  keepOpenDialogueStrategy,
} from './routing-strategy/back-button-routing-strategies';
import { SensitiveActionComponent } from './sensitive-action/sensitive-action.component';
import { SimpleActionComponent } from './simple-action/simple-action.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'simple-action',
    component: SimpleActionComponent,
    canDeactivate: [closeOpenDialogueStrategy.handleCanDeactivate],
  },
  {
    path: 'sensitive-action',
    component: SensitiveActionComponent,
    canDeactivate: [keepOpenDialogueStrategy.handleCanDeactivate],
  },
];
