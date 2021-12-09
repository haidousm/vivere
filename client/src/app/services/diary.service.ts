/* eslint-disable no-underscore-dangle */
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
    return this.httpClient.get(`${this.apiUrl}/${dateString}`);
  }

  getTotalCalories(entryId: string) {
    return this.httpClient.get(`${this.apiUrl}/calories/${entryId}`);
  }

  addOrUpdateFoodEntry(foodEntry: FoodEntry) {
    return this.httpClient.post(`${this.apiUrl}/food`, foodEntry);
  }

  addFoodEntries(foodEntries: FoodEntry[]) {
    return this.httpClient.post(`${this.apiUrl}/food/batch`, {
      foodEntries,
      diaryId: this.getCurrentDiaryId(),
    });
  }

  deleteFoodEntry(diaryEntryId, foodEntryId) {
    return this.httpClient.delete(
      `${this.apiUrl}/food/${diaryEntryId}/${foodEntryId}`
    );
  }

  getCurrentDiaryId() {
    return this.currentDiaryId;
  }

  setCurrentDiaryId(id: string) {
    this.currentDiaryId = id;
  }
}
