import { Component } from '@angular/core';
import { SearchComponent } from '../../../ui/search/search.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  
}
