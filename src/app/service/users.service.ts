import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { environment } from '../../environment/environment';
import { UserDataRequestDTO } from '../dto/bodies/user-data-request.dto';
import { UserDataDTO } from '../dto/user-data.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient: HttpClient = inject(HttpClient);

  private users$: Subject<UserDataDTO[]> = new BehaviorSubject(
    [] as UserDataDTO[]
  );
  private users_: UserDataDTO[] = [];

  refreshUsers(): void {
    this.getUsersList()
      .pipe(take(1))
      .subscribe((res) => {
        this.users_ = res.body;
        this.users$.next(res.body);
      });
  }

  get users() {
    return this.users$.asObservable();
  }

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

  createUser(body: UserDataRequestDTO) {
    if (!body.contactData?.email && !body.contactData?.phoneNumber)
      body = {
        ...body,
        contactData: null,
      };

    return this.httpClient.post<any>(
      `${environment.apiUrl}/userAccount/`,
      body,
      {
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('token')!,
        }),
      }
    );
  }

  updateUser(b: UserDataRequestDTO) {
    let body = b;

    if (!body.password)
      body = {
        ...body,
        password: null,
      };

    if (!body.contactData?.email && !body.contactData?.phoneNumber)
      body = {
        ...body,
        contactData: null,
      };

    return this.httpClient.put<any>(
      `${environment.apiUrl}/userAccount/`,
      body,
      {
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('token')!,
        }),
      }
    );
  }
}
