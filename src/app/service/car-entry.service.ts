import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CarEntryService {
  private httpClient: HttpClient = inject(HttpClient);

  getDashboard(): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/carEntries/dashboard`,
      { observe: 'response' }
    );
  }

  getPage(pageIndex: number, pageSize: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/carEntries/page?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      {
        observe: 'response',
      }
    );
  }

  getCount(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/carEntries/count`, {
      observe: 'response',
    });
  }
}
