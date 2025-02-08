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
import { CarEntryService } from '../../../service/car-entry.service';

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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private toast: HotToastService = inject(HotToastService);
  private authService: AuthService = inject(AuthService);
  private carEntryService: CarEntryService = inject(CarEntryService);

  private maxItems = 10;

  keysToDisplay = ['title', 'make', 'model', 'price', 'location'];

  itemsPerPage: number = 10;
  itemsLength: number = 0;
  pageIndex: number = 0;
  dataSource: any = [];

  ngOnInit(): void {
    this.carEntryService.getCount().subscribe((res) => {
      console.log(res.body);
      this.itemsLength = res.body;
    });

    this.carEntryService
      .getPage(this.pageIndex, this.maxItems)
      .subscribe((res) => {
        this.dataSource = res.body;

        if (this.dataSource.length < 10)
          this.itemsPerPage = this.dataSource.length;
      });
  }

  onPageChanged(event: any) {
    this.pageIndex = event.pageIndex;
    console.log(this.pageIndex);

    this.carEntryService
      .getPage(this.pageIndex, this.maxItems)
      .subscribe((res) => {
        this.dataSource = res.body;
      });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      if (this.pageIndex === 0) {
        return;
      } else this.setPage(this.pageIndex - 1);
    } else if (event.key === 'ArrowRight') {
      if (
        this.pageIndex * this.itemsPerPage + this.itemsPerPage + 1 >
        this.itemsLength
      ) {
        return;
      } else this.setPage(this.pageIndex + 1);
    }
  }

  setPage(newPageIndex: number) {
    this.paginator.pageIndex = newPageIndex;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length,
    });
  }
}
