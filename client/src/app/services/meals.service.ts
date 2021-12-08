import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  apiUrl = `${environment.apiUrl}/meals`;
  constructor(private httpClient: HttpClient) {}

  saveMeal(mealName, foodEntries) {
    return this.httpClient.post(
      `${this.apiUrl}`,
      {
        name: mealName,
        foodEntries,
      },
      { withCredentials: true }
    );
  }

  getMealTimes() {
    return this.httpClient.get(`${this.apiUrl}/me/times`, {
      withCredentials: true,
    });
  }
}
