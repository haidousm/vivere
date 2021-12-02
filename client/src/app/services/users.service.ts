import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = `${environment.apiUrl}/users`;
  constructor(private httpClient: HttpClient) {}

  getCurrentUser() {
    return this.httpClient.get(`${this.apiUrl}/me`, { withCredentials: true });
  }

  updateUser(user: User) {
    return this.httpClient.put(`${this.apiUrl}/me`, user, {
      withCredentials: true,
    });
  }
}
