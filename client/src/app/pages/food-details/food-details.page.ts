/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/types/FoodItem';
import { ModalController } from '@ionic/angular';
import { FoodEntry } from 'src/app/types/FoodEntry';
import { MealTime } from 'src/app/types/MealTime';
import { DiaryService } from 'src/app/services/diary.service';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.page.html',
  styleUrls: ['./food-details.page.scss'],
})
export class FoodDetailsPage implements OnInit {
  @Input() food: FoodItem;
  @Input() mealTimes: MealTime[];
  @Input() currentDiaryId: string;
  @Input() clickedFoodEntry: FoodEntry;

  foodEntry: FoodEntry;
  constructor(
    public modalController: ModalController,
    private diaryService: DiaryService
  ) {}

  ngOnInit() {
    if (!this.clickedFoodEntry) {
      this.foodEntry = {
        foodItem: this.food,
        numberOfServings: 1,
        totalCalories: this.food.caloriesPerServing,
        mealTime: this.mealTimes[0],
        diaryId: this.currentDiaryId,
      };
    } else {
      this.foodEntry = this.clickedFoodEntry;
      this.food = this.foodEntry.foodItem;
    }
  }

  onServingChange(event) {
    if (event.target.value <= 0) {
      event.target.value = 1;
    }
    this.foodEntry.numberOfServings = event.target.value;
    this.foodEntry.totalCalories =
      this.food.caloriesPerServing * event.target.value;
  }

  onMealTimeChange(event) {
    this.foodEntry.mealTime = this.mealTimes.find(
      (mealTime) => mealTime._id === event.target.value
    );
  }

  saveChanges() {
    this.diaryService.addOrUpdateFoodEntry(this.foodEntry).subscribe(() => {
      this.modalController.dismiss();
      this.modalController.dismiss({}, '', 'search-modal').catch((e) => {});
      this.diaryService.refreshDiary.next(Math.random());
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
