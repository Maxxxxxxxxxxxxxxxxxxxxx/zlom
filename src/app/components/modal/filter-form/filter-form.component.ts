import { Component, inject } from '@angular/core';
import { DialogConfig, DialogService } from '../../../service/dialog.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { CarEntryService, Filters } from '../../../service/car-entry.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export interface FilterFormData {
  readonly maxPrice: FormControl<number | null | undefined>;
  readonly minPrice: FormControl<number | null | undefined>;
  readonly isDamaged: FormControl<boolean | null | undefined>;
  readonly make: FormArray<FormControl<string | null | undefined>>;
  readonly model: FormArray<FormControl<string | null | undefined>>;
}

export interface TextInputFormData {
  readonly value: FormControl<string | null | undefined>;
}

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './filter-form.component.html',
})
export class FilterFormComponent {
  carEntryService: CarEntryService = inject(CarEntryService);
  dialogService: DialogService = inject(DialogService);
  toast: HotToastService = inject(HotToastService);

  fields: string[] = ['maxPrice', 'minPrice', 'make', 'model', 'isDamaged'];
  maxFormArrayLength: number = 5;

  filtersForm: FormGroup<FilterFormData> = new FormGroup<FilterFormData>(
    {
      maxPrice: new FormControl(undefined, {}),
      minPrice: new FormControl(undefined, {}),
      isDamaged: new FormControl(false, {}),
      make: new FormArray<FormControl<string | null | undefined>>([]),
      model: new FormArray<FormControl<string | null | undefined>>([]),
    },
    { updateOn: 'change' }
  );

  ngOnInit(): void {
    this.dialogService.config.subscribe({
      next: (config: DialogConfig) => {},
    });

    this.carEntryService.filters.subscribe((filters) => {
      if (filters) {
        if (filters.make) {
          filters.make.forEach((makeString, index) => {
            this.filtersForm.controls.make.setControl(
              index,
              new FormControl(makeString)
            );
          });
        }

        if (filters.model) {
          filters.model.forEach((modelString, index) => {
            this.filtersForm.controls.model.setControl(
              index,
              new FormControl(modelString)
            );
          });
        }

        this.filtersForm.patchValue(filters);
      }
    });
  }

  clear() {
    if (this.filtersForm.invalid) {
      this.toast.error('One of the fields is invalid');
      return;
    }

    try {
      this.dialogService.close();
      this.carEntryService.setFilters({});
      this.carEntryService.refreshCurrentPage();
      this.toast.info('Filters cleared');
    } catch (err) {
      this.toast.error('Error');
      this.dialogService.close();
    }
  }

  confirm() {
    try {
      const filters = this.filtersForm.value as Filters;
      this.dialogService.close();
      this.carEntryService.setFilters({
        ...filters,
        make: filters.make?.filter((m) => m.length > 0),
        model: filters.model?.filter((m) => m.length > 0),
      });
      this.carEntryService.refreshCurrentPage();
      this.toast.info('Set filters');
    } catch (err) {
      this.toast.error('Error');
      this.dialogService.close();
    }
  }

  get makes() {
    return this.filtersForm.controls.make as FormArray<
      FormControl<string | null | undefined>
    >;
  }

  get models() {
    return this.filtersForm.controls.model as FormArray<
      FormControl<string | null | undefined>
    >;
  }

  addMake(make?: string): void {
    if (this.filtersForm.controls.make.length > this.maxFormArrayLength) {
      this.toast.info('Maximum value reached');
      return;
    }
    this.filtersForm.controls.make.push(
      new FormControl<string | null | undefined>(make ?? '')
    );
  }

  addModel(model?: string): void {
    if (this.filtersForm.controls.model.length > this.maxFormArrayLength) {
      this.toast.info('Maximum value reached');
      return;
    }
    this.filtersForm.controls.model.push(
      new FormControl<string | null | undefined>(model ?? '')
    );
  }

  removeMake(): void {
    const length = this.filtersForm.controls.make.length;
    if (length === 0) {
      this.toast.info('Nothing to remove');
      return;
    }

    this.filtersForm.controls.make.removeAt(length - 1);
  }

  removeModel(): void {
    const length = this.filtersForm.controls.model.length;
    if (length === 0) {
      this.toast.info('Nothing to remove');
      return;
    }

    this.filtersForm.controls.model.removeAt(length - 1);
  }
}
