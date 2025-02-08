import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavLinkComponent } from '../../ui/nav-link/nav-link.component';
import { SvgLogoComponent } from '../../ui/svg-logo/svg-logo.component';
import { MatIconModule } from '@angular/material/icon';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';

interface NavLink {
  readonly title: string;
  readonly path: string;
  readonly active: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    NavLinkComponent,
    SvgLogoComponent,
    MatIconModule,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private toast: HotToastService = inject(HotToastService);
  private router: Router = inject(Router);

  navLinks: NavLink[] = [
    { title: 'Dashboard', path: '/main/dashboard', active: true },
    { title: 'User management', path: '/main/users', active: false },
    { title: 'Cars', path: '/main/cars', active: false },
    { title: 'Settings', path: '/main/settings', active: false },
  ];

  logout() {
    this.toast.success('Logged out!');
    this.router.navigate(['login']);
  }
}
