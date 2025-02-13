import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { CarEntryService } from '../../../../service/car-entry.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  private toast: HotToastService = inject(HotToastService);
  private carEntryService: CarEntryService = inject(CarEntryService);

  @Input() options: string[] = [];
  active: string = '';

  handleClickOption() {
    this.toast.info('Sorting set');
    this.carEntryService.setSortFilters({
      sortAsc: this.active,
    });
    this.carEntryService.refreshCurrentPage();
  }
}
