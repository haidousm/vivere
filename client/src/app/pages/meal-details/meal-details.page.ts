import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DiaryService } from 'src/app/services/diary.service';
import { MealsService } from 'src/app/services/meals.service';
import { Meal } from 'src/app/types/Meal';
import { MealTime } from 'src/app/types/MealTime';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.page.html',
  styleUrls: ['./meal-details.page.scss'],
})
export class MealDetailsPage implements OnInit {
  @Input() meal: Meal;
  @Input() mealTimes: MealTime[];
  constructor(
    private modalController: ModalController,
    private mealsService: MealsService,
    private diaryService: DiaryService
  ) {}
  ngOnInit() {}

  saveChanges() {
    this.diaryService.addFoodEntries(this.meal.foodEntries).subscribe(() => {
      this.modalController.dismiss();
      this.modalController.dismiss({}, '', 'search-modal').catch((e) => {});
      this.diaryService.refreshDiary.next(Math.random());
    });
  }

  deleteMeal() {
    this.mealsService.deleteMeal(this.meal).subscribe(() => {
      this.modalController.dismiss();
      this.modalController.dismiss({}, '', 'search-modal').catch((e) => {});
      this.diaryService.refreshDiary.next(Math.random());
    });
  }

  calculateMealCalories(item: Meal) {
    return item.foodEntries.reduce(
      (acc, foodItem) => acc + foodItem.totalCalories,
      0
    );
  }

  getMealTimeFromMeal(meal: Meal) {
    return this.mealTimes.find(
      (mealTime) => mealTime.id === meal.foodEntries[0].mealTime.id
    ).name;
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
