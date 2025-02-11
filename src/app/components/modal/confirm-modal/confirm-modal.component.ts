import { Component, inject, Input, OnInit } from '@angular/core';
import { CarEntryService } from '../../../service/car-entry.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { DialogConfig, DialogService } from '../../../service/dialog.service';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent implements OnInit {
  label: string = '';
  callback: () => any = () => {};

  carEntryService: CarEntryService = inject(CarEntryService);
  dialogService: DialogService = inject(DialogService);
  toast: HotToastService = inject(HotToastService);

  ngOnInit(): void {
    this.dialogService.config.subscribe({
      next: (config: DialogConfig) => {
        if (config != null) {
          this.callback = config.confirmWindowData?.callback!;
        }
      },
    });
  }

  cancel() {
    try {
      this.dialogService.close();
    } catch (err) {
      this.toast.error('Error');
      this.dialogService.close();
    }
  }

  confirm() {
    try {
      this.callback();
      this.dialogService.close();
    } catch (err) {
      this.toast.error('Error');
      this.dialogService.close();
    }
  }
}
