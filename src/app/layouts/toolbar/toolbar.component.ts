import { Component, inject } from '@angular/core';
import { SearchComponent } from '../../ui/search/search.component';
import { FormsModule } from '@angular/forms';
import { NavIconComponent } from '../../ui/nav-icon/nav-icon.component';
import { NavLink } from '../navbar/navbar.component';
import { AuthService } from '../../service/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';

interface NavIcon {
  readonly matIcon: string;
  readonly path: string;
  readonly active: boolean;
}

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [FormsModule, NavIconComponent],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  private authService: AuthService = inject(AuthService);
  private toast: HotToastService = inject(HotToastService);
  private router: Router = inject(Router);

  user = localStorage.getItem('user');

  navLinks: NavIcon[] = [
    { matIcon: 'home', path: '/main/dashboard', active: true },
    { matIcon: 'person', path: '/main/users', active: false },
    { matIcon: 'settings', path: '/main/settings', active: false },
  ];

  logout() {
    this.authService.logout();
    this.toast.success('Logged out!');
    this.router.navigate(['login']);
  }
}
