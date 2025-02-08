import { Component } from '@angular/core';
import { SearchComponent } from '../../ui/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [SearchComponent, ReactiveFormsModule],
  templateUrl: './car-form.component.html',
})
export class CarFormComponent {
  
}
