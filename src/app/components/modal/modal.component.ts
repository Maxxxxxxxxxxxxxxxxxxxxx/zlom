import { DialogConfig, DialogService } from '../../service/dialog.service';
import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CarViewFormComponent } from './car-view-form/car-view-form.component';
import { CarEntryDTO } from '../../dto/car-entry.dto';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { UserDataFormComponent } from './user-data-form/user-data-form.component';

const carEntry = {
  id: 1,
  title: 'Classic Polish Fiat 126p',
  location: 'Warsaw, Poland',
  price: 3500,
  entryDate: '2024-01-15',
  isDamaged: false,
  make: 'Fiat',
  model: '126p',
  engine: '650cc 2-cylinder',
  carWeight: '600kg',
  carType: 'Hatchback',
};

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatIconModule,
    CarViewFormComponent,
    ConfirmModalComponent,
    FilterFormComponent,
    UserDataFormComponent,
  ],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  private dialogService: DialogService = inject(DialogService);

  config: DialogConfig | null = null;
  isVisible: boolean = false;

  ngOnInit(): void {
    this.dialogService.config.subscribe((config) => {
      return this.openModal(config);
    });
  }

  private openModal(config: DialogConfig | null) {
    if (config === null) {
      this.isVisible = false;
      return;
    }

    console.log(config);

    this.config = {
      title: config.title ?? '',
      object: config.object ?? {},
      type: config.type,
    };

    this.isVisible = true;
  }

  public closeModal(): void {
    this.dialogService.resetConfig();
    this.isVisible = false;
  }
}
