import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import AuthRequest from '../dto/auth-request.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: AuthRequest): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/auth/login`,
      credentials,
      { observe: 'response' }
    );
  }
}
