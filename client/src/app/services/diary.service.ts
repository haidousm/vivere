import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FoodEntry } from '../types/FoodEntry';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  apiUrl = `${environment.apiUrl}/diary`;
  currentDiaryId = '';

  refreshDiary = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {}

  getDiaryEntry(date: Date) {
    const dateString = date.toLocaleString().split(',')[0].replace(/\//g, '-');
    return this.httpClient.get(`${this.apiUrl}/${dateString}`, {
      withCredentials: true,
    });
  }

  getTotalCalories(entryId: string) {
    return this.httpClient.get(`${this.apiUrl}/calories/${entryId}`, {
      withCredentials: true,
    });
  }

  addOrUpdateFoodEntry(foodEntry: FoodEntry) {
    return this.httpClient.post(`${this.apiUrl}/food`, foodEntry, {
      withCredentials: true,
    });
  }

  getCurrentDiaryId() {
    return this.currentDiaryId;
  }

  setCurrentDiaryId(id: string) {
    this.currentDiaryId = id;
  }
}
