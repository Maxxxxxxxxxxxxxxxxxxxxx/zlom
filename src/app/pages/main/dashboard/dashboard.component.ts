import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SearchComponent } from '../../../ui/search/search.component';
import { HotToastService } from '@ngxpert/hot-toast';
import { TableComponent } from '../../../ui/table/table.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AuthService } from '../../../service/auth.service';
import { CarEntryService, Filters } from '../../../service/car-entry.service';
import { DialogService } from '../../../service/dialog.service';
import { DropdownComponent } from './dropdown/dropdown.component';
import { Title } from '@angular/platform-browser';
import { ResizeService } from '../../../service/resize.service';

interface PageData {
  readonly pageIndex: number;
  readonly pageSize: number;
  readonly length: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTableModule,
    SearchComponent,
    TableComponent,
    MatPaginatorModule,
    DropdownComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private resizeService: ResizeService = inject(ResizeService);
  private authService: AuthService = inject(AuthService);
  private carEntryService: CarEntryService = inject(CarEntryService);
  private dialogService: DialogService = inject(DialogService);
  private toast: HotToastService = inject(HotToastService);

  keysToDisplay = ['title', 'make', 'model', 'price', 'location', 'entryDate'];
  sortByOptions = ['title', 'make', 'entryDate', 'price'];

  hideLocationRow: boolean = false;

  pageSizeOptions: number[] = [10];
  pageSize: number = 10;
  itemsLength: number = 0;
  pageIndex: number = 0;

  filters: Filters = {};

  ngOnInit(): void {
    this.carEntryService.filters.subscribe((filters) => {
      this.filters = filters;
    });

    this.carEntryService.getCount().subscribe((res) => {
      console.log(res.body);
      this.itemsLength = res.body;
    });

    this.carEntryService.getPage(this.pageIndex, this.pageSize).subscribe({
      next: (res) => {
        this.carEntryService.setEntries(res.body);

        if (res.body.length < 10) this.pageSize = res.body.length;
      },
      error: (res) => {
        this.toast.error('Failed to load data');
        console.error('Failed to get page: ', res);
      },
    });

    this.carEntryService.pageData.subscribe((data) => {
      this.pageIndex = data.pageIndex;
      this.itemsLength = data.length;
      this.pageSize = data.pageSize;
    });

    this.resizeService.isSmall.subscribe((width) => {
      console.log('width:', width);
      this.keysToDisplay =
        width < 640
          ? ['title', 'price', 'entryDate']
          : ['title', 'make', 'model', 'price', 'location', 'entryDate'];
    });

    console.log('filters: ', this.filters);
  }

  handlePaginatorEvent(event: any) {
    console.log(event);

    // change page index event
    if (event.pageIndex != this.pageIndex) {
      this.pageIndex = event.pageIndex;

      this.carEntryService
        .getPage(this.pageIndex, this.pageSize)
        .subscribe((res) => {
          this.carEntryService.setEntries(res.body);
        });
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      if (this.pageIndex === 0) {
        return;
      } else this.setPage({ pageIndex: this.pageIndex - 1 });
    } else if (event.key === 'ArrowRight') {
      if (
        this.pageIndex * this.pageSize + this.pageSize + 1 >
        this.itemsLength
      ) {
        return;
      } else this.setPage({ pageIndex: this.pageIndex + 1 });
    }
  }

  setPage(data: Partial<PageData>) {
    this.paginator.pageIndex = data.pageIndex!;

    this.paginator.page.next({
      pageIndex: data.pageIndex ?? this.paginator.pageIndex,
      pageSize: data.pageSize ?? this.paginator.pageSize,
      length: data.length ?? this.paginator.length,
    });

    this.carEntryService.setPageData({
      pageIndex: data.pageIndex ?? this.pageIndex,
      pageSize: data.pageSize ?? this.pageSize,
      length: data.length ?? this.itemsLength,
    });
  }

  search() {}

  openCreateForm() {
    this.dialogService.open({ type: 'car', title: 'Add new' });
  }

  openFilterOptions() {
    this.dialogService.open({ type: 'filter', title: 'Filter data' });
  }
}
