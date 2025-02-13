import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { phoneNumberValidator } from '../../../validators/phone-number.validator';
import { UsersService } from '../../../service/users.service';
import { UserDataDTO } from '../../../dto/user-data.dto';
import { take } from 'rxjs';
import { NgClass } from '@angular/common';
import { TitleStrategy } from '@angular/router';

export interface UserForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
  contactData: FormGroup<ContactDataForm>;
}

export interface ContactDataForm {
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
}

@Component({
  selector: 'app-user-data-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './user-data-form.component.html',
})
export class UserDataFormComponent implements OnInit {
  private usersService: UsersService = inject(UsersService);

  @Input() userId: number | null = null;
  userData: UserDataDTO | null = null;
  isCreateForm: boolean = false;

  userForm: FormGroup<UserForm> = new FormGroup<UserForm>(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(35),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      contactData: new FormGroup({
        email: new FormControl('', [Validators.email]),
        phoneNumber: new FormControl('', [phoneNumberValidator]),
      }),
    },
    { updateOn: 'change' }
  );

  get contactDataForm() {
    return this.userForm.controls.contactData;
  }

  ngOnInit(): void {
    if (!this.userId) this.isCreateForm = true;

    if (this.userId) {
      console.log(this.userId);
      this.usersService
        .getUserData(this.userId)
        .pipe(take(1))
        .subscribe((res) => {
          if (res.body.length > 0) {
            this.userData = res.body[0];
            this.userForm.patchValue(res.body[0]);
          }
        });
    }
  }

  isFormDirty() {
    return this.contactDataForm.dirty;
  }

  submitForm() {
    if (this.isCreateForm) {
    }
  }
}
