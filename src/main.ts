import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthGuard } from './app/auth/auth.guard';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: 'API_URL', useValue: environment.API_URL },
    provideRouter([
      { path: '', canActivate: [AuthGuard], loadComponent: () => import('./app/views/home/home.component').then(c => c.HomeComponent), title: 'MSM' },
      { path: 'auth', loadComponent: () => import('./app/views/auth/auth.component').then(c => c.AuthComponent), title: 'التسجيل' }
    ]),
    provideAnimations()
  ]
}).catch(err => console.error(err));
