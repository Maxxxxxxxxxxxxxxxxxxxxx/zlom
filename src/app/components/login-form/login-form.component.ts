import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CenteredWrapperComponent } from '../../ui/centered/centered-wrapper.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import AuthRequest from '../../dto/bodies/auth-request.dto';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

interface AuthData {
  readonly username: FormControl<string | null>;
  readonly password: FormControl<string | null>;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    CenteredWrapperComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  private authService: AuthService = inject(AuthService);
  private toast: HotToastService = inject(HotToastService);
  private router: Router = inject(Router);

  loginForm: FormGroup<AuthData> = new FormGroup(
    {
      username: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
    },
    { updateOn: 'change' }
  );

  get username() {
    return this.loginForm.controls.username.value;
  }

  get password() {
    return this.loginForm.controls.password.value;
  }

  login() {
    const authRequest = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    } as AuthRequest;

    this.authService.login(authRequest).subscribe({
      next: (res) => {
        this.authService.setUser(res.body.token, res.body.username);
        this.toast.success('Logged in!');
        this.router.navigate(['main']);
      },
      error: (res) => {
        this.toast.error(res.error.message ?? 'An error has occurred!');
      },
    });
  }
}
