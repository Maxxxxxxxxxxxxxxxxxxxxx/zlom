import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { take } from 'rxjs';
import { UserDataDTO } from '../../dto/user-data.dto';
import { DialogService } from '../../service/dialog.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  private usersService: UsersService = inject(UsersService);
  private dialogService: DialogService = inject(DialogService);

  users: UserDataDTO[] = [];

  ngOnInit(): void {
    this.usersService.refreshUsers();
    this.usersService.users.subscribe((users) => {
      if (users) this.users = users;
    });
  }

  openUserViewModal(user: UserDataDTO) {
    this.dialogService.open({
      title: user.username,
      object: user,
      type: 'user',
    });
  }

  openUserAddModal() {
    this.dialogService.open({
      title: 'Create new user',
      type: 'user',
    });
  }
}
