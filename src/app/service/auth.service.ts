import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environment/environment';
import AuthRequest from '../dto/bodies/auth-request.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);
  private isAuthenticated = false;

  // constructor() {
  //   this.isAuthenticated = !!localStorage.getItem.token;
  // }

  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  setToken(token: string) {
    localStorage.setItem('token', `Bearer ${token}`);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  login(credentials: AuthRequest): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/auth/login`,
      credentials,
      { observe: 'response' }
    );
  }
}
