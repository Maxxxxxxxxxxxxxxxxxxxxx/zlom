import { Component } from '@angular/core';
import { SearchComponent } from '../../../ui/search/search.component';
import { UsersListComponent } from '../../../components/users-list/users-list.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SearchComponent, UsersListComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {}
