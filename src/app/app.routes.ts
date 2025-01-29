import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth/auth.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { HOME_ROUTES } from './home/home.routes';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    pathMatch: 'full',
  },
];
