import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from '/home/white/Desktop/dev/angular/angular-challenges/libs/module-to-standalone/shell/src/lib/main-shell.routes';

bootstrapApplication(AppComponent, {
  providers: [provideToken('main-shell-token'), provideRouter(appRoutes)],
}).catch((err) => console.error(err));
