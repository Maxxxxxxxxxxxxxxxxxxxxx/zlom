import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { DialogContentType, DialogService } from '../../service/dialog.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { CarEntryService, PageData } from '../../service/car-entry.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnChanges, OnInit {
  private dialogService: DialogService = inject(DialogService);
  private entriesService: CarEntryService = inject(CarEntryService);
  private toast: HotToastService = inject(HotToastService);

  elements: any[] = [];
  pageData: PageData = {
    pageIndex: 0,
    pageSize: 5,
    length: 0,
  };

  @Input() keysToDisplay: string[] = [];
  keys: string[] = [];

  openConfirmDeleteModal(entryId: number) {
    this.dialogService.confirm('Confirm delete', 'label', () =>
      this.entriesService.delete(entryId).subscribe({
        next: (res) => {
          this.toast.success('Deleted');
          this.entriesService.refreshCurrentPage();
        },
        error: (res) => {
          this.toast.error('Error deleting entry');
          console.error(res);
        },
      })
    );
  }

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

  public reloadTableData(): void {}

  ngOnInit(): void {
    this.entriesService.entries.subscribe((entries) => {
      this.elements = entries;
    });

    this.entriesService.pageData.subscribe((data) => {
      if (data) this.pageData = data;
    });
  }

  ngOnChanges(): void {
    if (this.elements.length != 0) this.keys = Object.keys(this.elements[0]);
  }
}
