import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @Input() formControlName: string = '';
  @Input() placeholder: string = '';
}
