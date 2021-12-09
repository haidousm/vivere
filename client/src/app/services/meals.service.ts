import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Meal } from '../types/Meal';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  apiUrl = `${environment.apiUrl}/meals`;
  constructor(private httpClient: HttpClient) {}

  saveMeal(mealName, foodEntries) {
    return this.httpClient.post(`${this.apiUrl}`, {
      name: mealName,
      foodEntries,
    });
  }

  getMeals() {
    return this.httpClient.get(`${this.apiUrl}/me`);
  }

  getMealTimes() {
    return this.httpClient.get(`${this.apiUrl}/me/times`);
  }

  deleteMeal(meal: Meal) {
    return this.httpClient.delete(`${this.apiUrl}/${meal.id}`);
  }
}
