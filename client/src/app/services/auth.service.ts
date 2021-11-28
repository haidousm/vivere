import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { RegisterUser } from '../types/User';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl = `${environment.apiUrl}/auth`;

  constructor(private httpClient: HttpClient) {}
  login(email: string, password: string) {
    return this.httpClient.post(
      `${this.apiUrl}/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }
  register(user: RegisterUser) {
    return this.httpClient.post(`${this.apiUrl}/register`, user, {
      withCredentials: true,
    });
  }
}
