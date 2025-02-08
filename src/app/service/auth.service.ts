import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import AuthRequest from '../dto/auth-request.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);
  private isAuthenticated = false;
  private token = 'Bearer token';

  // constructor() {
  //   this.isAuthenticated = !!localStorage.getItem.token;
  // }

  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.token);
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
