import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavLinkComponent } from '../../ui/nav-link/nav-link.component';
import { SvgLogoComponent } from '../../ui/svg-logo/svg-logo.component';

interface NavLink {
  readonly title: string;
  readonly path: string;
  readonly active: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, NavLinkComponent, SvgLogoComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navLinks: NavLink[] = [
    { title: 'Dashboard', path: '/main/dashboard', active: true },
    { title: 'Users', path: '/main/users', active: false },
    { title: 'Cars', path: '/main/cars', active: false },
    { title: 'Settings', path: '/main/settings', active: false },
  ];
}
