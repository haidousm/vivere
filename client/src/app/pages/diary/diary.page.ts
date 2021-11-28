import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Day } from 'src/app/types/Day';
import { FoodItem } from 'src/app/types/FoodItem';
import { Meal } from 'src/app/types/Meal';
import { FoodDetailsPage } from '../food-details/food-details.page';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {
  chosenMonth = 'November';
  chosenYear = '2021';
  days: Day[] = [
    {
      date: 1,
      name: 'M',
      selected: false,
    },
    {
      date: 2,
      name: 'T',
      selected: true,
    },
    {
      date: 3,
      name: 'W',
      selected: false,
    },
    {
      date: 4,
      name: 'T',
      selected: false,
    },
    {
      date: 5,
      name: 'F',
      selected: false,
    },
    {
      date: 6,
      name: 'S',
      selected: false,
    },
    {
      date: 7,
      name: 'S',
      selected: false,
    },
  ];

  meals: Meal[] = [
    {
      name: 'Breakfast',
      totalCalories: 300,
      foodItems: [
        {
          id: 1,
          name: 'Eggs',
          totalCalories: 100,
          servingSize: 1,
          servingUnit: 'egg',
          numberOfServings: 1,
          caloriesPerServing: 100,
        },
        {
          id: 2,
          name: 'Bacon',
          totalCalories: 200,
          servingSize: 1,
          servingUnit: 'slice',
          numberOfServings: 1,
          caloriesPerServing: 200,
        },
      ],
    },
    {
      name: 'Lunch',
      totalCalories: 700,
      foodItems: [
        {
          id: 3,
          name: 'Salad',
          totalCalories: 300,
          servingSize: 1,
          servingUnit: '100g',
          numberOfServings: 2,
          caloriesPerServing: 150,
        },
        {
          id: 4,
          name: 'Chicken',
          totalCalories: 400,
          servingSize: 1,
          servingUnit: '100g',
          numberOfServings: 2,
          caloriesPerServing: 200,
        },
      ],
    },
    {
      name: 'Dinner',
      totalCalories: 800,
      foodItems: [
        {
          id: 5,
          name: 'Steak',
          totalCalories: 500,
          servingSize: 1,
          servingUnit: '100g',
          numberOfServings: 2,
          caloriesPerServing: 250,
        },
        {
          id: 6,
          name: 'Salad',
          totalCalories: 300,
          servingSize: 1,
          servingUnit: '100g',
          numberOfServings: 2,
          caloriesPerServing: 150,
        },
      ],
    },
  ];

  slidesOptions = {
    slidesPerView: 6.5,
  };

  caloricProgress = 0;
  currentCalories = '';
  timerHandler: number;

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  previousMonth() {}

  nextMonth() {}

  selectDay(day: Day) {
    this.days.forEach((d) => (d.selected = false));
    day.selected = true;
    const maxCals = 2000;
    this.caloricProgress =
      ((Math.floor(Math.random() * 1000) + 1000) / maxCals) * 100;
    this.currentCalories = `${Math.floor(
      (this.caloricProgress / 100) * maxCals
    )} cal.`;
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
}
