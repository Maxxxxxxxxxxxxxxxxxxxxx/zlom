import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CenteredWrapperComponent } from '../../ui/centered/centered-wrapper.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import AuthRequest from '../../dto/auth-request.dto';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';
import { catchError, debounceTime, delay, of, switchMap } from 'rxjs';

interface AuthData {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
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
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  public constructor(
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router
  ) {}

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

    this.authService
      .login(authRequest)
      .pipe(debounceTime(600))
      .subscribe({
        next: (res) => {
          this.toast.success('Logged in!');
          console.log(res.status);
          this.router.navigate(['main/dashboard']);
        },
        error: (res) => {
          this.toast.error(res.error.message);
          console.log(res.status);
        },
      });
  }

  test() {
    console.log(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value
    );
  }
}
