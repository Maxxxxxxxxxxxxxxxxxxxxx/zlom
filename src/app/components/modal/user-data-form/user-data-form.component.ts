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
import { HotToastService } from '@ngxpert/hot-toast';
import { UserDataRequestDTO } from '../../../dto/bodies/user-data-request.dto';
import { DialogService } from '../../../service/dialog.service';

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
  private toast: HotToastService = inject(HotToastService);
  private dialogService: DialogService = inject(DialogService);

  @Input() userId: number | null = null;
  userData: UserDataDTO | null = null;
  isCreateForm: boolean = false;

  isAdmin = localStorage.getItem('role') === 'ADMIN';

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
    return this.userForm.dirty;
  }

  submitForm() {
    if (!this.isAdmin) {
      this.toast.error('Unauthorized');
      return;
    }

    const { username, password } = this.userForm.controls;
    const { email, phoneNumber } = this.contactDataForm.controls;

    if (this.isCreateForm) {
      if (this.contactDataForm.invalid) {
        email.value != '' && email.invalid && this.toast.error('Invalid email');
        phoneNumber.value != '' &&
          phoneNumber.invalid &&
          this.toast.error('Invalid phone number');
        return;
      } else if (this.userForm.invalid) {
        username.invalid && this.toast.error('Username is invalid');
        password.invalid && this.toast.error('Password is invalid');
        return;
      }

      this.usersService
        .createUser({
          ...(this.userForm.value as UserDataRequestDTO),
          id: this.userId,
        })
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.toast.success('Created user');
            this.usersService.refreshUsers();
            this.dialogService.close();
          },
          error: () => this.toast.error('An error occured'),
        });
    } else {
      if (this.userForm.controls.username.valid) {
        this.usersService
          .updateUser({
            ...(this.userForm.value as UserDataRequestDTO),
            id: this.userId,
          })
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.toast.success('Updated user');
              this.usersService.refreshUsers();
              this.dialogService.close();
            },
            error: () => this.toast.error('An error occured'),
          });
      }
    }
  }
}
