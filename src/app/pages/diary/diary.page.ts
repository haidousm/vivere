import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
          name: 'Eggs',
          calories: 100,
        },
        {
          name: 'Bacon',
          calories: 200,
        },
      ],
    },
    {
      name: 'Lunch',
      totalCalories: 500,
      foodItems: [
        {
          name: 'Salad',
          calories: 100,
        },
        {
          name: 'Sandwich',
          calories: 200,
        },
      ],
    },
    {
      name: 'Dinner',
      totalCalories: 700,
      foodItems: [
        {
          name: 'Steak',
          calories: 100,
        },
        {
          name: 'Pasta',
          calories: 200,
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

  constructor(private modalController: ModalController) {}

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
    // create ionic modal with food details
    const modal = await this.modalController.create({
      component: FoodDetailsPage,
    });
    await modal.present();
  }
}

interface Day {
  name: string;
  date: number;
  selected: boolean;
}

interface Meal {
  name: string;
  totalCalories: number;
  foodItems: FoodItem[];
}

interface FoodItem {
  name: string;
  calories: number;
}
