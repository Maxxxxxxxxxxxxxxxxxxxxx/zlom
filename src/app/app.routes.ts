import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth/auth.component';
import { DashboardComponent } from './pages/main/dashboard/dashboard.component';
import { MainComponent } from './layouts/main/main.component';
import { UsersComponent } from './pages/main/users/users.component';
import { SettingsComponent } from './pages/main/settings/settings.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
