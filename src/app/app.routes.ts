import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth/auth.component';
import { DashboardComponent } from './pages/main/dashboard/dashboard.component';
import { MainComponent } from './layouts/main/main.component';
import { authGuard } from './auth.guard';
import { UsersComponent } from './pages/main/users/users.component';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'cars', component: DashboardComponent },
      { path: 'settings', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
