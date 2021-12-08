import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DiaryService } from 'src/app/services/diary.service';
import { FoodService } from 'src/app/services/food.service';
import { MealsService } from 'src/app/services/meals.service';
import { FoodItem } from 'src/app/types/FoodItem';
import { Meal } from 'src/app/types/Meal';
import { MealTime } from 'src/app/types/MealTime';
import { FoodDetailsPage } from '../food-details/food-details.page';
import { MealDetailsPage } from '../meal-details/meal-details.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  numberOfItems = 30;
  listItems: Array<FoodItem | Meal> = [];
  mealTimes: MealTime[] = [];

  constructor(
    private modalController: ModalController,
    private foodService: FoodService,
    private mealsService: MealsService,
    private diaryService: DiaryService
  ) {}

  ngOnInit() {
    this.foodService
      .getRecentFoodItems(this.numberOfItems)
      .subscribe((foodItems: FoodItem[]) => {
        this.listItems = foodItems;
      });

    this.mealsService.getMealTimes().subscribe((meals: MealTime[]) => {
      this.mealTimes = meals.sort((a, b) => a.order - b.order);
    });
  }

  search(event) {
    this.foodService
      .filterFoodItems(event.target.value.toLowerCase())
      .subscribe((foodItems: FoodItem[]) => {
        this.listItems = foodItems;
      });
  }

  async selectItem(item: FoodItem | Meal) {
    if (this.isFoodItem(item)) {
      const modal = await this.modalController.create({
        component: FoodDetailsPage,
        backdropDismiss: true,
        componentProps: {
          food: item,
          mealTimes: this.mealTimes,
          currentDiaryId: this.diaryService.getCurrentDiaryId(),
        },
        id: 'food-details-modal',
      });
      return await modal.present();
    } else {
      const modal = await this.modalController.create({
        component: MealDetailsPage,
        backdropDismiss: true,
        componentProps: {
          meal: item,
          mealTimes: this.mealTimes,
          currentDiaryId: this.diaryService.getCurrentDiaryId(),
        },
        id: 'meal-details-modal',
      });
      return await modal.present();
    }
  }

  segmentChanged(event) {
    if (event.detail.value === 'recents') {
      this.foodService
        .getRecentFoodItems(this.numberOfItems)
        .subscribe((foodItems: FoodItem[]) => {
          this.listItems = foodItems;
        });
    } else {
      this.mealsService.getMeals().subscribe((meals: Meal[]) => {
        this.listItems = meals;
      });
    }
  }

  isFoodItem(item: FoodItem | Meal) {
    return 'brand' in item;
  }

  calculateMealCalories(item: Meal) {
    return item.foodEntries.reduce(
      (acc, foodItem) => acc + foodItem.totalCalories,
      0
    );
  }

  asFoodItem(item: FoodItem | Meal) {
    return item as FoodItem;
  }

  asMeal(item: FoodItem | Meal) {
    return item as Meal;
  }
}
