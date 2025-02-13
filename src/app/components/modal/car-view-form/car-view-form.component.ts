import { Component, inject, input, Input, model, OnInit } from '@angular/core';
import { CarEntryDTO } from '../../../dto/car-entry.dto';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { dateStringValidator } from '../../../validators/date-string.validator';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { HotToastService } from '@ngxpert/hot-toast';
import { DialogService } from '../../../service/dialog.service';
import { Router } from '@angular/router';
import { CarEntryService } from '../../../service/car-entry.service';

export type CarEntryFormData = {
  readonly title: FormControl<string | null | undefined>;
  readonly location: FormControl<string | null | undefined>;
  readonly price: FormControl<number | null | undefined>;
  readonly entryDate: FormControl<string | null | undefined>;
  readonly isDamaged: FormControl<boolean | null | undefined>;
  readonly make: FormControl<string | null | undefined>;
  readonly model: FormControl<string | null | undefined>;
  readonly engine: FormControl<string | null | undefined>;
  readonly carWeight: FormControl<number | null | undefined>;
  readonly carType: FormControl<string | null | undefined>;
};

@Component({
  selector: 'app-car-view-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, NgClass],
  templateUrl: './car-view-form.component.html',
})
export class CarViewFormComponent implements OnInit {
  @Input() objectId: number | undefined = undefined;
  @Input() create: boolean = false;

  object: CarEntryDTO = {};
  isCreateForm: boolean = false;

  carEntryService: CarEntryService = inject(CarEntryService);
  router: Router = inject(Router);
  dialogService: DialogService = inject(DialogService);
  toast: HotToastService = inject(HotToastService);
  carKeys: (keyof CarEntryDTO)[] = [
    'id',
    'title',
    'location',
    'price',
    'entryDate',
    'isDamaged',
    'make',
    'model',
    'engine',
    'carWeight',
    'carType',
  ];

  carForm: FormGroup<CarEntryFormData> = new FormGroup<CarEntryFormData>(
    {
      title: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      entryDate: new FormControl('', [
        Validators.required,
        dateStringValidator(),
      ]),
      isDamaged: new FormControl(false, [Validators.required]),
      make: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      engine: new FormControl('', [Validators.required]),
      carWeight: new FormControl(0, [Validators.required]),
      carType: new FormControl('', [Validators.required]),
    },
    { updateOn: 'change' }
  );

  ngOnInit(): void {
    if (!this.objectId) {
      this.isCreateForm = true;
      return;
    }

    this.carEntryService.entries.subscribe({
      next: (entries: CarEntryDTO[]) => {
        this.object = entries.find(
          (entry: CarEntryDTO) => entry.id === this.objectId
        )!;
      },
      error: (res) => {
        this.toast.error('Failed to load data');
        console.error('Failed to reload entries: ', res);
      },
    });

    if (this.object)
      this.carForm = new FormGroup<CarEntryFormData>(
        {
          title: new FormControl(this.object.title, [Validators.required]),
          location: new FormControl(this.object.location, [
            Validators.required,
          ]),
          price: new FormControl(this.object.price, [Validators.required]),
          entryDate: new FormControl(this.object.entryDate, [
            Validators.required,
            dateStringValidator(),
          ]),
          isDamaged: new FormControl(this.object.isDamaged, [
            Validators.required,
          ]),
          make: new FormControl(this.object.make, [Validators.required]),
          model: new FormControl(this.object.model, [Validators.required]),
          engine: new FormControl(this.object.engine, [Validators.required]),
          carWeight: new FormControl(this.object.carWeight, [
            Validators.required,
          ]),
          carType: new FormControl(this.object.carType, [Validators.required]),
        },
        { updateOn: 'change' }
      );
  }

  getValue(key: keyof CarEntryDTO): any {
    return this.object[key] ?? '';
  }

  getFormValue(key: string) {
    if (key != 'id') {
      //@ts-ignore
      const val = this.carForm.controls[key].value;
      return val;
    }
  }

  isFormDirty() {
    return this.carForm.dirty;
  }

  checkDateValidator() {
    return this.carForm.controls.entryDate.errors === null;
  }

  submitEdit(): void {
    if (!this.checkDateValidator()) {
      this.toast.error('Invalid date');
    } else if (this.carForm.invalid) {
      this.toast.error('One of the fields is invalid!');
    } else {
      if (this.isCreateForm) {
        const request = this.carForm.value;
        this.carEntryService.create(request).subscribe({
          next: () => {
            this.carEntryService.refreshCurrentPage();
            this.toast.success('Created');
            this.dialogService.close();
          },
          error: (res) => {
            this.toast.error('Error');
            console.error(res);
          },
        });
      } else {
        const request = { ...this.carForm.value, id: this.object.id };
        this.carEntryService.update(request).subscribe({
          next: () => {
            this.carEntryService.refreshCurrentPage();
            this.toast.success('Edited');
            this.dialogService.close();
          },
          error: (res) => {
            this.toast.error('Error');
            console.error(res);
          },
        });
      }
    }
  }
}
