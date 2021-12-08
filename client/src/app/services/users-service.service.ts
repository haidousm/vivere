import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  apiUrl = `${environment.apiUrl}/users`;

  constructor(private httpClient: HttpClient) {}

  getCurrentUser() {
    return this.httpClient.get(`${this.apiUrl}/me`);
  }
}
