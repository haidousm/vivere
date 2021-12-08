import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { RegisterUser } from '../types/User';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}
  login(email: string, password: string) {
    this.httpClient
      .post(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .subscribe((res) => {
        // save the token
      });
  }
  register(user: RegisterUser) {
    return this.httpClient.post(`${this.apiUrl}/register`, user, {
      withCredentials: true,
    });
  }
}
