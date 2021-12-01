/* eslint-disable no-underscore-dangle */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Day } from 'src/app/types/Day';
import { FoodItem } from 'src/app/types/FoodItem';
import { FoodDetailsPage } from '../food-details/food-details.page';
import { MealTime } from 'src/app/types/MealTime';
import { MealsService } from 'src/app/services/meals.service';
import { DiaryService } from 'src/app/services/diary.service';
import { DiaryEntry } from 'src/app/types/DiaryEntry';
import { DiaryCalories } from 'src/app/types/DiaryCalories';

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
  maximumCalories = 2000;
  currentCalories = '';
  timerHandler: number;

  constructor(
    private modalController: ModalController,
    private mealsService: MealsService,
    private diaryService: DiaryService
  ) {}

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
    this.diaryService
      .getDiaryEntry(day.date)
      .subscribe((diaryEntry: DiaryEntry) => {
        this.diaryEntry = diaryEntry;
        this.diaryEntry.date = new Date(diaryEntry.date);
        this.days = this.generateDaysOfTheMonth(this.diaryEntry.date);
        this.diaryService
          .getTotalCalories(this.diaryEntry._id)
          .subscribe((diaryCalories: DiaryCalories) => {
            this.meals.forEach((meal) => {
              const mealCalories = diaryCalories.mealsCalories.find(
                (m) => m.mealId === meal._id
              );
              meal.calories = mealCalories.calories;
            });
            this.caloricProgress =
              (diaryCalories.totalCalories / this.maximumCalories) * 100;
            this.currentCalories = `${Math.floor(
              (this.caloricProgress / 100) * this.maximumCalories
            )} cal.`;
          });
      });
  }

  async selectFood(food: FoodItem) {
    const modal = await this.modalController.create({
      component: FoodDetailsPage,
      componentProps: {
        food,
      },
    });
    await modal.present();
  }

  private generateDaysOfTheMonth(date: Date) {
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
}
