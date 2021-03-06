/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  IonRouterOutlet,
  IonSlides,
  ModalController,
} from '@ionic/angular';
import { Day } from 'src/app/types/Day';
import { FoodItem } from 'src/app/types/FoodItem';
import { FoodDetailsPage } from '../food-details/food-details.page';
import { MealTime } from 'src/app/types/MealTime';
import { MealsService } from 'src/app/services/meals.service';
import { DiaryService } from 'src/app/services/diary.service';
import { DiaryEntry } from 'src/app/types/DiaryEntry';
import { DiaryCalories } from 'src/app/types/DiaryCalories';
import { FoodEntry } from 'src/app/types/FoodEntry';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/User';
import { SearchPage } from '../search/search.page';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {
  @ViewChild('slider', { read: IonSlides }) slider: IonSlides;

  diaryEntry: DiaryEntry;
  days: Day[] = [];

  meals: MealTime[] = [];

  slidesOptions = {
    slidesPerView: 6.5,
  };

  caloricProgress = 0;
  goalCalories = 2000;
  currentCalories = '';
  timerHandler: number;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private mealsService: MealsService,
    private diaryService: DiaryService,
    private usersService: UsersService,
    private routerOutlet: IonRouterOutlet
  ) {
    this.diaryService.refreshDiary.subscribe(() => {
      this.refreshDiary();
    });
  }

  ngOnInit() {
    const todaysDate = new Date();
    const today = {
      name: todaysDate.toLocaleDateString('en-US', { weekday: 'short' }),
      date: todaysDate,
      selected: true,
    };
    this.mealsService.getMealTimes().subscribe((meals: MealTime[]) => {
      this.meals = meals.sort((a, b) => a.order - b.order);
      this.selectDay(today);
    });

    this.usersService.getCurrentUser().subscribe((user: User) => {
      this.goalCalories = user.goalCalories;
    });
  }

  previousMonth() {
    const date = new Date(this.diaryEntry.date);
    date.setDate(0);

    const day = {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date,
      selected: true,
    };
    if (day.date.getMonth() === new Date().getMonth()) {
      day.date.setDate(new Date().getDate());
      this.selectDay(day);
    } else {
      this.selectDay(day);
      this.slider.slideTo(this.days.length - 1);
    }
  }

  nextMonth() {
    const date = new Date(this.diaryEntry.date);
    date.setDate(32);
    if (date.getMonth() === new Date().getMonth()) {
      date.setDate(new Date().getDate());
    }
    const day = {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date,
      selected: true,
    };
    this.selectDay(day);
    this.slider.slideTo(0);
  }

  selectDay(day: Day) {
    this.days.forEach((d) => (d.selected = false));
    day.selected = true;
    this.slider.slideTo(day.date.getDate() - 1);
    this.diaryService
      .getDiaryEntry(day.date)
      .subscribe((diaryEntry: DiaryEntry) => {
        this.diaryEntry = diaryEntry;
        this.diaryService.setCurrentDiaryId(this.diaryEntry.id);
        this.diaryEntry.date = new Date(diaryEntry.date);
        this.days = this.generateDaysOfTheMonth(this.diaryEntry.date);
        this.diaryService
          .getTotalCalories(this.diaryEntry.id)
          .subscribe((diaryCalories: DiaryCalories) => {
            this.meals.forEach((meal) => {
              const mealCalories = diaryCalories.mealsCalories.find(
                (m) => m.mealId === meal.id
              );
              meal.calories = mealCalories.calories;
            });
            this.caloricProgress =
              (diaryCalories.totalCalories / this.goalCalories) * 100;
            this.currentCalories = `${Math.floor(
              (this.caloricProgress / 100) * this.goalCalories
            )} cal.`;
          });
      });
  }

  async selectFood(foodEntry: FoodEntry) {
    if (foodEntry.id === '') {
      return await this.openSearchModal();
    }
    const modal = await this.modalController.create({
      component: FoodDetailsPage,
      backdropDismiss: true,
      componentProps: {
        clickedFoodEntry: foodEntry,
        mealTimes: this.meals,
        currentDiaryId: this.diaryEntry.id,
      },
    });

    await modal.present();
  }

  refreshDiary() {
    if (this.diaryEntry) {
      const day = {
        name: this.diaryEntry.date.toLocaleDateString('en-US', {
          weekday: 'short',
        }),
        date: this.diaryEntry.date,
        selected: true,
      };
      this.selectDay(day);
      this.usersService.getCurrentUser().subscribe((user: User) => {
        this.goalCalories = user.goalCalories;
      });
    }
  }

  generateDaysOfTheMonth(date: Date) {
    const days: Day[] = [];
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
      const day: Day = {
        name: currentDate.toLocaleDateString('en-US', {
          weekday: 'short',
        }),
        date: currentDate,
        selected: i === date.getDate(),
      };

      days.push(day);
    }
    return days;
  }

  getEntriesForMeal(meal: MealTime) {
    if (!this.diaryEntry) {
      return [];
    }
    const foodEntries = this.diaryEntry.foodEntries.filter(
      (entry: FoodEntry) => entry.mealTime.id === meal.id
    );
    if (foodEntries.length === 0) {
      const foodEntry: FoodEntry = {
        id: '',
        mealTime: meal,
        foodItem: {
          id: '',
          name: 'Use the BIG + button to add food or click here!',
          caloriesPerServing: 0,
          servingSize: '0',
          importedID: '0',
          brand: '',
          GTIN13: '0',
        },
        numberOfServings: 0,
        totalCalories: 0,
        diaryId: '',
      };
      foodEntries.push(foodEntry);
    }
    return foodEntries;
  }

  async saveMeal(meal) {
    const foodEntries: FoodEntry[] = this.getEntriesForMeal(meal);
    const alert = await this.alertController.create({
      cssClass: 'alert-blurred-background',
      header: 'Save Meal',
      inputs: [
        {
          name: 'mealName',
          type: 'text',
          placeholder: 'Meal Name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Save',
          handler: (data) => {
            this.mealsService
              .saveMeal(data.mealName, foodEntries)
              .subscribe(() => {
                this.refreshDiary();
              });
          },
        },
      ],
    });

    await alert.present();
  }

  async openSearchModal() {
    const modal = await this.modalController.create({
      component: SearchPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      backdropDismiss: true,
      showBackdrop: true,
      mode: 'ios',
      id: 'search-modal',
    });
    return await modal.present();
  }
}
