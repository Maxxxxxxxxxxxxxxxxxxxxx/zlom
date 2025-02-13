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

  isLoggedIn() {
    console.log(localStorage.getItem('token'), localStorage.getItem('user'));
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      return true;
    }
    return false;
  }

  setUser(token: string, username: string) {
    localStorage.setItem('token', `Bearer ${token}`);
    localStorage.setItem('user', username);
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
