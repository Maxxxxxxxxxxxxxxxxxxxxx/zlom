import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environment/environment';
import { CarEntryDTO } from '../dto/car-entry.dto';
import { AuthService } from './auth.service';
import { CarUpdateRequest } from '../dto/bodies/car-update-request.dto';
import { CarCreateRequest } from '../dto/bodies/car-create-request.dto';

interface PageData {
  readonly pageIndex: number;
  readonly itemsPerPage: number;
  readonly itemsLength: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarEntryService {
  private httpClient: HttpClient = inject(HttpClient);
  private entries$: Subject<CarEntryDTO[]> = new BehaviorSubject(
    [] as CarEntryDTO[]
  );
  private pageData$: Subject<PageData> = new BehaviorSubject({
    itemsPerPage: 10,
    pageIndex: 0,
    itemsLength: 0,
  });

  private pageData_: PageData = {
    itemsPerPage: 10,
    pageIndex: 0,
    itemsLength: 0,
  };

  private authService: AuthService = inject(AuthService);

  get pageData() {
    return this.pageData$.asObservable();
  }

  get entries() {
    return this.entries$.asObservable();
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
    return this.httpClient.get<any>(
      `${environment.apiUrl}/carEntries/page?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      {
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('token')!,
        }),
      }
    );
  }

  refreshCurrentPage(inc?: number): void {
    this.pageData.subscribe((data) => {
      this.getPage(data.pageIndex, data.itemsPerPage).subscribe((res) => {
        this.setEntries(res.body);
      });
    });

    this.getCount().subscribe((res) => {
      this.pageData$.next({
        ...this.pageData_,
        itemsLength: res.body,
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
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token')!,
      }),
    });
  }

  resetEntries() {
    this.entries$.next([]);
  }
}
