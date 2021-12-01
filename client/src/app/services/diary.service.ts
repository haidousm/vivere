import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  apiUrl = `${environment.apiUrl}/diary`;
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
}
