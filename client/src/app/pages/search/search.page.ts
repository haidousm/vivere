import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodService } from 'src/app/services/food.service';
import { FoodItem } from 'src/app/types/FoodItem';
import { FoodDetailsPage } from '../food-details/food-details.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  numberOfItems = 30;
  foodItems: FoodItem[] = [];

  constructor(
    private modalController: ModalController,
    private foodService: FoodService
  ) {}

  ngOnInit() {
    this.foodService
      .getFoodItems(this.numberOfItems)
      .subscribe((foodItems: FoodItem[]) => {
        this.foodItems = foodItems;
      });
  }

  search(event) {
    this.foodService
      .filterFoodItems(event.target.value.toLowerCase())
      .subscribe((foodItems: FoodItem[]) => {
        this.foodItems = foodItems;
      });
  }

  async selectItem(food: FoodItem) {
    const modal = await this.modalController.create({
      component: FoodDetailsPage,
      componentProps: {
        food,
      },
    });
    await modal.present();
  }
}
