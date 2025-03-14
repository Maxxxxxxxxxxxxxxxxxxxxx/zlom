import { inject, Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  canActivateChild(): boolean {
    return this.authService.isLoggedIn();
  }
}
