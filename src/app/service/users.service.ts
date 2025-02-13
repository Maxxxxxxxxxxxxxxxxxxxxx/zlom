import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient: HttpClient = inject(HttpClient);

  getUsersList() {
    return this.httpClient.get<any>(`${environment.apiUrl}/userAccount/`, {
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token')!,
      }),
    });
  }

  getUserData(id: number) {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.httpClient.get<any>(`${environment.apiUrl}/userAccount/`, {
      params,
      observe: 'response',
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token')!,
      }),
    });
  }
}
