import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  apiUrl = `${environment.apiUrl}/food`;
  constructor(private httpClient: HttpClient) {}

  getFoodItems(numberOfItems: number) {
    return this.httpClient.get(`${this.apiUrl}/?num=${numberOfItems}`);
  }

  getRecentFoodItems(numberOfItems: number) {
    return this.httpClient.get(`${this.apiUrl}/recent?num=${numberOfItems}`, {
      withCredentials: true,
    });
  }

  filterFoodItems(filter: string) {
    return this.httpClient.get(`${this.apiUrl}/?num=100&search=${filter}`);
  }
}
