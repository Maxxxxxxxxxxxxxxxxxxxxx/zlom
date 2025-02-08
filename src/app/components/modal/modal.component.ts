import { Component, inject, input, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

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
  imports: [MatIconModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  readonly dialogRef = inject(MatDialogRef<ModalComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  get getObjectKeys() {
    return Object.keys(this.data.object);
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
