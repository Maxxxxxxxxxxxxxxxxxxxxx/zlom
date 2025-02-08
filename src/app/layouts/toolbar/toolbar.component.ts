import { Component } from '@angular/core';
import { SearchComponent } from '../../ui/search/search.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [SearchComponent, FormsModule],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {}
