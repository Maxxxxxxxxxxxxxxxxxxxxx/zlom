import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentType, DialogService } from '../../service/dialog.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnChanges {
  private dialogService: DialogService = inject(DialogService);
  private toast: HotToastService = inject(HotToastService);

  @Input() elements: any[] = [];
  @Input() pageIndex: number = 0;
  @Input() keysToDisplay: string[] = [];

  public openDialog(object: any, type: DialogContentType) {
    this.dialogService.open({
      title: 'Details',
      object,
      type,
    });
  }

  public deleteElement(element: any): void {
    const elementToRemove = null;
  }

  keys: string[] = [];

  ngOnChanges(): void {
    if (this.elements.length != 0) this.keys = Object.keys(this.elements[0]);
  }
}
