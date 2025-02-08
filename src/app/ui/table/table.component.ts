import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnChanges {
  @Input() elements: any[] = [];
  @Input() pageIndex: number = 0;
  @Input() keysToDisplay: string[] = [];

  private dialog = inject(MatDialog);

  keys: string[] = [];

  openDialog(object: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { title: 'Details', object },
    });

    console.log(object);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  ngOnChanges(): void {
    if (this.elements.length != 0) this.keys = Object.keys(this.elements[0]);
  }
}
