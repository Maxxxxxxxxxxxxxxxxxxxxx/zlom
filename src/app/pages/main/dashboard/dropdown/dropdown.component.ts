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
import { MatIconModule } from '@angular/material/icon';

export type SortDirection = 'sortAsc' | 'sortDesc';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  private toast: HotToastService = inject(HotToastService);
  private carEntryService: CarEntryService = inject(CarEntryService);

  @Input() options: string[] = [];
  sortDirection: SortDirection = 'sortAsc';
  active: string = '';

  handleClickOption() {
    if (this.active.length === 0) {
    this.toast.info('No sorting selected');
      return;
    }

    this.toast.info('Sorting set');
    this.carEntryService.setSortFilters({
      [this.sortDirection]: this.active,
    });
    this.carEntryService.refreshCurrentPage();
  }

  switchSortDirection() {
    if (this.sortDirection === 'sortAsc') this.sortDirection = 'sortDesc';
    else this.sortDirection = 'sortAsc';

    if (this.active) {
      this.carEntryService.setSortFilters({
        [this.sortDirection]: this.active,
      });
      this.carEntryService.refreshCurrentPage();
    }
  }
}
