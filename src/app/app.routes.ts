import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth/auth.component';
import { DashboardComponent } from './pages/main/dashboard/dashboard.component';
import { MainComponent } from './layouts/main/main.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { HOME_ROUTES } from './home/home.routes';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      { path: 'users', component: DashboardComponent },
      { path: 'cars', component: DashboardComponent },
      { path: 'settings', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
