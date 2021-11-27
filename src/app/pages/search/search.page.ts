import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/types/FoodItem';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  actualFoodItems: FoodItem[] = [
    {
      id: 1,
      name: 'Pizza',
      caloriesPerServing: 400,
      totalCalories: 400,
      servingSize: 1,
      servingUnit: 'slice',
      numberOfServings: 1,
    },
    {
      id: 2,
      name: 'Burger',
      caloriesPerServing: 300,
      totalCalories: 300,
      servingSize: 1,
      servingUnit: 'burger',
      numberOfServings: 1,
    },
    {
      id: 3,
      name: 'Batata',
      caloriesPerServing: 100,
      totalCalories: 100,
      servingSize: 1,
      servingUnit: 'slice',
      numberOfServings: 1,
    },
  ];

  foodItems: FoodItem[] = [];

  constructor() {}

  ngOnInit() {
    this.foodItems = this.actualFoodItems;
  }

  search(event) {
    this.foodItems = this.actualFoodItems.filter((foodItem) =>
      foodItem.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
  }
}
