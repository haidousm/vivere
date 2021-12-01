import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  apiUrl = `${environment.apiUrl}/meals`;
  constructor(private httpClient: HttpClient) {}

  getMealTimes() {
    return this.httpClient.get(`${this.apiUrl}/me`, { withCredentials: true });
  }
}
