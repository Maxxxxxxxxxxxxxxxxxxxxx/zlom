import { Component } from '@angular/core';
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
    return this.loginForm.controls.username;
  }

  test() {
    console.log(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value
    );
  }
}
