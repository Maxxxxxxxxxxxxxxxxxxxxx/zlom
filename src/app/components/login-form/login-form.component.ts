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
  email: FormControl<string | null>;
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
      email: new FormControl('', Validators.email),
    },
    { updateOn: 'change' }
  );

  get email() {
    return this.loginForm.controls.email;
  }

  get username() {
    return this.loginForm.controls.username;
  }

  test() {
    console.log(
      this.loginForm.controls.username.value,
      this.loginForm.controls.email.value
    );
  }
}
