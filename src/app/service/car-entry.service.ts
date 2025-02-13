import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, Observable, Subject, take } from 'rxjs';
import { environment } from '../../environment/environment';
import { CarEntryDTO } from '../dto/car-entry.dto';
import { AuthService } from './auth.service';
import { CarUpdateRequest } from '../dto/bodies/car-update-request.dto';
import { CarCreateRequest } from '../dto/bodies/car-create-request.dto';

export interface PageData {
  readonly pageIndex: number;
  readonly pageSize: number;
  readonly length: number;
}

export interface Filters {
  readonly search?: string;
  readonly isDamaged?: boolean;
  readonly make?: string[];
  readonly model?: string[];
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly sortAsc?: string;
  readonly sortDesc?: string;
}

export interface SortFilters {
  readonly sortAsc?: string;
  readonly sortDesc?: string;
}
@Injectable({
  providedIn: 'root',
})
export class CarEntryService {
  private httpClient: HttpClient = inject(HttpClient);
  private entries$: Subject<CarEntryDTO[]> = new BehaviorSubject(
    [] as CarEntryDTO[]
  );
  private filters$: Subject<Filters> = new BehaviorSubject({} as Filters);
  private pageData$: Subject<PageData> = new BehaviorSubject({
    pageSize: 10,
    pageIndex: 0,
    length: 0,
  });

  private pageData_: PageData = {
    pageSize: 10,
    pageIndex: 0,
    length: 0,
  };

  private filters_: Filters = {};

  get pageData() {
    return this.pageData$.asObservable();
  }

  get entries() {
    return this.entries$.asObservable();
  }

  get filters() {
    return this.filters$.asObservable();
  }

  get params() {
    const {
      search,
      isDamaged,
      make,
      model,
      minPrice,
      maxPrice,
      sortAsc,
      sortDesc,
    } = this.filters_;

    let params = new HttpParams();

    params = search ? params.append('search', search) : params;
    params =
      isDamaged === true ? params.append('isDamaged', !isDamaged) : params;
    params = minPrice ? params.append('minPrice', minPrice) : params;
    params = maxPrice ? params.append('maxPrice', maxPrice) : params;

    make &&
      make.forEach((m) => {
        params = params.append('make', m);
      });
    model &&
      model.forEach((m) => {
        params = params.append('model', m);
      });

    params = sortAsc ? params.append('sortAsc', sortAsc) : params;
    params = sortDesc ? params.append('sortDesc', sortDesc) : params;

    return params;
  }

  setPageData(data: PageData) {
    this.pageData$.next(data);
    this.pageData$.subscribe((data) => {
      this.pageData_ = data;
    });
  }

  setEntries(entries: CarEntryDTO[]) {
    this.entries$.next(entries);
  }

  setFilters(data: Filters) {
    this.filters$.next(data);
    this.filters_ = data;
  }

  setSortFilters(data: SortFilters) {
    const newFilters = {
      ...this.filters_,
      sortAsc: data.sortAsc,
      sortDesc: data.sortDesc,
    };
    this.filters$.next(newFilters);
    this.filters_ = newFilters;
  }

  getDashboard(): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/carEntries/dashboard`,
      {
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('token')!,
        }),
      }
    );
  }

  getPage(pageIndex: number, pageSize: number): Observable<any> {
    let params = this.params;

    params = params.append('pageIndex', pageIndex);
    params = params.append('pageSize', pageSize);

    return this.httpClient.get<any>(`${environment.apiUrl}/carEntries/page`, {
      params,
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token')!,
      }),
    });
  }

  refreshCurrentPage(): void {
    this.pageData.pipe(take(1)).subscribe((data) => {
      this.getPage(data.pageIndex, data.pageSize)
        .pipe(take(1))
        .subscribe((res) => {
          this.setEntries(res.body);
        });
    });

    this.getCount()
      .pipe(take(1))
      .subscribe((res) => {
        this.pageData$.next({
          ...this.pageData_,
          length: res.body,
        });
      });
  }

  getSingleObject(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/carEntries/find?id=${id}`,
      {
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('token')!,
        }),
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.apiUrl}/carEntries/delete?id=${id}`,
      {
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('token')!,
        }),
      }
    );
  }

  update(req: CarUpdateRequest): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/carEntries/`, req, {
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token')!,
      }),
    });
  }

  create(req: CarCreateRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/carEntries/`, req, {
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token')!,
      }),
    });
  }

  getCount(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/carEntries/count`, {
      params: this.params,
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token')!,
      }),
    });
  }

  setSearchQuery(query: string) {
    this.setFilters({
      ...this.filters_,
      search: query,
    });
  }

  resetEntries() {
    this.entries$.next([]);
  }
}
